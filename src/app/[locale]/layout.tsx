import type { Metadata } from 'next'

import { notFound } from 'next/navigation';
import { Raleway, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { ContextProvider } from '@/utils/context';
import {NextIntlClientProvider, useMessages} from 'next-intl';

import { locales } from '@/navigation';

// template.tsx doesnt animate on page change so i need to use this abomanation
import Wrapper from '@/app/[locale]/wrapper';
// 

import config from '@/amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';

Amplify.configure(config, {ssr: true});

const raleway = Raleway({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

const fonts = {
  en: raleway,
  jp: notoSansJP,
}

export const metadata: Metadata = {
  title: `Miran Yasunori - Developer Portfolio`,
  description: 'One Of The JavaScript Developers Of All Time | Full Stack Enthusiast | Monash Fullstack Bootcamp Graduate',
}

export default function RootLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  const font = fonts[locale as keyof typeof fonts];
  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages} >
          <ContextProvider>
            <Wrapper>
            {children}
            </Wrapper>
          </ContextProvider>
        </NextIntlClientProvider >
      </body>
    </html>
  )
}
