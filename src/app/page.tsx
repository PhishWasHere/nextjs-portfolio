import { useState } from 'react'

import NavBar from '@/components/nav'
import Home from '@/components/home'

import Seed from '../utils/seed'
import ConnectDB from '../config'


const db = async () => {
  await ConnectDB();
  await Seed();
}
db();



export default function Portfolio() {
  return (
    <>
    <Home /> 
    </>
  )
}
