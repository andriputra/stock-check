import { NextRequest, NextResponse } from 'next/server';

// Helper function to check the session by making a request to the backend
async function checkSessionWithBackend(request: NextRequest) {
  const backendUrl = 'https://stock-check-backend.vercel.app/api/check-session'; // Your backend URL

  // Make a request to the backend to verify the session
  const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': request.headers.get('cookie') || '', // Send the cookies from the request
    },
  });

  // If the backend returns a successful response, the session is valid
  if (response.ok) {
    const data = await response.json();
    return data.message.includes('Logged in as');
  }

  return false; // Session is invalid or not found
}

export async function middleware(request: NextRequest) {
  console.log("Middleware is being triggered");

  const url = new URL(request.url);

  // Check the session using the backend
  const isSessionValid = await checkSessionWithBackend(request);

  // If session is not valid and the user is trying to access a protected route (not /login), redirect them to login
  if (!isSessionValid && url.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If session is valid or it's the login page, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/create-form',
    '/check-results',
    '/api',
    '/login'
  ],
}
