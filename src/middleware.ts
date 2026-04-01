import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.difiorebuilders.com";
const APEX_HOST = "difiorebuilders.com";

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;
  const host = headers.get("host") ?? "";
  const proto = headers.get("x-forwarded-proto") ?? "https";

  // Enforce canonical host + https in production traffic.
  if (host === APEX_HOST || (host === CANONICAL_HOST && proto !== "https")) {
    const url = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
