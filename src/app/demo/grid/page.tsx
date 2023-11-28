'use client'
import { useDemo } from '@/utils/context';
import { useEffect } from 'react';
import Canvas from './canvas/sketch';

export default function Page() {
  const { isDemo, setIsDemo } = useDemo();  
  
  useEffect(() => {
    setIsDemo(true);

    return () => {
      setIsDemo(false);
    }
  }, []);

  return (
    <>
      <div className='overflow-hidden'>
        <h1 className='text-4xl text-red-500 font-bold absolute'>grid</h1>
        <div className=' -z-10'>
          <Canvas/>
        </div>
      </div>
    </>
  )
}