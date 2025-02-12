import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export default function HomePage() {
  const { userId } = useUser();

  const link = userId
    ? { to: "/game/matchlist" }
    : { to: "/auth/login" };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 text-center rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">Chifoumi Pokémon</h1>
        <div className="mb-6 text-lg">
          <p>Bienvenue sur <strong>Chifoumi Pokémon</strong>, le jeu de pierre-papier-ciseaux version Pokémon !</p>
          <p>Connectez-vous et défiez vos amis et montrez qui est le meilleur dresseur !</p>
        </div>
        <Link
          to={link.to}
          className="px-6 py-3 transition bg-yellow-500 rounded-md shadow hover:bg-yellow-600"
        >
          Commencer à jouer !
        </Link>
      </div>
    </div>
  );
}
