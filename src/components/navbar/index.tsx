'use client'
import { useEffect, useState } from 'react';

type NavProps = {
  gotoSection: (i: number) => void;
  isHidden: boolean;
}

export default function Navbar({gotoSection, isHidden}: NavProps) {
  useEffect(() => {
    console.log('aaaaaaaaaaaa', isHidden);
  }, [isHidden]);
  
  return (
    <>
      <nav id="nav" className="flex justify-center opacity-0 z-30">
        <button className="mx-1" onClick={() => gotoSection(0)} disabled={isHidden}>About</button>
        <button className="mx-1" onClick={() => gotoSection(1)} disabled={isHidden}>Projects</button>
        <button className="mx-1" onClick={() => gotoSection(2)} disabled={isHidden}>Contact</button>
      </nav>
    </>
  )
}