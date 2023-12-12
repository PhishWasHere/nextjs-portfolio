'use client'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { Effect } from './effect';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/examples/jsm/Addons.js';


export default function TestCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      const axes = new THREE.AxesHelper(5);
      const orbit = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color('#111111');

      scene.add(axes);
      camera.position.set(0, 0, 5)
      camera.lookAt(300, 20, 100)

      orbit.update();

      const wave = new Effect();
      scene.add(wave.init());
      // wave.set(-3, -1, 4)
      // wave.rotate(0, 0, 0)
      
      // bloom and shaders
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const renderScene = new RenderPass(scene, camera);

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.45, 1.0, 0.05);
      const outputPass = new OutputPass();

      const composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);
      composer.addPass(outputPass);
      // bloom and shaders end
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement); 
      
      const animate = () => {
        wave.update();
        composer.render();
        requestAnimationFrame(animate);
      };
      animate();

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