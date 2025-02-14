import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Match } from "../../constants/type";
import CreateMatchModal from "./components/CreateMatchModal";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { DefaultCardsDialog } from "@/components/defaultCardsDialog";

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { userId } = useUser();

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const matchesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/matches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatches(matchesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const matchesParticipating = matches.filter((match) => match.user1?._id === userId || match.user2?._id === userId);

  return (
    <div>
      <DefaultCardsDialog />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Liste des matchs</h1>
        <Button onClick={() => setShowModal(true)}>
          + Créer une partie
        </Button>
      </div>

      <h2 className="mb-2 text-lg">Vos matchs</h2>
      <table className="w-full mb-4 bg-white rounded shadow table-auto text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Joueur 1</th>
            <th className="p-2">Joueur 2</th>
            <th className="p-2">Gagnant</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {matchesParticipating.map((match) => {
            const allTurnsPlayed = match.turns?.length === 3 && match.turns.every((t) => t.user1 && t.user2);

            const winnerLabel = match.winner ? match.winner.username : allTurnsPlayed ? "Égalité" : "En cours";

            return (
              <tr key={match._id}>
                <td className="p-2">{match._id}</td>
                <td className="p-2">{match.user1?.username || "En attente"}</td>
                <td className="p-2">{match.user2?.username || "En attente"}</td>
                <td className="p-2">{winnerLabel}</td>
                <td className="p-2">
                  <Button
                    onClick={() => navigate(`/game/matches/${match._id}`)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-800 rounded text-white"
                  >
                    Voir
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <CreateMatchModal
          onClose={() => setShowModal(false)}
          onCreate={() => {
            fetchMatches();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
