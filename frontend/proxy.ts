import { PrivateRoutes, PublicRoutes } from "@/lib/consts/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = Boolean(
    request.cookies.get("access_token")?.value ||
    request.cookies.get("refresh_token")?.value
  );

  const publicPaths = Object.values(PublicRoutes);
  const privatePaths = Object.values(PrivateRoutes);

  const isPathOf = (paths: string[]) =>
    paths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  const isPublic = isPathOf(publicPaths);
  const isPrivate = isPathOf(privatePaths);

  if (!hasSession && isPrivate) {
    const loginUrl = new URL(PublicRoutes.LOGIN, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL(PrivateRoutes.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf|otf)).*)',
  ],
};