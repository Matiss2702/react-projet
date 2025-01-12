import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <Helmet title="Accueil" />
      <div className="flex-1 p-2 blue:pt-2.5">
        <div className="flex flex-1 justify-center bg-white p-4 shadow blue:bg-white/10">
          <h1 className="text-xl font-medium text-neutral-950 blue:text-white dark:text-white">
                Bienvenue sur la page d'accueil
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
