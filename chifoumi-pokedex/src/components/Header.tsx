import { Link } from "react-router-dom";
import JoinGame from "@/components/JoinGame";
import AccountButton from "@/components/AccountButton";

function Header() {
  return (
    <header className="p-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <ul>
            <li>
              <Link to="/" className="font-bold">Chifoumi Pokémon</Link>
            </li>
          </ul>
          <ul className="flex gap-2">
            <li>
              <AccountButton />
            </li>
            <li>
              <JoinGame />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;