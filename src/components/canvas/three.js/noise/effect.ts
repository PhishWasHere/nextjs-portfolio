'use client'
import * as THREE from 'three';
//@ts-ignore
import vertex from './shaders/.vert';
//@ts-ignore
import fragment from './shaders/.frag';

export class Effect {
  uniforms: {
    u_resolution: { type: string; value: THREE.Vector2; };
    u_time: { type: string; value: number; };
    u_lightColor: { type: string; value: THREE.Color; };
    u_lightPosition: { type: string; value: THREE.Vector3; };
  };
  geometry: THREE.IcosahedronGeometry | null;
  material: THREE.ShaderMaterial | null;
  mesh: THREE.Mesh | null;
  vertex: string;
  fragment: string;

  constructor(){
    this.uniforms = { 
      u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio) },
      u_time: { type: 'f', value: 0.0 },
      u_lightColor: { type: 'c', value: new THREE.Color('pink') },
      u_lightPosition: { type: 'v3', value: new THREE.Vector3(5, 5, 5).normalize() },
    };
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.vertex = vertex
    this.fragment = fragment;
  }

  init() {
    this.geometry = new THREE.IcosahedronGeometry(4, 32);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      wireframe: true,
      vertexShader: this.vertex,
      fragmentShader: this.fragment
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);    
    return this.mesh;
  }

  set(x: number, y: number, z: number) {
    this.mesh?.position.set(x, y, z);
  }
  
  update() {
    this.uniforms.u_time.value += 0.005;
    // this.mesh!.rotation.y += 0.001;
  }
}