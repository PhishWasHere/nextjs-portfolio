import Image from 'next/image'


import NavBar from '@/components/nav'
import Home from '@/components/home'


import Seed from '../utils/seed'
import ConnectDB from '../config'



export default function Portfolio() {

  const db = async () => {
    await ConnectDB();
    await Seed();
  }

  db();

  return (
    <>
    <NavBar />

    <Home />
    </>
  )
}
