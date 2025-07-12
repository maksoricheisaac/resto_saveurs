import { AppSidebar } from "@/components/app-sidebar";
import FeedbackDialog from "@/components/feedback-dialog";
import { SidebarInset } from "@/components/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "@/components/user-dropdown";
import { RiScanLine } from "@remixicon/react";

export default function PublicRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 bg-white">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="-ms-4" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      <RiScanLine size={22} aria-hidden="true" />
                      <span className="sr-only">Administration</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Contacts</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex gap-3 ml-auto">
              <FeedbackDialog />
              <UserDropdown />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  