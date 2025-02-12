import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useUser } from "@/context/UserContext";

const useAuth = () => {
  const { userId } = useUser();
  if(!userId) return false;
  return true;
};

function AccountButton() {
  const isAuthenticated = useAuth();

  const link = isAuthenticated
    ? { to: "/account", title: "Mon compte" }
    : { to: "/auth/login", title: "Se connecter" };

  return (
    <Link to={link.to}>
      <Button variant="outline" className="w-full">
        <span>{link.title}</span>
        <User />
      </Button>
    </Link>
  );
}

export default AccountButton;