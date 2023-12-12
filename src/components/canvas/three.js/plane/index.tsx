'use client'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import { Effect } from './effect';

const vShader = `
  uniform float u_time;
  
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+10.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }
  attribute vec3 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying vec3 vNormal;
  void main() {
    float noise = pnoise(position + u_time, vec3(10.0));
    float displacement = float(5) * noise / float(10);
    vec3 newPosition = position + normal * displacement;

    // vec3 normal = normalize(normalMatrix * normal);

    vNormal = normal;
    vColor = aColor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`
const fShader = `
  uniform vec2 u_resolution;
  uniform vec3 u_lightColor;
  uniform vec3 u_lightPosition;

  varying vec3 vColor;
  vec3 lightColor = vec3(1.0, 1.0, 1.0);

  varying vec3 vNormal;

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec3 normal = normalize(vNormal);

    // last 2 args for nDotL are ambiant light, and specular light
    float nDotL = clamp(dot(normal, u_lightPosition), 0.0, 1.0);
    vec3 diffuse = u_lightColor * lightColor * nDotL;
    gl_FragColor = vec4(mix(color, diffuse, 0.5), 1.0);
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

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2() },
        u_lightColor: { value: new THREE.Color(0xffffff) },
        u_lightPosition: { value: new THREE.Vector3(0.5, 0.5, 0.5) },
      }
      const verticesOfCube = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
      ];
    
      const indicesOfFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
      ];

      const geometry = new THREE.PolyhedronGeometry(Array.from(verticesOfCube), Array.from(indicesOfFaces), 1, 100);
      const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vShader, fragmentShader: fShader });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement); 
      

      const animate = () => {
        renderer.render(scene, camera);
        uniforms.u_time.value += 0.005;
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
