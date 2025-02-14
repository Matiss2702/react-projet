import { useEffect, useState } from "react";

import { Card } from "@/constants/card";

const cardsData: Card[] = [
  { id: "fire-card-1", value: "scissors", imageUrl: "/images/salameche.png", name: "Salamèche", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-2", value: "scissors", imageUrl: "/images/reptincel.jpg", name: "Reptincel", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-3", value: "scissors", imageUrl: "/images/dracaufeu.png", name: "Dracaufeu", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-4", value: "scissors", imageUrl: "/images/poussifeu.png", name: "Poussifeu", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-5", value: "scissors", imageUrl: "/images/galifeu.png", name: "Galifeu", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-6", value: "scissors", imageUrl: "/images/brasegali.png", name: "Braségali", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-7", value: "scissors", imageUrl: "/images/ouisticram.jpg", name: "Ouisticram", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-8", value: "scissors", imageUrl: "/images/chimpenfeu.png", name: "Chimpenfeu", type: "Fire", transaltion: "Feu" },
  { id: "fire-card-9", value: "scissors", imageUrl: "/images/simiabraz.png", name: "Simiabraz", type: "Fire", transaltion: "Feu" },
];

export default function Fire() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    const storedCard = localStorage.getItem("selectedFireCard");

    try {
      if (storedCard) {
        const parsedCard = JSON.parse(storedCard);
        if (parsedCard && parsedCard.id) {
          setSelectedCard(parsedCard);
        }
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("selectedFireCard");
    }
  }, []);

  const handleCardClick = (card: Card) => {
    if (selectedCard?.id === card.id) {
      localStorage.removeItem("selectedFireCard");
      setSelectedCard(null);
    } else {
      localStorage.setItem("selectedFireCard", JSON.stringify(card));
      setSelectedCard(card);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-800 drop-shadow-md">Élément Feu 🔥</h1>
      <div className="grid grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`relative w-48 h-60 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
              selectedCard?.id === card.id ? "border-4 border-green-500 shadow-lg" : "border border-gray-300"
            }`}
          >
            <img src={card.imageUrl} alt={card.name} className="object-contain w-full h-full bg-center bg-no-repeat" />
            <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 rounded-md">{card.name}</div>
            {selectedCard?.id === card.id && (
              <div className="absolute p-2 text-white bg-green-500 rounded-full shadow-lg top-2 right-2">✅</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
