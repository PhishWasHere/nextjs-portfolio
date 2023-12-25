import type { Metadata } from 'next'

// import NotFound from './not-found';
import { notFound } from 'next/navigation';
import { Raleway, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { ContextProvider } from '@/utils/context';
import {NextIntlClientProvider, useMessages} from 'next-intl';

import config from '@/amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';

Amplify.configure(config, {
  ssr: true // required when using Amplify with Next.js
});

const raleway = Raleway({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

const fonts = {
  en: raleway,
  jp: notoSansJP,
}

const locales = ["en", "jp"];

export const metadata: Metadata = {
  title: `Miran Yasunori`,
  description: 'One Of The JavaScript Developers Of All Time | Full Stack Enthusiast | Monash Fullstack Bootcamp Graduate',
}

export default function AppLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  const font = fonts[locale as keyof typeof fonts];
  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages} >
          <ContextProvider>
            {children}
          </ContextProvider>
        </NextIntlClientProvider >
      </body>
    </html>
  )
}
