import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Questionable designs',
  description: 'I cant design for shit',
}
import NavBar from '@/components/nav'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=' bg-zinc-950 flex flex-col h-screen justify-between'> 
        <NavBar />
        <main className={inter.className}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
