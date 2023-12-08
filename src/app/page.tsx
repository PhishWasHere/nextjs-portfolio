
import HomeCanvas from "@/components/canvas/home"
import ThreeCanvas from "@/components/canvas/three.js/noise"
import PlaneCanvas from "@/components/canvas/three.js/plane"


export default function Home() {
  return (
    <main className=" bg-red-500">
      {/* <HomeCanvas /> */}
      <ThreeCanvas />
      {/* <PlaneCanvas /> */}
    </main>
  )
}
