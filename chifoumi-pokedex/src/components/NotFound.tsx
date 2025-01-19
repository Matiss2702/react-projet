import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound () {
  return (
    <Layout title="404 - Page not found">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-xl">Page not found</p>
        <Button>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    </Layout>
  );
}

export default NotFound;