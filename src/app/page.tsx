import Image from 'next/image'

import Avatar from '../components/avatar'
import Stack from '../components/stack'

import Feat from '../components/feat'
import Repos from '../components/repos'

export default function Home() {
  return (
    <>
      <aside>
        <Avatar />
        <Stack />
      </aside>
      <main>
        <Feat />
        <Repos />
      </main>
    </>
  )
}
