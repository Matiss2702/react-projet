import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AccountSidebar";
import { Separator } from "@/components/ui/separator";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const isAccountPage = location.pathname.includes("account");
  const is404Page = location.pathname.includes("404");

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Chifoumi Pokémon</title>
      </Helmet>
      {isAccountPage ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-b-slate-100">
              <div className="flex items-center justify-between w-full gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4 mr-2" />
              </div>
            </header>
            <main className="flex flex-col flex-1 gap-4 p-4">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      ) : is404Page ? (
        <main className="container flex items-center justify-center flex-grow mx-auto">
          <Outlet />
        </main>
      ) : (
        <>
          <Header />
          <main className="container flex-grow p-4 mx-auto">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
