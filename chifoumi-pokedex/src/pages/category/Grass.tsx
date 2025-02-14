import { useEffect, useState } from "react";

interface Card {
  id: string;
  value: "paper";
  imageUrl: string;
  name: string;
}

const cardsData: Card[] = [
  { id: "grass-card-1", value: "paper", imageUrl: "/images/tortipouss.png", name: "Tortipouss" },
  { id: "grass-card-2", value: "paper", imageUrl: "/images/boskara.png", name: "Boskara" },
  { id: "grass-card-3", value: "paper", imageUrl: "/images/torterra.png", name: "Torterra" },
  { id: "grass-card-4", value: "paper", imageUrl: "/images/arcko.png", name: "Arcko" },
  { id: "grass-card-5", value: "paper", imageUrl: "/images/massko.png", name: "Massko" },
  { id: "grass-card-6", value: "paper", imageUrl: "/images/juncko.png", name: "Juncko" },
  { id: "grass-card-7", value: "paper", imageUrl: "/images/bullbizarre.png", name: "Bulbizarre" },
  { id: "grass-card-8", value: "paper", imageUrl: "/images/herbizarre.png", name: "Herbizarre" },
  { id: "grass-card-9", value: "paper", imageUrl: "/images/florizare.png", name: "Florizarre" },
];

export default function Grass() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    const storedCard = localStorage.getItem("selectedGrassCard");
    if (storedCard) {
      try {
        const parsedCard = JSON.parse(storedCard);
        if (parsedCard?.id) {
          setSelectedCard(parsedCard);
        }
      } catch {
        localStorage.removeItem("selectedGrassCard");
      }
    }
  }, []);

  const handleCardClick = (card: Card) => {
    if (selectedCard?.id === card.id) {
      localStorage.removeItem("selectedGrassCard");
      setSelectedCard(null);
    } else {
      localStorage.setItem("selectedGrassCard", JSON.stringify(card));
      setSelectedCard(card);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="mb-8 text-4xl font-extrabold text-green-700 drop-shadow-md">Élément Plante 🌱</h1>
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
            <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 rounded-md">{card.name}</div> {/* Affichage du nom */}
            {selectedCard?.id === card.id && (
              <div className="absolute p-2 text-white bg-green-500 rounded-full shadow-lg top-2 right-2">✅</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
