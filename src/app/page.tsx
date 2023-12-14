'use client'
import { useEffect, useState } from 'react'
// import HomeCanvas from "@/components/canvas/home"
import ThreeCanvas from "@/components/canvas/three.js/noise"
// import PlaneCanvas from "@/components/canvas/three.js/plane"
import ParticleCanvas from "@/components/canvas/three.js/particleBG"


export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    // setIsMobile(window.innerWidth < 1024);

    // window.addEventListener('resize', () => {
    //   // setIsMobile(window.innerWidth < 1024);
    //   if (window.innerWidth < 1024) {
    //     setIsMobile(true);
    //   } else {
    //     setIsMobile(false);
    //   }
    // })
    console.log('isMobile', isMobile);

    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [])

  return (
    <main className="absolute">
      <section className='fixed top-0 left-0 -z-50 pointer-events-none'>
        { isMobile ? null : <ParticleCanvas />}
      </section>
    </main>
  )
}
