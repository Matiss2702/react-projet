import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Match, Turn } from "@/constants/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  const [matchCount, setMatchCount] = useState<number>(0);
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

      setMatchCount(userMatches.length);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques utilisateur :", error);
    }
  }, [userId]);

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
    <div className="flex flex-col gap-16 p-6 bg-whites">
      <section className="grid grid-cols-1 gap-4">
        <h1 className="mb-8 text-4xl font-extrabold drop-shadow-md">Mon compte</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Mon compte :</CardTitle>
              </CardHeader>
              <CardContent>
                <div>{userStats ? userStats.username : "Chargement..."}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="mb-8 text-4xl font-extrabold drop-shadow-md">Pokémon Sélectionnés</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(selectedCards).map(([type, card]) =>
            card ? (
              <div key={type} className="flex flex-col items-center p-4 border rounded-lg shadow-md">
                <h2
                  className={`text-2xl font-bold ${
                    type === "fire" ? "text-red-500" : type === "grass" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {type === "fire" ? "🔥 Feu" : type === "grass" ? "🌱 Plante" : "💧 Eau"}
                </h2>
                <img src={card.imageUrl} alt={card.name} className="object-contain w-40 h-40 mt-2" />
                <p className="mt-2 text-lg font-semibold">{card.name}</p>
              </div>
            ) : null
          )}
        </div>
      </section>
      <section className="py-4">
        <h1 className="mb-8 text-4xl font-extrabold drop-shadow-md">Mes statistiques</h1>
        {!userStats ? (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Aucune statistique disponible. Jouez quelques parties pour voir vos stats !
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Parties jouées :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{matchCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>% Victoires :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{userStats ? userStats.victories : "0%"}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>💧 Pierre :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{userStats ? userStats.rock : "0%"}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>🌱 Feuille :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{userStats ? userStats.paper : "0%"}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>🔥 Ciseaux :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{userStats ? userStats.scissors : "0%"}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
