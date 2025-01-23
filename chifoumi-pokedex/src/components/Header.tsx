import { Link } from "react-router-dom";
import { useState } from "react";
import JoinGame from "@/components/JoinGame";
import AccountButton from "@/components/AccountButton";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Gérer le délai pour éviter que le menu disparaisse immédiatement
  let timeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <header className="p-4 bg-white shadow-md">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo ou Titre */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold transition hover:text-yellow-300">
              Chifoumi Pokémon
            </Link>
          </div>

          {/* Liens de navigation */}
          <div className="relative flex items-center gap-6">
            {/* Liens Auth */}
            <Link to="/auth/login" className="transition hover:underline hover:text-yellow-300">
              Connexion
            </Link>
            <Link to="/auth/register" className="transition hover:underline hover:text-yellow-300">
              Inscription
            </Link>
            <Link to="/game/matchlist" className="transition hover:underline hover:text-yellow-300">
              game
            </Link>

            {/* Dropdown Category */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="transition hover:underline hover:text-yellow-300">Category</button>
              {isDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white border rounded-md shadow-md top-12">
                  <ul className="flex flex-col p-2">
                    <li>
                      <Link to="/category/water" className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-500">
                        Eau
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/fire" className="block px-4 py-2 hover:bg-red-100 hover:text-red-500">
                        Feu
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/plant" className="block px-4 py-2 hover:bg-green-100 hover:text-green-500">
                        Plante
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Boutons spécifiques */}
            <AccountButton />
            <JoinGame />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
