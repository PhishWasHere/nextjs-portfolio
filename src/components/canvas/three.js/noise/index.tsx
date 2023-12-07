'use client'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { Effect } from './effect';

import { createAttractor, updateAttractor, aizawaAttractor } from '@/utils/attractor';

export default function ThreeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      const axes = new THREE.AxesHelper(5);
      const orbit = new OrbitControls(camera, renderer.domElement);

      scene.add(axes);
      camera.position.set(3, 2, 7)
      orbit.update();
      const ball = new Effect();
      scene.add(ball.init()); 

      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement); // Use appendChild on document.body
      
      const animate = () => {
        renderer.render(scene, camera);
        ball.update();
      };
      renderer.setAnimationLoop(animate); // Use setAnimationLoop instead of animate();

      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    }
  }, []);

  return (
    <>
      <canvas id='canvas' ref={ref}>
      </canvas>
    </>
  )
}

