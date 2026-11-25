import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes: Accessible by authenticated users (SUPER_ADMIN and COMMUNITY_MEMBER)
  if (pathname.startsWith('/dashboard')) {
    const hasSessionCookie = request.cookies.has('rjf_session') || request.cookies.has('rkf_refresh');
    const userRole = request.cookies.get('rjf_auth_role')?.value;

    // 1. Unauthenticated visitors must be redirected to /login
    if (!hasSessionCookie || !userRole) {
      const loginUrl = new URL('/login', request.url);
      const fullPath = pathname + request.nextUrl.search;
      loginUrl.searchParams.set('redirect', fullPath);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Validate role: Both SUPER_ADMIN and COMMUNITY_MEMBER are valid registered members
    if (userRole !== 'SUPER_ADMIN' && userRole !== 'COMMUNITY_MEMBER') {
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Set standard security headers on response
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  return response;
}

export default proxy;
