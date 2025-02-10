import axios from "axios";
import { useState } from "react";
import { CreateMatchModalProps } from "@/constants/type";

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

        <button
          onClick={createMatch}
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-blue-500 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Création en cours..." : "Créer"}
        </button>
        <button onClick={onClose} disabled={loading} className="w-full px-4 py-2 mt-2 text-black bg-gray-300 rounded">
          Annuler
        </button>
      </div>
    </div>
  );
}
