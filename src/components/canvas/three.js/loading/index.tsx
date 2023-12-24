'use client'
import * as THREE from 'three';
import Stats from 'stats.js';
import React, { useRef, useEffect } from 'react';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // no typescript definitions aaaaaaaa
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { Flow } from 'three/addons/modifiers/CurveModifier.js';


let flow: Flow;
export default function LoadingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!ref.current) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111111');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: ref.current }); // Use renderer instead of render
    // const axes = new THREE.AxesHelper(5);
    // scene.add(axes);
    // const stats = new Stats();

    // const orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.update();

    camera.position.set(5, 2, 5);
    camera.lookAt(0, 0, 0);

    const ballGeo = new THREE.IcosahedronGeometry(2, 1);
    const ballMat = new THREE.MeshBasicMaterial({ color: '#fff', wireframe: true });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    // axes.position.y = +0.1;
    ball.position.y = +0.1;
    scene.add(ball);
   
    const ppoints = [];
    const radius = 2.05;
    const segments = 9;

    for (let i = 0; i <= segments; i++) {
      const segment = (i / segments) * Math.PI * 2; 

      const x = Math.sin(segment) * radius;
      const z = Math.cos(segment) * radius;

      ppoints.push(new THREE.Vector3(x, 0, z));
    }

    const curve = new THREE.CatmullRomCurve3(ppoints);
    
    curve.curveType = 'centripetal';
    curve.closed = true;

    const loader = new FontLoader();
      loader.load( '/lato-hairline.json', function ( font ) {

      const textGeo = new TextGeometry( 'Loading Loading Loading Loading Loading Loading Loading Loading Loading', {
        font: font,
        size: 0.3,
        height: 0,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 0.5,
      } );

      textGeo.rotateX( Math.PI );

      const material = new THREE.MeshBasicMaterial({ color: "#fff"});

      const textObj = new THREE.Mesh( textGeo, material );
      
      flow = new Flow( textObj );
      flow.updateCurve( 0, curve );
      
      scene.add( flow.object3D );
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); 

    window.addEventListener('resize', () => {
      renderer.resetState();
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    
    
    const animate = () => {
      // stats.begin();
      setTimeout(() => {
        renderer.render(scene, camera);
        ball.rotateY(-0.01);
        ball.rotateX(0.005);
        if (flow) {
          flow.moveAlongCurve(0.001);
        }
        requestAnimationFrame(animate);
      }, 1000/45);
      // stats.end(); 
    };
    animate();


    return () => {
      scene.remove(ball);
      // scene.remove(axes);
      scene.remove(flow.object3D);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    }
  }, [])

  return (
    <>
      <canvas ref={ref}/>
    </>
  )
}