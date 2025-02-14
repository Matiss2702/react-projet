import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { EventSourcePolyfill } from "event-source-polyfill";
import { Match, Turn } from "@/constants/type";
import { Button } from "@/components/ui/button";

interface Card {
  id: string;
  value: "rock" | "paper" | "scissors";
  imageUrl: string;
  name: string;
}

interface SelectedCard extends Card {}

interface FlipCardProps {
  imageUrl: string;
  alt: string;
  flipped?: boolean;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ imageUrl, alt, flipped = false, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(flipped);
    }, 1000);
    return () => clearTimeout(timer);
  }, [flipped]);

  return (
    <div
      className={`flip-card ${className}`}
      style={{
        width: "4rem",
        height: "5rem",
        perspective: "1000px",
      }}
    >
      <div
        className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "none",
        }}
      >
        <div
          className="flip-card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <img src="/images/masked.png" alt="?" className="object-contain w-full h-full" />
        </div>
        <div
          className="flip-card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img src={imageUrl} alt={alt} className="object-contain w-full h-full" />
        </div>
      </div>
    </div>
  );
};

const defaultOpponentCards: { [key: string]: Card } = {
  fire: {
    id: "fire-opponent",
    value: "scissors",
    imageUrl: "/images/salameche.png",
    name: "Salamèche",
  },
  grass: {
    id: "grass-opponent",
    value: "paper",
    imageUrl: "/images/tortipouss.png",
    name: "Tortipouss",
  },
  water: {
    id: "water-opponent",
    value: "rock",
    imageUrl: "/images/carapuce.webp",
    name: "Carapuce",
  },
};

