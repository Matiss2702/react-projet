import axios from "axios";
import { useState } from "react";
import { CreateMatchModalProps } from "@/constants/type";
import { Button } from "@/components/ui/button";
export default function CreateMatchModal({ onClose, onCreate }: CreateMatchModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMatch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/matches`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Match créé avec succès !");
        onClose();
        onCreate?.();
      } else {
        setError(response.data.match || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur lors de la création d'un match :", err);
      setError("Une erreur est survenue lors de la création du match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="mb-4 text-lg font-bold">Créer une nouvelle partie</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="grid gap-2">
        <Button
          onClick={createMatch}
          disabled={loading}
          className={`${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Création en cours..." : "Créer"}
        </Button>
        <Button
          variant="outline" 
          onClick={onClose} disabled={loading}
          className="w-full"
          >
          Annuler
        </Button>
        </div>
      </div>
    </div>
  );
}
