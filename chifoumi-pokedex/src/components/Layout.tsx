import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AccountSidebar";
import { Separator } from "@/components/ui/separator";
import JoinGame from "./JoinGame";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

function Layout({ title, children}: LayoutProps) {
  if (title.includes("account")) {
    return (
      <>
        <Helmet>
          <title>Chifoumi Pokémon - {title}</title>
        </Helmet>
        <SidebarProvider>
          <AppSidebar />
            <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-b-slate-100">
              <div className="flex justify-between items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <JoinGame />
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  }
  
  if(title.includes("404")) {
    return (
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Chifoumi Pokémon - {title}</title>
        </Helmet>
        <main className="flex-grow container mx-auto flex items-center justify-center">
          {children}
        </main>
      </div>
    )
  }

  const classNames = `flex-grow container mx-auto ${
    title === "Login" || title === "Register" ? "flex" : ""
  }`;  

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Chifoumi Pokémon - {title}</title>
      </Helmet>
      <Header />
      <main className={classNames}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;