function getDefaultCardByMove(move: "rock" | "paper" | "scissors"): Card {
  if (move === "scissors") return defaultOpponentCards.fire;
  if (move === "paper") return defaultOpponentCards.grass;
  return defaultOpponentCards.water;
}

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const { userId } = useUser();

  const [match, setMatch] = useState<Match | null>(null);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [selectedCards, setSelectedCards] = useState<{
    fire: SelectedCard | null;
    grass: SelectedCard | null;
    water: SelectedCard | null;
  }>({
    fire: null,
    grass: null,
    water: null,
  });

  useEffect(() => {
    const fireCard = JSON.parse(localStorage.getItem("selectedFireCard") || "null");
    const grassCard = JSON.parse(localStorage.getItem("selectedGrassCard") || "null");
    const waterCard = JSON.parse(localStorage.getItem("selectedWaterCard") || "null");

    setSelectedCards({
      fire: fireCard,
      grass: grassCard,
      water: waterCard,
    });
  }, []);

  const fetchMatch = useCallback(async () => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatch(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération du match :", err);
      setError("Impossible de charger le match.");
    }
  }, [id]);

  const subscribeToMatch = useCallback(
    (matchId: string) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token manquant !");
        setError("Vous devez être connecté pour accéder à ce match.");
        return null;
      }
      const url = `${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`;
      const eventSource = new EventSourcePolyfill(url, { headers: { Authorization: `Bearer ${token}` } });
      eventSource.onmessage = () => {
        fetchMatch();
      };
      eventSource.onerror = (e) => {
        console.error("Erreur SSE, on ferme la connexion :", e);
        eventSource.close();
      };
      return eventSource;
    },
    [fetchMatch]
  );

  useEffect(() => {
    if (!userId) {
      setError("Vous devez être connecté pour accéder à ce match.");
      return;
    }
    fetchMatch();
    if (id) {
      const es = subscribeToMatch(id);
      return () => {
        if (es) es.close();
      };
    }
  }, [id, userId, fetchMatch, subscribeToMatch]);

  const playMove = async () => {
    if (!match) {
      setError("Match introuvable.");
      return;
    }
    if (match.winner) {
      setError("Ce match est déjà terminé.");
      return;
    }
    const fullyPlayedTurns = match.turns.filter(isTurnFullyPlayed).length;
    if (fullyPlayedTurns >= 3) {
      setError("Les 3 tours sont déjà remplis, ce match est fini.");
      return;
    }
    if (!selectedCard) {
      setError("Veuillez sélectionner une carte.");
      return;
    }

    setError(null);
    setSuccess(null);
    const turnToPlay = getNextTurnId(match);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/matches/${match._id}/turns/${turnToPlay}`,
        { move: selectedCard.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 202) {
        setSuccess(`Carte “${selectedCard.name}” jouée sur le tour ${turnToPlay} !`);
        setSelectedCard(null);
        fetchMatch();
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi du coup :", err);
      setError("Une erreur est survenue lors de l'envoi du coup.");
    }
  };

  if (!match && !error) {
    return <div>Chargement…</div>;
  }
  if (error) {
    return <div className="text-red-500">Erreur : {error}</div>;
  }
  if (!match) {
    return <div>Match introuvable.</div>;
  }

  const currentMatch = match;

  const isPlayer1 = currentMatch.user1?._id === userId;
  const isPlayer2 = currentMatch.user2?._id === userId;

  const myUsername = isPlayer1
    ? currentMatch.user1?.username || "Joueur 1"
    : isPlayer2
    ? currentMatch.user2?.username || "Joueur 2"
    : "Spectateur";
  const opponentUsername = isPlayer1
    ? currentMatch.user2?.username || "Joueur 2"
    : isPlayer2
    ? currentMatch.user1?.username || "Joueur 1"
    : "Spectateur";

  const nextTurnId = getNextTurnId(currentMatch);
  const nextTurnIndex = nextTurnId - 1;
  const inProgressTurn = currentMatch.turns[nextTurnIndex] || {};
  const currentUserHasPlayed = (isPlayer1 && !!inProgressTurn.user1) || (isPlayer2 && !!inProgressTurn.user2);
  const matchNotEnded = !currentMatch.winner && (isPlayer1 || isPlayer2);
  const fullyPlayedTurns = currentMatch.turns.filter(isTurnFullyPlayed).length;
  const canStillPlay = matchNotEnded && fullyPlayedTurns < 3 && nextTurnId <= 3;

  function getPlayerCardByMove(move: "rock" | "paper" | "scissors"): Card | null {
    if (move === "scissors") return selectedCards.fire;
    if (move === "paper") return selectedCards.grass;
    return selectedCards.water;
  }

  function getTurnWinnerName(turn: Turn): string {
    if (!currentMatch) return "";
    if (!turn.winner) return "Égalité";
    if (currentMatch.user1 && turn.winner === currentMatch.user1._id) return currentMatch.user1.username;
    if (currentMatch.user2 && turn.winner === currentMatch.user2._id) return currentMatch.user2.username;
    return turn.winner;
  }

  const historyTurns = currentMatch.turns.filter(isTurnFullyPlayed);

  return (
    <div className="flex">
      {/* Zone principale */}
      <div className="flex-1 p-4">
        <h1 className="mb-4 text-2xl">Match {currentMatch._id}</h1>
        <p>Vous êtes : {myUsername}</p>
        {currentMatch.winner ? (
          <p>Gagnant global : {currentMatch.winner.username}</p>
        ) : fullyPlayedTurns === 3 ? (
          <p>Gagnant global : Égalité</p>
        ) : (
          <p>Gagnant global : Aucun pour le moment</p>
        )}
        {/* Optionnel : résumé des tours */}
        <h2 className="mt-4 text-lg">Tours joués</h2>
        <div className="mb-4">
          {currentMatch.turns.map((turn, index) => (
            <div key={index} className="text-center">
              <span>Tour {index + 1} : </span>
              <span>{turn.winner || "En cours"}</span>
            </div>
          ))}
        </div>
        {canStillPlay && (
          <div>
            <h2 className="mt-4 text-lg">Jouer un tour</h2>
            {error && <div className="mb-2 text-red-500">{error}</div>}
            {success && <div className="mb-2 text-green-500">{success}</div>}
            {currentUserHasPlayed && !isTurnFullyPlayed(inProgressTurn) && (
              <p className="text-gray-600">Vous avez déjà joué ce tour. En attente de l’autre joueur…</p>
            )}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(selectedCards).map(([type, card]) =>
                card ? (
                  <div
                    key={type}
                    onClick={() => !currentUserHasPlayed && setSelectedCard(card)}
                    className={`relative w-48 h-60 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
                      selectedCard?.id === card.id ? "border-4 border-green-500 shadow-lg" : "border"
                    } ${currentUserHasPlayed ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="object-contain w-full h-full bg-center bg-no-repeat"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-center">
                      <h3 className="text-lg font-semibold">{card.name}</h3>
                    </div>
                    {selectedCard?.id === card.id && (
                      <div className="absolute p-2 bg-green-500 rounded-full shadow-lg top-2 right-2">
                        ✅
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
            <Button
              onClick={playMove}
              disabled={currentUserHasPlayed || !selectedCard}
              className={`px-4 py-2 bg-green-500 rounded hover:bg-green-800 mt-4 text-white ${
                currentUserHasPlayed || !selectedCard ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Valider le coup
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 border-l border w-72">
        <h2 className="mb-4 text-xl text-center">Historique</h2>
        {historyTurns.length === 0 ? (
          <p className="text-center">Aucun tour joué pour l’instant.</p>
        ) : (
          historyTurns.map((turn, index) => {
            let playerMove: "rock" | "paper" | "scissors" | undefined;
            let opponentMove: "rock" | "paper" | "scissors" | undefined;
            if (isPlayer1) {
              playerMove = turn.user1 as "rock" | "paper" | "scissors";
              opponentMove = turn.user2 as "rock" | "paper" | "scissors";
            } else if (isPlayer2) {
              playerMove = turn.user2 as "rock" | "paper" | "scissors";
              opponentMove = turn.user1 as "rock" | "paper" | "scissors";
            }
            const playerCard = playerMove ? getPlayerCardByMove(playerMove) : null;
            const opponentCard = opponentMove ? getDefaultCardByMove(opponentMove) : null;
            const winnerName = getTurnWinnerName(turn);
            return (
              <div key={index} className="mb-4">
                <div className="mb-2 text-sm font-bold text-center">
                  Tour {index + 1} : Gagnant : {winnerName}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">{myUsername}</span>
                    {playerCard ? (
                      <FlipCard
                        imageUrl={playerCard.imageUrl}
                        alt={playerCard.name}
                        flipped={true}
                        className={winnerName === myUsername ? "border-green-500" : "border"}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-20 text-xs">-</div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">{opponentUsername}</span>
                    {opponentCard ? (
                      <FlipCard
                        imageUrl={opponentCard.imageUrl}
                        alt={opponentCard.name}
                        flipped={true}
                        className={winnerName === opponentUsername ? "border-green-500" : "border"}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-20 text-xs">-</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function isTurnFullyPlayed(turn: Turn): boolean {
  return !!(turn.user1 && turn.user2);
}

function getNextTurnId(match: Match): number {
  const nbTurns = match.turns.length;
  if (nbTurns === 0) return 1;
  const lastTurn = match.turns[nbTurns - 1];
  if (!isTurnFullyPlayed(lastTurn)) return nbTurns;
  if (nbTurns < 3) return nbTurns + 1;
  return 3;
}
