import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import config from '@/amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';

Amplify.configure(config, {
  ssr: true // required when using Amplify with Next.js
});

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Miran Yasunori',
  description: 'One Of The JavaScript Developers Of All Time | Full Stack Enthusiast | Monash Fullstack Bootcamp Graduate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  )
}
