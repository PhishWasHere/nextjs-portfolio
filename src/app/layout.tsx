import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'

import Socials from '@/components/home/socials'
import Sidebar from '@/components/sidebar'
import Status from '@/components/common/status-modal'
import HelloWorld from '@/components/hello-world'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Miran Yasunori',
  description: 'Portfolio page for Miran',
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
            <main id='bg' className='h-screen flex shadow font-extralight italic '>
              <HelloWorld/>
                <section id='noise' className='w-full sm:border-[3rem] border-black flex flex-col relative'>
                  <div className='border border-gray-200/60 h-full'>
                    <Status/>
                    <div className='sm:mx-10 sm:my-8 mx-4 my-2'>

                      <section className='flex flex-col font-thin'>
                        <Socials/>
                      </section>

                      <div className='sm:flex'>
                        <Sidebar/>
                        <section className='ml-auto transition sm:order-2'>
                          <div className=''>
                            {children}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
          </body>
        </html>
    </>
  )
}
