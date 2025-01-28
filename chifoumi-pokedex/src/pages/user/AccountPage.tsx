import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Match, Turn } from "@/constants/type";

export default function AccountPage() {
  const [userStats, setUserStats] = useState<{
    username: string;
    rock: string;
    paper: string;
    scissors: string;
    victories: string;
  } | null>(null);
  const { userId } = useUser();

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

  useEffect(() => {
    if (userId) {
      fetchUserStats();
    }
  }, [userId, fetchUserStats]);

  return (
    <div>
      <h1>User Account</h1>
      <table className="w-full border border-gray-200 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Pierre</th>
            <th className="px-4 py-2 border">Feuille</th>
            <th className="px-4 py-2 border">Ciseaux</th>
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
    </div>
  );
}
