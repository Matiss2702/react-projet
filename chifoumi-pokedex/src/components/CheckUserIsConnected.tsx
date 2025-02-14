import { useUser } from "@/context/UserContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  type?: string;
}

export default function CheckUserIsConnected({ type }: Props) {
  const { user } = useUser();

  if (user) return null;

  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto mb-16">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>Connexion requise !</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Vous devez être connecté pour sélectionner votre Pokémon de type {type}.</p>
        <div className="flex items-center gap-4">
          <Link to="/auth/login">
            <Button>
              <span>Se connecter</span>
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="outline" className="text-accent-foreground">
              <span>S'inscrire</span>
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
}
