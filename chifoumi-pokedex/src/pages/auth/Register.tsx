import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        username,
        password,
      });
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Erreur lors de l'inscription :", err.response);
        setError(err.response?.data?.error || "Registration failed");
      } else if (err instanceof Error) {
        console.error("Erreur lors de l'inscription :", err.message);
        setError(err.message);
      } else {
        console.error("Erreur inconnue :", err);
        setError("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
