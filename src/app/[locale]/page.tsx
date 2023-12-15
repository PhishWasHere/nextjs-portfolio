
import {useTranslations} from 'next-intl';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"

export default function Home() {
  const test = useTranslations('home');
  return (
    <main className="absolute">
      {test('first')}
      <section className='fixed top-0 left-0 -z-50 pointer-events-none'>
        <ParticleCanvas />
      </section>
    </main>
  )
}
// import HomeCanvas from "@/components/canvas/home"
import { useEffect, useState } from 'react'
import ThreeCanvas from "@/components/canvas/three.js/noise"
// import PlaneCanvas from "@/components/canvas/three.js/plane"