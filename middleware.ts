// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// صفحاتی که نیاز به احراز هویت دارند
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // اگر مسیر محافظت‌شده بود و توکن نداشت، ریدایرکت به ورود
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/auth/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
