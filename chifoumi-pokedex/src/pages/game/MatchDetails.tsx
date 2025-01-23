import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { EventSourcePolyfill } from "event-source-polyfill";
import { Match, Turn } from "@/constants/type";

function isTurnFullyPlayed(turn: Turn): boolean {
  return !!(turn.user1 && turn.user2);
}

function getNextTurnId(match: Match): number {
  const nbTurns = match.turns.length;
  if (nbTurns === 0) {
    return 1;
  }
  const lastTurn = match.turns[nbTurns - 1];
  if (!isTurnFullyPlayed(lastTurn)) {
    return nbTurns;
  }
  if (nbTurns < 3) {
    return nbTurns + 1;
  }
  return 3;
}

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [move, setMove] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { userId } = useUser();

  const fetchMatch = useCallback(async () => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatch(response.data);
      console.log("Match data fetched:", response.data);
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
      const eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      eventSource.onmessage = (event) => {
        console.log("SSE message reçu :", event.data);
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

    // Vérifie qu’on n’a pas déjà 3 tours pleins
    const fullyPlayedTurns = match.turns.filter(isTurnFullyPlayed).length;
    if (fullyPlayedTurns >= 3) {
      setError("Les 3 tours sont déjà remplis, ce match est fini.");
      return;
    }

    if (!move) {
      setError("Veuillez sélectionner un coup (pierre, papier ou ciseaux).");
      return;
    }

    setError(null);
    setSuccess(null);

    const turnToPlay = getNextTurnId(match);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/matches/${match._id}/turns/${turnToPlay}`,
        { move },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 202) {
        setSuccess(`Coup “${move}” joué sur le tour ${turnToPlay} !`);
        setMove("");
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

  const isPlayer1 = match.user1?._id === userId;
  const isPlayer2 = match.user2?._id === userId;

  const nextTurnId = getNextTurnId(match);
  const nextTurnIndex = nextTurnId - 1;
  const inProgressTurn = match.turns[nextTurnIndex] || {};

  const currentUserHasPlayed = (isPlayer1 && !!inProgressTurn.user1) || (isPlayer2 && !!inProgressTurn.user2);

  const matchNotEnded = !match.winner && (isPlayer1 || isPlayer2);

  const fullyPlayedTurns = match.turns.filter(isTurnFullyPlayed).length;
  const canStillPlay = matchNotEnded && fullyPlayedTurns < 3 && nextTurnId <= 3;

  return (
    <div>
      <h1 className="mb-4 text-2xl">Match {match._id}</h1>
      <p>
        Vous êtes : {isPlayer1 ? "Joueur 1" : isPlayer2 ? "Joueur 2" : "Spectateur (vous n'êtes ni user1 ni user2)"}
      </p>

      {match.winner ? (
        <p>Gagnant global : {match.winner.username}</p>
      ) : fullyPlayedTurns === 3 ? (
        <p>Gagnant global : Égalité</p>
      ) : (
        <p>Gagnant global : Aucun pour le moment</p>
      )}

      <h2 className="mt-4 text-lg">Tours joués</h2>
      <table className="w-full mb-4 border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Tour</th>
            <th className="p-2 border">Joueur 1</th>
            <th className="p-2 border">Joueur 2</th>
            <th className="p-2 border">Gagnant (tour)</th>
          </tr>
        </thead>
        <tbody>
          {match.turns.map((turn, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{turn.user1 || "?"}</td>
              <td className="p-2 border">{turn.user2 || "?"}</td>
              <td className="p-2 border">{turn.winner || "En cours"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {canStillPlay && (
        <div>
          <h2 className="mt-4 text-lg">Jouer un tour</h2>
          {error && <div className="mb-2 text-red-500">{error}</div>}
          {success && <div className="mb-2 text-green-500">{success}</div>}

          {/* Si l’utilisateur a déjà joué ce tour, on désactive tout : */}
          {currentUserHasPlayed && !isTurnFullyPlayed(inProgressTurn) && (
            <p className="text-gray-600">Vous avez déjà joué ce tour. En attente de l’autre joueur…</p>
          )}

          <div className="flex mb-4 space-x-2">
            <button
              onClick={() => setMove("rock")}
              disabled={currentUserHasPlayed}
              className={`px-4 py-2 border rounded ${move === "rock" ? "bg-blue-500 text-white" : "bg-gray-300"} ${
                currentUserHasPlayed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Pierre
            </button>
            <button
              onClick={() => setMove("paper")}
              disabled={currentUserHasPlayed}
              className={`px-4 py-2 border rounded ${move === "paper" ? "bg-blue-500 text-white" : "bg-gray-300"} ${
                currentUserHasPlayed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Papier
            </button>
            <button
              onClick={() => setMove("scissors")}
              disabled={currentUserHasPlayed}
              className={`px-4 py-2 border rounded ${move === "scissors" ? "bg-blue-500 text-white" : "bg-gray-300"} ${
                currentUserHasPlayed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Ciseaux
            </button>
          </div>

          <button
            onClick={playMove}
            disabled={currentUserHasPlayed}
            className={`px-4 py-2 text-white bg-green-500 rounded ${
              currentUserHasPlayed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Valider le coup
          </button>
        </div>
      )}
    </div>
  );
}
