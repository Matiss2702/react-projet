import { Link } from "react-router-dom";
import AccountButton from "@/components/AccountButton";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Droplet, Flame, Leaf } from "lucide-react";

function Header() {
  const { user } = useUser();

  const link = user ? { to: "/game/matchlist" } : { to: "/auth/login" };
  const titleNavigation = user ? "Choisir ses" : "Liste des";

  return (
    <header className="p-4 border-b shadow-md">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold text-yellow-500 transition hover:text-yellow-300">
              Chifoumi Pokémon
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="min-w-[12rem] justify-between">
                  {titleNavigation} Pokémons
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  <ul className="grid min-w-[12rem]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/water"
                          className="flex items-center gap-4 px-4 py-2 hover:bg-blue-100 hover:text-blue-500"
                        >
                          <Droplet className="w-4 h-4 mr-2" />
                          <span>Eau</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/fire"
                          className="flex items-center gap-4 px-4 py-2 hover:bg-red-100 hover:text-red-500"
                        >
                          <Flame className="w-4 h-4 mr-2" />
                          <span>Feu</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/plant"
                          className="flex items-center gap-4 px-4 py-2 hover:bg-green-100 hover:text-green-500"
                        >
                          <Leaf className="w-4 h-4 mr-2" />
                          <span>Plante</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="relative flex items-center gap-6">
            <AccountButton />
            <Link to={link.to} className="ml-2">
              <Button>
                <Gamepad2 className="mr-2" />
                Jouer !
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
