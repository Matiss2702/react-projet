import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Match, Turn } from "@/constants/type";

interface SelectedCard {
  id: string;
  value: string;
  imageUrl: string;
  name: string;
}

export default function AccountPage() {
  const [userStats, setUserStats] = useState<{
    username: string;
    rock: string;
    paper: string;
    scissors: string;
    victories: string;
  } | null>(null);
  const [selectedCards, setSelectedCards] = useState<{
    fire: SelectedCard | null;
    grass: SelectedCard | null;
    water: SelectedCard | null;
  }>({
    fire: null,
    grass: null,
    water: null,
  });

  const { userId } = useUser();

  // Récupération des stats utilisateur
  const fetchUserStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const matchesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/matches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const matches: Match[] = matchesResponse.data;
      const userMatches = matches.filter((match: Match) => match.user1?._id === userId || match.user2?._id === userId);

      let rockCount = 0;
      let paperCount = 0;
      let scissorsCount = 0;
      let victories = 0;

      userMatches.forEach((match: Match) => {
        match.turns.forEach((turn: Turn) => {
          const userMove = match.user1?._id === userId ? turn.user1 : turn.user2;

          if (userMove === "rock") rockCount++;
          if (userMove === "paper") paperCount++;
          if (userMove === "scissors") scissorsCount++;
        });

        if (match.winner && match.winner._id === userId) {
          victories++;
        }
      });

      const totalMoves = rockCount + paperCount + scissorsCount;
      const rockPercentage = totalMoves > 0 ? ((rockCount / totalMoves) * 100).toFixed(2) : "0";
      const paperPercentage = totalMoves > 0 ? ((paperCount / totalMoves) * 100).toFixed(2) : "0";
      const scissorsPercentage = totalMoves > 0 ? ((scissorsCount / totalMoves) * 100).toFixed(2) : "0";
      const victoriesPercentage = userMatches.length > 0 ? ((victories / userMatches.length) * 100).toFixed(2) : "0";

      setUserStats({
        username:
          matches.find((match) => match.user1?._id === userId || match.user2?._id === userId)?.user1?.username ||
          "Utilisateur",
        rock: `${rockPercentage}%`,
        paper: `${paperPercentage}%`,
        scissors: `${scissorsPercentage}%`,
        victories: `${victoriesPercentage}%`,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques utilisateur :", error);
    }
  }, [userId]);

  // Récupération des cartes sélectionnées (Feu, Plante, Eau)
  useEffect(() => {
    if (userId) {
      fetchUserStats();
    }

    const fireCard = JSON.parse(localStorage.getItem("selectedFireCard") || "null");
    const grassCard = JSON.parse(localStorage.getItem("selectedGrassCard") || "null");
    const waterCard = JSON.parse(localStorage.getItem("selectedWaterCard") || "null");

    setSelectedCards({
      fire: fireCard,
      grass: grassCard,
      water: waterCard,
    });
  }, [userId, fetchUserStats]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-800 drop-shadow-md">User Account</h1>

      {/* Tableau des statistiques */}
      <table className="w-full mb-8 border border-gray-200 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Pierre (Rock)</th>
            <th className="px-4 py-2 border">Feuille (Paper)</th>
            <th className="px-4 py-2 border">Ciseaux (Scissors)</th>
            <th className="px-4 py-2 border">Victoire</th>
          </tr>
        </thead>
        <tbody>
          {userStats ? (
            <tr>
              <td className="px-4 py-2 border">{userStats.username}</td>
              <td className="px-4 py-2 border">{userStats.rock}</td>
              <td className="px-4 py-2 border">{userStats.paper}</td>
              <td className="px-4 py-2 border">{userStats.scissors}</td>
              <td className="px-4 py-2 border">{userStats.victories}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center border">
                Chargement des statistiques...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Affichage des cartes Pokémon sélectionnées */}
      <h2 className="mb-4 text-3xl font-bold text-gray-700">Pokémon Sélectionnés</h2>
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(selectedCards).map(([type, card]) =>
          card ? (
            <div key={type} className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md">
              <h2
                className={`text-2xl font-bold ${
                  type === "fire" ? "text-red-500" : type === "grass" ? "text-green-500" : "text-blue-500"
                }`}
              >
                {type === "fire" ? "🔥 Feu" : type === "grass" ? "🌱 Plante" : "💧 Eau"}
              </h2>
              <img src={card.imageUrl} alt={card.name} className="object-contain w-40 h-40 mt-2" />
              <p className="mt-2 text-lg font-semibold text-gray-700">{card.name}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
