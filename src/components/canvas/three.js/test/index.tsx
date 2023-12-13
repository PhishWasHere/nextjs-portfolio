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

import * as gui from 'dat.gui';

export default function TestCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      const axes = new THREE.AxesHelper(5);
      // const orbit = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color('#111111');

      // scene.add(axes);
      // neeed to set cam position somewhere or else the thing wont render
      camera.position.set(0, 0, 5)
      // camera.lookAt(300, 20, 100)
      

      // orbit.update();

      const wave = new Effect();
      // wave.rotation(5.55, 0.6, 0.05);
      // wave.position(-7.04, -1.2, 4.65);
      scene.add(wave.init());

      // dat gui
      // const gui = new dat.GUI();
      // gui.add(wave.rotation, 'x', 0, Math.PI * 2, 0.01);
      // gui.add(wave.rotation, 'y', 0, Math.PI * 2, 0.01);
      // gui.add(wave.rotation, 'z', 0, Math.PI * 2, 0.01);

      // gui.add(wave.position, 'x', -10, 10, 0.01);
      // gui.add(wave.position, 'y', -10, 10, 0.01);
      // gui.add(wave.position, 'z', -10, 10, 0.01);
      // dat gui end
      
      // bloom and shaders
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const renderScene = new RenderPass(scene, camera);

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.25, 0.5, 0.1);
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
        composer.render();
        wave.update();
        requestAnimationFrame(animate);
      };
      animate();
      
      window.addEventListener('resize', () => {
        wave.updateWindow(window.innerWidth, window.innerHeight);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // wave.rotation.set(5.55, 0.6, 0.05);
        // wave.position.set(-7.04, -1.2, 4.65);
      });
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <>
      <section className='fixed top-0 left-0 bottom-0 right-0'>
        <canvas className='absolute w-full h-full top-0 left-0 -z-[99]' id='canvas' ref={ref}/>
      </section>
    </>
  )
}