'use client'
import { useEffect } from 'react';
import { motion } from "framer-motion";
import LoadingCanvas from '@/components/canvas/three.js/loading';

export default function Loading() {
  const text = ["L", "o", "a", "d", "i", "n", "g"];
 
  return (
    <>
      <motion.section className='flex justify-center text-4xl'>
        {text.map((char, index) => (
          <motion.span 
            key={index} 
            animate={{ rotateX: [0, 180, 0] }}
            transition={{
              duration: 1,
              delay: index * 0.3,
              repeat: Infinity,
              repeatType: 'reverse' as const,
              repeatDelay: 1.5,
            }}
            >
            {char}
          </motion.span>
        ))}...
      </motion.section>
    </>
  );
 }