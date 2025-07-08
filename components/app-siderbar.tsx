import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { navLinks, settingLinks } from "@/app/constants";

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar className="" side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white rounded-none font-sans text-2xl bg-p1">
            Navigations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className=" hover:bg-none text-5xl text-p2 ms-0
                "
                >
                  <SidebarMenuButton asChild>
                    <a href={item.link}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl rounded-none text-white bg-p1">
            Setings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingLinks.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className=" hover:bg-none text-5xl text-p2 ms-0"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.link}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
