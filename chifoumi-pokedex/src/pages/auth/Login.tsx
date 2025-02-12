import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Nom d'utilisateur doit faire au moins 2 caractères.",
  }),
  password: z.string().min(12, {
    message: "Le mot de passe doit faire au moins 12 caractères.",
  }),
});

export default function Login() {
  const { setUserId } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: data.username,
        password: data.password,
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
      <Card className="w-[450-px] mx-auto">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>Connecte-toi pour défier tes amis</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-8 w-80"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom d'utilisateur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Connexion</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            <span>Tu n'as pas encore de compte ? </span>
            <Link to="/auth/register" className="font-bold hover:underline">Inscris-toi</Link>
          </p>
        </CardFooter>
      </Card>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
