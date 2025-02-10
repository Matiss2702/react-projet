import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const userId = extractUserIdFromToken(token);
      if (!userId) {
        throw new Error("Impossible de récupérer l'identifiant utilisateur depuis le token.");
      }

      localStorage.setItem("userId", userId);
      setUserId(userId);

      navigate("/game/matchlist");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverResponse = err.response;
        console.error("Erreur de connexion :", serverResponse || err.message);

        setError("Identifiants invalides. Veuillez réessayer.");
      } else if (err instanceof Error) {
        console.error("Erreur de connexion :", err.message);
        setError(err.message);
      } else {
        console.error("Erreur inconnue :", err);
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  const extractUserIdFromToken = (token: string): string | null => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken?._id || null;
    } catch (error) {
      console.error("Erreur lors de l'extraction de l'userId :", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4 text-2xl font-bold">Connexion</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-80">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Connexion
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
