import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import { DemoProvider } from '@/utils/context'

import Socials from '@/components/home/socials'
import Sidebar from '@/components/sidebar'
import Status from '@/components/common/status-modal'
import HelloWorld from '@/components/hello-world'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Miran Yasunori',
  description: 'One Of The JavaScript Developers Of All Time | Full Stack Enthusiast | Monash Fullstack Bootcamp Graduate',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <html lang="en" className=''>
          <body className={raleway.className}>
             <DemoProvider>
              {children}
            </DemoProvider>
          </body>
        </html>
    </>
  )
}
