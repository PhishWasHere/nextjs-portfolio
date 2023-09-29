import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Miran Yasunori',
  description: 'Contact page for Miran',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <html lang="en" className=''>
          <body className={raleway.className}>{children}</body>
        </html>
    </>
  )
}
