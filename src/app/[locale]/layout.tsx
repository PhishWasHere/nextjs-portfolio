import type { Metadata } from 'next'
import NotFound from './not-found';
import { Raleway } from 'next/font/google'
import './globals.css'
import { ContextProvider } from '@/utils/context';


// import config from '@/amplifyconfiguration.json';
// import { Amplify } from 'aws-amplify';

// Amplify.configure(config, {
//   ssr: true // required when using Amplify with Next.js
// });

const raleway = Raleway({ subsets: ['latin'] })

const locales = ["en", "jp"];

export const metadata: Metadata = {
  title: `Miran Yasunori`,
  description: 'One Of The JavaScript Developers Of All Time | Full Stack Enthusiast | Monash Fullstack Bootcamp Graduate',
}

export default function RootLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  if (!locales.includes(locale as any)) return <NotFound/>;

  return (
    <html lang={locale}>
      <body className={raleway.className}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
