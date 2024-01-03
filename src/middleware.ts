import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './navigation';  
import {NextRequest} from 'next/server';


export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales,
    localePrefix,

    defaultLocale: 'en'
  });
  const response = handleI18nRouting(request);
 
  if (response.cookies.get('NEXT_LOCALE')) {
    response.cookies.delete('NEXT_LOCALE');
  }
 
  return response;
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(jp|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};