'use client'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa


export default function PlaneCanvas() {
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

      const planeGeo = new THREE.PlaneGeometry(15, 15, 50, 50);
      const planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      scene.add(plane);
      plane.rotation.x = -Math.PI / 2;
      
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      scene.add(light);
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement); // Use appendChild on document.body

      const animate = () => {
        renderer.render(scene, camera);
        for (let i = 0; i < planeGeo.attributes.position.count; i++) {
          planeGeo.attributes.position.array[i] += 0.01 * (Math.random() * 2 - 1);
        }
        planeGeo.attributes.position.needsUpdate = true;
      };
      
      renderer.setAnimationLoop(animate); // Use setAnimationLoop instead of animate();
    }
  }, []);

  return (
    <>
      <canvas id='canvas' ref={ref}>
        {/* <Particles /> */}
      </canvas>
    </>
  )
}
