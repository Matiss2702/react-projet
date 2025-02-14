import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import defaultCards from "@/constants/card";

export function DefaultCardsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  useEffect(() => {
    let missingCards = false;

    ["Fire", "Grass", "Water"].forEach((type) => {
      const storedCard = localStorage.getItem(`selected${type}Card`);

      if (!storedCard) {
        missingCards = true;

        const defaultCard = defaultCards.find((card) => card.type === type);
        if (defaultCard) {
          localStorage.setItem(`selected${type}Card`, JSON.stringify(defaultCard));
        }
      }
    });

    if (missingCards) {
      setIsOpen(true);
      setShouldShowDialog(true);
    }
  }, []);

  if (!shouldShowDialog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px] mx-auto">
        <DialogHeader>
          <DialogTitle>Pokémon sélectionnés par défaut</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 p-4">
          {defaultCards.map((card) => (
            <div
              key={card.id}
              className="relative w-40 h-60 rounded-lg shadow-md border border-gray-300 overflow-hidden bg-white flex flex-col justify-between"
            >
              <img src={card.imageUrl} alt={card.name} className="object-cover w-full h-40 bg-center bg-no-repeat" />
              <div className="p-2 text-center">
                <p className="font-bold text-gray-800">{card.name}</p>
                <p 
                  className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${
                    card.type === "Fire" ? "bg-red-500 text-white" :
                    card.type === "Grass" ? "bg-green-500 text-white" :
                    "bg-blue-500 text-white"
                  }`}
                >
                  {card.transaltion}
                </p>
              </div>
              <div className="absolute p-2 text-white bg-green-500 rounded-full shadow-lg top-2 right-2">✅</div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
