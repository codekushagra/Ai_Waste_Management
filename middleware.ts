import { NextRequest, NextResponse } from 'next/server';

// Define public routes that don't need authentication
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if it's a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // For client-side routes, we can't check localStorage in middleware
  // So we'll use a cookie-based approach or check in the component
  // For now, we'll let the component handle auth checks
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
