import { Outlet } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";

export default function PokedexLayout() {

  return (
    <>
      <Helmet titleTemplate="%s -pokedex " defaultTitle="pokedex" />
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          {<Footer />}
        </div>
      </div>
    </>
  );
}
