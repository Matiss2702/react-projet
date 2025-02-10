import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const useAuth = () => {
  const isAuthenticated = true;
  return isAuthenticated;
};

function AccountButton() {
  const isAuthenticated = useAuth();

  const link = isAuthenticated
    ? { to: "/account", title: "Account" }
    : { to: "/login", title: "Login" };

  return (
    <Button variant="outline" asChild>
      <Link to={link.to}>
        {link.title} <User />
      </Link>
    </Button>
  );
}

export default AccountButton;