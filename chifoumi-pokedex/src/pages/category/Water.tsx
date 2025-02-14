import { useEffect, useState } from "react";

import { Card } from "@/constants/card";

const cardsData: Card[] = [
  { id: "water-card-1", value: "rock", imageUrl: "/images/carapuce.webp", name: "Carapuce", type: "Water", transaltion: "Eau" },
  { id: "water-card-2", value: "rock", imageUrl: "/images/carabaffe.png", name: "Carabaffe", type: "Water", transaltion: "Eau" },
  { id: "water-card-3", value: "rock", imageUrl: "/images/tortank.png", name: "Tortank", type: "Water", transaltion: "Eau" },
  { id: "water-card-4", value: "rock", imageUrl: "/images/gobou.png", name: "Gobou", type: "Water", transaltion: "Eau" },
  { id: "water-card-5", value: "rock", imageUrl: "/images/flobio.png", name: "Flobio", type: "Water", transaltion: "Eau" },
  { id: "water-card-6", value: "rock", imageUrl: "/images/laggron.png", name: "Laggron", type: "Water", transaltion: "Eau" },
  { id: "water-card-7", value: "rock", imageUrl: "/images/tiplouf.png", name: "Tiplouf", type: "Water", transaltion: "Eau" },
  { id: "water-card-8", value: "rock", imageUrl: "/images/prinplouf.png", name: "Prinplouf", type: "Water", transaltion: "Eau" },
  { id: "water-card-9", value: "rock", imageUrl: "/images/pingoleon.png", name: "Pingoléon", type: "Water", transaltion: "Eau" },
];

export default function Water() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    const storedCard = localStorage.getItem("selectedWaterCard");
    if (storedCard) {
      try {
        const parsedCard = JSON.parse(storedCard);
        if (parsedCard?.id) {
          setSelectedCard(parsedCard);
        }
      } catch {
        localStorage.removeItem("selectedWaterCard");
      }
    }
  }, []);

  const handleCardClick = (card: Card) => {
    if (selectedCard?.id === card.id) {
      localStorage.removeItem("selectedWaterCard");
      setSelectedCard(null);
    } else {
      localStorage.setItem("selectedWaterCard", JSON.stringify(card));
      setSelectedCard(card);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="mb-8 text-4xl font-extrabold text-blue-700 drop-shadow-md">Élément Eau 💧</h1>
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
