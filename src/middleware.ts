import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './navigation';  

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix,
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(jp|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};