'use client'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { Effect } from './effect';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/examples/jsm/Addons.js';


export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      const axes = new THREE.AxesHelper(5);
      const orbit = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color('#111111');
      
      orbit.update();

      scene.add(axes);
      // neeed to set cam position somewhere or else the thing wont render
      camera.rotation.set(1.35, 5.5, 0.9);
      camera.position.set(1.5, -0.55, 2.15);
      // camera.lookAt(300, 20, 100)
      // camera.position.set(0, 0, 5);

      
      const wave = new Effect().init();
      scene.add(wave);
      
      // // dat gui
      // const gui = new dat.GUI();
      // gui.add(camera.rotation, 'x', 0, Math.PI * 2, 0.01).name('rotation x');
      // gui.add(camera.rotation, 'y', 0, Math.PI * 2, 0.01).name('rotation y');
      // gui.add(camera.rotation, 'z', 0, Math.PI * 2, 0.01).name('rotation z');
      
      // gui.add(camera.position, 'x', -25, 25, 0.01).name('camera x');
      // gui.add(camera.position, 'y', -25, 25, 0.01).name('camera y');
      // gui.add(camera.position, 'z', -25, 25, 0.01).name('camera z');
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
        setTimeout(() => {
          composer.render();
          requestAnimationFrame(animate);
        }, 1000/45);
      };
      animate();
      
      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <>
      <section className=''>
        <canvas className='' id='canvas' ref={ref}/>
      </section>
    </>
  )
}