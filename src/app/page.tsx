
import HomeCanvas from "@/components/canvas/home"
import ThreeCanvas from "@/components/canvas/three.js/noise"
import PlaneCanvas from "@/components/canvas/three.js/plane"
import ParticleCanvas from "@/components/canvas/three.js/particleBG"


export default function Home() {
  return (
    <main className=" bg-red-500">
      {/* <ThreeCanvas /> */}
      {/* <PlaneCanvas /> */}
      <ParticleCanvas />
    </main>
  )
}
