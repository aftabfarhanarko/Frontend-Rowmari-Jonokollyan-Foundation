import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Route permissions mapping: subpaths to permitted roles
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/dashboard/settings': ['SUPER_ADMIN'],
  '/dashboard/users': ['SUPER_ADMIN', 'ADMIN'],
  '/dashboard/finance': ['SUPER_ADMIN', 'ADMIN', 'FINANCE_MANAGER'],
  '/dashboard/blood': ['SUPER_ADMIN', 'ADMIN', 'BLOOD_COORDINATOR'],
  '/dashboard/medical': ['SUPER_ADMIN', 'ADMIN', 'MEDICAL_COORDINATOR', 'CASE_WORKER'],
  '/dashboard/education': ['SUPER_ADMIN', 'ADMIN', 'EDUCATION_COORDINATOR'],
  '/dashboard/volunteers': ['SUPER_ADMIN', 'ADMIN', 'VOLUNTEER_MANAGER', 'VOLUNTEER_COORDINATOR'],
  '/dashboard/cases': ['SUPER_ADMIN', 'ADMIN', 'CASE_WORKER', 'MEDICAL_COORDINATOR'],
  '/dashboard/content': ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run protection logic for dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const hasSessionCookie = request.cookies.has('rjf_session') || request.cookies.has('rkf_refresh');
    const userRole = request.cookies.get('rjf_auth_role')?.value || 'COMMUNITY_MEMBER';

    // 1. If user is trying to access privileged admin routes without session, redirect to login
    const isRestrictedAdminRoute = Object.keys(ROUTE_PERMISSIONS).some((route) =>
      pathname.startsWith(route)
    );

    if (isRestrictedAdminRoute && !hasSessionCookie && userRole === 'COMMUNITY_MEMBER') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Role-Based Access Control (RBAC) check for subpaths
    for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          // Redirect forbidden user to main dashboard with notification query param
          const dashboardUrl = new URL('/dashboard', request.url);
          dashboardUrl.searchParams.set('denied', pathname.split('/').pop() || 'tab');
          return NextResponse.redirect(dashboardUrl);
        }
        break;
      }
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

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
