
"use client"

import { AppSidebar } from "@/components/app-sidebar";
import FeedbackDialog from "@/components/feedback-dialog";
import { SidebarInset } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "@/components/user-dropdown";
import { useAuth } from "@/hooks/useAdminAuth";
import { RiScanLine } from "@remixicon/react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();


  return (
    <SidebarProvider className="bg-white">
      <AppSidebar className="bg-white"/>
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/60  backdrop-blur-sm sticky top-0 z-10">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4 hover:bg-gray-100 rounded-lg p-2 transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="hover:text-amber-600 transition-colors">
                    <RiScanLine size={22} aria-hidden="true" className="text-amber-600" />
                    <span className="sr-only">Administration</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">Administration</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <FeedbackDialog />
            <UserDropdown user={
              {
                name: user?.name || "",
                email: user?.email || "",
                image: user?.image || "",
                role: user?.role || "",
              }
            } />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 lg:gap-8 py-6 lg:py-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <AdminLayoutContent>{children}</AdminLayoutContent>;
  }
  