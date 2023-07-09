import Image from 'next/image'

import Avatar from '../components/avatar'
import Stack from '../components/stack'

import Feat from '../components/feat'
import Repos from '../components/repos'

import Seed from '../utils/seed'
import ConnectDB from '../config'



export default function Home() {

  const db = async () => {
    await ConnectDB();
    await Seed();
  }

  db();

  return (
    <>
    <div className="lg:flex min-h-screen justify-center">
      <aside className='px-3 py-1 border lg:max-w-lg '>
        <div className='md:min-w-full'>
          <Avatar />
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
