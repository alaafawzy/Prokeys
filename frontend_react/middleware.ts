import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check for language preference in cookies
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;

  // Redirect to locale path
  return NextResponse.redirect(
    new URL(`/${localeCookie}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
