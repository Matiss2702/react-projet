import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border p-4">
      <div className="container mx-auto">
        <div className="text-xs text-center">
          <p>© 2025 - Shifumi Pokémon</p>
          <p>Made by <Link to="https://github.com/Matiss2702">Matiss</Link> & <Link to="https://github.com/PHANGWilly">Willy</Link></p>
          <p><Link to="https://github.com/Matiss2702/react-projet">Github</Link></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;