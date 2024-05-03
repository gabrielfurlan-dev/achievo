import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';


const headers = { 'accept-language': 'en-US,en;q=0.5' };
const languages = new Negotiator({ headers }).languages();
const locales = ['en', 'pt-br'];
const defaultLocale = 'en';

match(languages, locales, defaultLocale) // -> 'en-US'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return 'en';
}

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // Protect the route, send to sign-in if not signed in
  }
});

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
  ],
};