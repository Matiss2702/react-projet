import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-white">
      <h1 className="font-bold text-7xl">404</h1>
      <p className="text-xl">Page not found</p>
      <Button>
        <Link to="/" className="text-white">
          Go back to home
        </Link>
      </Button>
    </div>
  );
}

export default NotFound;
