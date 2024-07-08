import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); 
  console.log("En el middleware para la ruta:", request.nextUrl.pathname);
  
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    console.log(`No token cookie, redirecting a ${loginUrl}`);
    
    return NextResponse.redirect(loginUrl);
  } else {
    console.log("Yes token cookie!", token);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/cart/:path*', '/userProfile/:path*'], 
};
