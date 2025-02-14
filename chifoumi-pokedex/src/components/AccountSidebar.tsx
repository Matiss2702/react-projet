import { House, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { NavHeader } from "@/components/AccountHeader";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const data = {
  homes: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/auth/login");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader homes={data.homes} />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        {user && (
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
