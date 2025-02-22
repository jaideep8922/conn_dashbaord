import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Get cookies on the server-side
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log("Request URL:", request.url);

  const cookieStore = await cookies();
const token = cookieStore.get('token');
console.log('Token retrieved from cookies:', token);



  console.log("Token retrieved from cookies:", token?.value);

  // If there's no token and the user is not on login or register page, redirect to login
  if (!token) {
    if (
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/register')
    ) {
      console.log("No token found, redirecting to /login...");
      return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
    }
  } else {
    // If token exists and the user is on login or register page, redirect them to the homepage
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      console.log("Token found, redirecting to homepage...");
      return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage if already logged in
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Exclude unnecessary paths like API, static files, etc.
  ],
};
