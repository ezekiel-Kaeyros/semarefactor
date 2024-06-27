import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  const locale = getLocale(request);

  const protectedPath = [
    `/${locale}`,
    `/${locale}/dashboard`,
    `/${locale}/dashboard/bulk-messages`,
    `/${locale}/dashboard/chatbot`,
    `/${locale}/dashboard/scenarios`,
    `/${locale}/dashboard/loyalty-program`,
    `/${locale}/dashboard/setting`,
    `/${locale}/dashboard/tombola-program`,
    `/${locale}/onboarding`,
  ];

  const publicPath = [
    `/${locale}`,
    `/${locale}/login`,
    // `/${locale}/dashboard/chatbot`,
    // `/${locale}/dashboard/bulk-messages`,
    `/${locale}/signup`,
    `/${locale}/verify-code`,
  ];

  if (!request.cookies.get('user_dba_data') && !publicPath.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  } else if (
    request.cookies.get('user_dba_data') &&
    !protectedPath.includes(pathname) &&
    !pathname.includes('/dashboard/chatbot') &&
    !pathname.includes('/dashboard/bulk-messages') &&
    !pathname.includes('/dashboard/scenarios')
  ) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard/`, request.url));
  } else {
    return NextResponse.next();
  }
  // }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
