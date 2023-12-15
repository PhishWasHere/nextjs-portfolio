'use client'
import * as THREE from 'three';
import GUI from '@/utils/gui';
import Stats from 'stats.js';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/examples/jsm/Addons.js';
//@ts-ignore
import vertex from './shaders/shader.vert';
//@ts-ignore
import fragment from './shaders/shader.frag';

let count: number;
let pause: boolean = false;

// init wave variables here, so i can dispose of them later
let wave: THREE.Points;
let waveMat: THREE.ShaderMaterial;
let waveGeo: THREE.BufferGeometry;
let rotation: number[];
let position: number[];

export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element

  useEffect(() => {
  // will probably not render this component on mobile for performance reasons
    if (window.innerWidth < 1024) {
      count = 5000;
      rotation = [1, 0, 6.15];
      position = [3.8, -0.17, 0.9];
    } else {
      count = 20000;
      rotation = [1.35, 5.5, 0.9];
      position = [1.5, -0.55, 2.15];
    }
    // console.log(count)
  }, []);
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      // const axes = new THREE.AxesHelper(5);
      // const orbit = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color('#111111');
      
      // orbit.update();

      // scene.add(axes);
      camera.rotation.set(rotation[0], rotation[1], rotation[2]);
      camera.position.set(position[0], position[1], position[2]);
      
      // particle system
      const uniforms = { 
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime: { value: 0.0 },
        uCameraPos: { value: new THREE.Vector3() },
        uLightPos: { value: new THREE.Vector3(-5, 5, 5).normalize() },
      };

      waveMat= new THREE.ShaderMaterial({
        extensions: {
          derivatives: true,
        },
        uniforms: uniforms, 
        vertexShader: vertex,
        fragmentShader: fragment,
        wireframe: false,
        transparent: true,
        depthWrite: true,
        depthTest: true,
      });

      let pos = new Float32Array(count * 3);
      const rows = Math.sqrt(count);
      const cols = Math.sqrt(count);

      for (let i = 0; i < count; i++) {
        let i3 = i * 3;
        const x = 0.1 * (i % rows);
        const y = 0.1 * (Math.floor(i / cols));
        const z = 0.1 * (Math.random() * 10 - 2 * Math.PI * 2 );
        pos[i3 + 0] = x;
        pos[i3 + 1] = y;
        pos[i3 + 2] = z;
      }

      waveGeo = new THREE.BufferGeometry();
      waveGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      wave = new THREE.Points(waveGeo, waveMat);
      // particle system end
      
      scene.add(wave);

      // custom gui class for dat.gui
      // new GUI(camera).init();
      
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

      // const stats = new Stats();
      // stats.showPanel(0);
      // document.body.appendChild(stats.dom);
      
      const animate = () => {
        // stats.begin();
        setTimeout(() => {
          composer.render();
          if (pause === true) return;
          uniforms.uTime.value += 0.005;
          requestAnimationFrame(animate);
        }, 1000/45);
        // stats.end();
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
      // dispose of all objects
      wave.remove();
      waveGeo.dispose();
      waveMat.dispose();
    };
  }, []);

  return (
    <>
      <canvas className='absolute top-0 left-0 w-full h-full -z-50' id='canvas' ref={ref}/>
    </>
  )
}