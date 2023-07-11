'use client'
import React from 'react'
import { useState } from 'react'
import Avatar from './avatar'
import Stack from './stack'
import Feat from './feat'
import Repos from './repos'
import GPT from '../chat'

export default function Home() {
  const [gpt, setGpt] = useState(false)
  const showChat = () => {
    setGpt(!gpt)
  }
  const closeChat = () => {
    setGpt(!gpt)
  }

    return (
        <>
        <div className="lg:flex min-h-screen justify-center mb-5">
          <aside className='px-3 py-1 lg:max-w-lg '>
            <div className='md:min-w-full'>
              <Avatar />
              <div className='flex my-4 flex-col justify-center'>
                {!gpt && ( 
                  <h3 className='text-lg mx-auto px-4 p-2 bg-white '>
                    Have a live <button onClick={showChat} className='px-1.5 font-semibold transition shadow-lg hover:text-teal-500 hover:bg-zinc-950/90 text-slate-900 ring-1 hover:border-teal-500 border bg-teal-500 ring-white '>chat</button> with me*
                  </h3>
                )}
                {gpt && (
                  <>
                  <div className='mx-auto text-lg px-4 p-2'>
                    <button onClick={closeChat} className='px-4 py-1 mb-2 font-semibold transition shadow-lg hover:text-teal-500 hover:bg-zinc-950/90 ring-1 hover:border-teal-500 border backdrop-blur bg-white ring-white/10'>Close chat</button>
                  </div>
                  <h3 className='mx-auto w-full'>
                    <GPT />
                  </h3>
                  </>
                )}
              </div>
              <Stack />
            </div>
          </aside>
          
          <main className='container w-full max-w-7xl'>
            <Feat />
            <Repos />
          </main>
        </div>

        </>
      )
}
    