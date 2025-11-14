import AdminSidebar from "@/components/common/sidebar/admin-sidebar";
import PublicSidebar from "@/components/common/sidebar/public-sidebar";
import RouteBreadcrumbs from "@/components/common/breadcrumbs/route-breadcrumbs";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionProvider } from "@/lib/context/session-provider";
import { Separator } from "@radix-ui/react-separator";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Administrador ASHA Solution",
  description: "Administrador | ASHA Solution",
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AdminSidebar />
        <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <RouteBreadcrumbs
                  baseLabel="Administrador Intranet"
                  baseHref="/admin"
                  omitFirstSegmentIf="admin"
                />
              </div>
            </header>
          <main className="px-4">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>        
    </SessionProvider>
  );
}
