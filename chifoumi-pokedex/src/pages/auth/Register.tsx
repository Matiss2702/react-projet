import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { cp } from "fs";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Nom d'utilisateur doit faire au moins 2 caractères.",
  }),
  password: z.string().min(12, {
    message: "Le mot de passe doit faire au moins 12 caractères.",
  }),
});

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleRegister = async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        username: data.username,
        password: data.password,
      });
      
      if(response.status === 201) {
        alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
        navigate("/auth/login");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverResponse = err.response;
        console.error("Erreur d'inscription :", serverResponse || err.message);
        setError("L'inscription a échoué. Veuillez réessayer.");
        alert(serverResponse?.data.error);
      } else if (err instanceof Error) {
        console.error("Erreur d'inscription :", err.message);
        setError(err.message);
      } else {
        console.error("Erreur inconnue :", err);
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[450-px] mx-auto">
        <CardHeader>
          <CardTitle>S'inscrire</CardTitle>
          <CardDescription>Crée ton compte pour commencer à jouer</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
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
              <Button type="submit" className="w-full">S'inscrire</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            <span>Tu as déjà un compte ? </span>
            <Link to="/auth/login" className="font-bold hover:underline">Connecte-toi</Link>
          </p>
        </CardFooter>
      </Card>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
