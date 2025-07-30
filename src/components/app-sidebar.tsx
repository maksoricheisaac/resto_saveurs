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
          description: "Vue d'ensemble"
        },
        {
          title: "Catégories",
          url: "/admin/categories",
          icon: ListOrdered,
          description: "Gérer les catégories"
        },
        {
          title: "Menu",
          url: "/admin/menu",
          icon: UtensilsCrossed,
          description: "Gérer les plats"
        },
        {
          title: "Accompagnements",
          url: "/admin/side-dishes",
          icon: UtensilsCrossed,
          description: "Gérer les accompagnements"
        },
        {
          title: "Messages",
          url: "/admin/messages",
          icon: Mail,
          description: "Messages clients"
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
      className="bg-white border-rshadow-lg rounded-r-2xl min-h-screen w-[280px] flex flex-col py-6 px-0 md:px-2 backdrop-blur-sm"
    >
      {/* Logo ou titre */}
      <div className="flex items-center justify-center mb-8 px-6 bg-white">
        <div className="text-center">
          <span className="text-2xl font-extrabold font-serif text-amber-600 tracking-tight select-none">
            Resto Saveurs
          </span>
          <p className="text-xs text-gray-500 mt-1 font-medium">Administration</p>
        </div>
      </div>
      

      
      <SidebarContent className="flex-1 overflow-y-auto px-2 bg-white">
        {/* SidebarGroup pour chaque parent */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="mb-6 bg-white">
            <SidebarGroupLabel className="uppercase text-gray-500/70 text-xs tracking-widest mb-3 px-2 font-semibold">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-0 bg-white">
              <SidebarMenu className="space-y-2 bg-white">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-1">
                    <SidebarMenuButton
                      asChild
                      className={
                        `group/menu-button font-medium gap-3 h-12 rounded-xl px-4 flex items-center transition-all duration-200 relative overflow-hidden
                        ${item.url === pathname
                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 shadow-sm border border-amber-200/60'
                          : 'hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 hover:text-amber-700 text-gray-700 hover:shadow-sm'
                        }
                        `
                      }
                      isActive={item.url === pathname}
                    >
                      <a href={item.url} className="flex items-center w-full">
                        {item.icon && (
                          <div className={`relative ${item.url === pathname ? 'text-amber-600' : 'text-gray-400 group-hover/menu-button:text-amber-600'}`}>
                            <item.icon
                              className="transition-all duration-200"
                              size={20}
                              aria-hidden="true"
                            />
                            {item.url === pathname && (
                              <div className="absolute -inset-1 bg-amber-100 rounded-full opacity-20 animate-pulse" />
                            )}
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <span className="text-sm font-semibold">{item.title}</span>
                          <p className="text-xs text-gray-500 group-hover/menu-button:text-amber-600/70 transition-colors">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="mt-4 px-2 bg-white">
        <hr className="border-t border-gray-200/60 " />
        <SidebarMenu className="space-y-2">
         
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-11 rounded-lg px-3 flex items-center hover:bg-red-50 hover:text-red-700 text-gray-600 transition-all duration-200">
              <LogOut
                className="text-gray-400 group-hover/menu-button:text-red-600 transition-colors duration-200"
                size={20}
                aria-hidden="true"
              />
              <span className="text-sm font-medium">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
