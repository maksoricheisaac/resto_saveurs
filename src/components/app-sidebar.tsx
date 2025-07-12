"use client"
import {
  LayoutDashboard,
  ListOrdered,
  UtensilsCrossed,
  Mail,
  LogOut,
} from "lucide-react";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Données de navigation admin avec icônes lucide-react
const data = {
  navMain: [
    {
      title: "Administration",
      url: "#",
      items: [
        {
          title: "Tableau de bord",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Catégories",
          url: "/admin/categories",
          icon: ListOrdered,
        },
        {
          title: "Menu",
          url: "/admin/menu",
          icon: UtensilsCrossed,
        },
        {
          title: "Messages",
          url: "/admin/messages",
          icon: Mail,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar
      {...props}
      className="bg-white border-r border-gray-200 shadow-lg rounded-r-2xl min-h-screen w-[260px] flex flex-col py-6 px-0 md:px-2"
    >
      {/* Logo ou titre */}
      <div className="flex items-center justify-center mb-8 px-6 bg-white">
        <span className="text-2xl font-extrabold font-serif text-amber-600 tracking-tight select-none">
          Saveurs du Congo
        </span>
      </div>
      <hr className="border-t border-border mx-2 -mt-px mb-4 bg-white" />
      <SidebarContent className="flex-1 overflow-y-auto px-2 bg-white">
        {/* SidebarGroup pour chaque parent */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="mb-6">
            <SidebarGroupLabel className="uppercase text-muted-foreground/60 text-xs tracking-widest mb-2 px-2">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-0">
              <SidebarMenu className="space-y-1">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-1">
                    <SidebarMenuButton
                      asChild
                      className={
                        `group/menu-button font-medium gap-3 h-11 rounded-lg px-3 flex items-center transition-all
                        ${item.url === pathname
                          ? 'bg-amber-50 text-amber-700 shadow-sm border border-amber-200'
                          : 'hover:bg-amber-50 hover:text-amber-700 text-gray-700'}
                        `
                      }
                      isActive={item.url === pathname}
                    >
                      <a href={item.url} className="flex items-center w-full">
                        {item.icon && (
                          <item.icon
                            className={`transition-colors duration-200 ${item.url === pathname ? 'text-amber-600' : 'text-gray-400 group-hover/menu-button:text-amber-600'}`}
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span className="ml-2 text-base font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="mt-4 px-2">
        <hr className="border-t border-border mx-2 -mt-px mb-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-11 rounded-lg px-3 flex items-center hover:bg-amber-50 hover:text-amber-700 text-gray-700 transition-all">
              <LogOut
                className="text-gray-400 group-hover/menu-button:text-amber-600 transition-colors duration-200"
                size={22}
                aria-hidden="true"
              />
              <span className="ml-2 text-base font-medium">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
