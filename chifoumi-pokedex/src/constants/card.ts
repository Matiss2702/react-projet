export interface Card {
  id: string;
  value: "scissors" | "paper" | "rock";
  type: "Fire" | "Grass" | "Water";
  transaltion: "Feu" | "Plante" | "Eau";
  imageUrl: string;
  name: string;
}

const defaultCards: Card[] = [
  { id: "fire-card-1", value: "scissors", imageUrl: "/images/salameche.png", name: "Salamèche", type: "Fire", transaltion: "Feu" },
  { id: "grass-card-1", value: "paper", imageUrl: "/images/tortipouss.png", name: "Tortipouss", type: "Grass", transaltion: "Plante" },
  { id: "water-card-1", value: "rock", imageUrl: "/images/carapuce.webp", name: "Carapuce", type: "Water", transaltion: "Eau" },
];

export default defaultCards;