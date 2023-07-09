'use client'
import React from 'react'
import { useState } from 'react'
import Avatar from './avatar'
import Stack from './stack'
import Feat from './feat'
import Repos from './repos'
import GPT from '../gpt'

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
        <div className="lg:flex min-h-screen justify-center">
          <aside className='px-3 py-1 border lg:max-w-lg '>
            <div className='md:min-w-full'>
              <Avatar />
              <div className='flex my-3 flex-col justify-center'>
                {!gpt && (
                  <h3 className='text-xl mx-auto'>
                    <button onClick={showChat}>Have a live chat with me*</button>
                  </h3>
                )}
                {gpt && (
                  <>
                  <div className='mx-auto'>
                    <button onClick={closeChat}>Close chat</button>
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
          
          <main className='container w-full border max-w-7xl'>
            <Feat />
            <Repos />
          </main>
        </div>

        </>
      )
}
    