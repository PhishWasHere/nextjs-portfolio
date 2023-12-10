'use client'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import { Effect } from './effect';

const vShader = `
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fShader = `
  uniform float u_time;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

export default function PlaneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null); // Add useRef for canvas element
  
  useEffect(() => {
    if (ref.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
      const axes = new THREE.AxesHelper(5);
      const orbit = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color('white');

      scene.add(axes);
      camera.position.set(3, 2, 7)
      orbit.update();

      const line = new THREE.BufferGeometry();
      line.setAttribute('position', new THREE.BufferAttribute(new Float32Array( 500 * 2 * 3 ), 3 ) );
      const lineSegments = new THREE.LineSegments(line, new THREE.LineBasicMaterial({ color: 0xff0000 }));

      const instance = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x444444, wireframe: true }),
        500 * 2
      );
      instance.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      instance.count = 1;

      scene.add(instance, lineSegments);


      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement); 
      

      const animate = () => {
        renderer.render(scene, camera);
        // container.rotation.y += 0.01;
        // uniforms.u_time.value += 0.01;
        requestAnimationFrame(animate);
      };
      animate();
      // renderer.setAnimationLoop(animate); 

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
// const ballGeo = new THREE.SphereGeometry(1, 32, 32);
// const ballMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
// const ball = new THREE.Mesh(ballGeo, ballMat);
// scene.add(ball);


// const count = 500;
// const radius = 1;
// const points = [];
// for (let i = 0; i < count; i++) {
//   points.push(new THREE.Vector3(
//     Math.sin(i * 0.1) * radius,
//     0,
//     Math.cos(i * 0.1) * radius
//   ));
// }

// const uniforms = {
//   u_time: { value: 0 },
// }

// const boxGeo = new THREE.BoxGeometry(0.03, 0.03, 0.03);
// const boxMat = new THREE.ShaderMaterial({ uniforms, vertexShader: vShader, fragmentShader: fShader });
// const container = new THREE.Object3D();

// for (let i = 0; i < count; i++) {
//   const box = new THREE.Mesh(boxGeo, boxMat);
 
//   // Generate a random latitude and longitude
//   const lat = THREE.MathUtils.randFloat(-Math.PI, Math.PI); // Random number between -PI and PI
//   const lon = THREE.MathUtils.randFloat(-Math.PI, Math.PI); // Random number between -PI and PI
 
//   // Calculate the x, y, and z coordinates
//   const x = Math.cos(lat) * Math.cos(lon);
//   const y = Math.sin(lat);
//   const z = Math.cos(lat) * Math.sin(lon);
 
//   // Set the position of the box
//   box.position.set(x, y, z);
 
//   // Set a random rotation for the box
//   const xRot = THREE.MathUtils.randFloat(-Math.PI, Math.PI); // Random number between -PI and PI
//   const yRot = THREE.MathUtils.randFloat(-Math.PI, Math.PI); // Random number between -PI and PI
//   const zRot = THREE.MathUtils.randFloat(-Math.PI, Math.PI); // Random number between -PI and PI
//   box.rotation.set(xRot, yRot, zRot);
 
//   container.add(box);
//  }

// scene.add(container);

// const light = new THREE.AmbientLight(0x404040);
// scene.add(light);
