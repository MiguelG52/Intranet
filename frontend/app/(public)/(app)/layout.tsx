import PublicSidebar from "@/components/common/sidebar/public-sidebar";
import CustomSidebar from "@/components/common/sidebar/sidebar";
import RouteBreadcrumbs from "@/components/common/breadcrumbs/route-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionProvider } from "@/lib/context/session-provider";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { CornerGradient } from "@/components/common/background/corner-gradient";

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
        <PublicSidebar />
        <SidebarInset className="bg-transparent/50">
          <CornerGradient />
              <header className="relative z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <RouteBreadcrumbs baseLabel="Intranet" baseHref="/home" />
              </div>
            </header>
          <main className="relative z-10">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>        
    </SessionProvider>

  );
}
