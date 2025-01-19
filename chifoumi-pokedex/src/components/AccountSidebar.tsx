import {
  House,
  Info,
} from "lucide-react"

import { NavMain } from "@/components/AccountNavMain"
import { NavUser } from "@/components/AccountNavUser"
import { NavHeader } from "@/components/AccountHeader"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  homes: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  items: [
    {
      name: "Infos",
      url: "/account/infos",
      icon: Info,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader homes={data.homes}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
