import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Chifoumi Pokémon</h1>
        <p className="mb-6 text-lg text-gray-700">
          Bienvenue sur <strong>Chifoumi Pokémon</strong>, le jeu de pierre-papier-ciseaux version Pokémon ! Ici, vous
          pouvez choisir vos cartes dans l'onglet <em>Category</em> pour personnaliser vos combats. Défiez vos amis et
          montrez qui est le meilleur dresseur !
        </p>
        <Link
          to="/game/matchlist"
          className="px-6 py-3 text-white transition bg-yellow-500 rounded-md shadow hover:bg-yellow-600"
        >
          Commencer à jouer
        </Link>
      </div>
    </div>
  );
}
