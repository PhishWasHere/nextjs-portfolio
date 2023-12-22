'use client'

// might make everything into a component since css styles are breaking if applied to this component directly

import { createContext, useContext, useState, useEffect } from 'react';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"
import Loading from '../../app/[locale]/loading';
import ContextComponent from '@/components/contextComonent';

export const Context = createContext<any>(null); 

export const usePathState = () => {
  return useContext(Context);
}

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [pathChange, setPathChange] = useState(false);

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    // need to set isLoading to false here too
    setIsloading(false);
  }, [isLoading]);

  return(
    <Context.Provider value={[pathChange, setPathChange]}>
    {isLoading ? (
      <Loading />
    ) : (
      <main className="">
          <ContextComponent />

          <section className='overflow-auto' >
            {children}
          </section>
        
        <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
      </main>
    )}
    </Context.Provider>
  )
}