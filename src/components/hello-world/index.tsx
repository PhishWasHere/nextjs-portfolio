'use client'
import { useEffect } from 'react'
import './style.css'

export default function HelloWorld() {
    useEffect(() => { //removes the element after animation end
        const doc = document.getElementById('fade-in');
        
        if (!doc) {
            throw new Error("Element with ID 'fade-in' not found");
        }
        
        const removeElement = () => {
          doc.removeEventListener('animationend', removeElement); 
          doc.parentNode!.removeChild(doc); 
        };
        
        doc.addEventListener('animationend', removeElement);
        
        return () => {
          doc.removeEventListener('animationend', removeElement);
        };
      }, []);
    return(
        <>
            <span id='fade-in' className='flex justify-center items-center h-screen font-medium font-sans not-italic text-2xl'>hello world<span id='blink' className='ml-1'>.</span></span>
        </>
    )
}