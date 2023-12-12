import * as THREE from 'three';
//@ts-ignore
import vertex from './shaders/.vert';
//@ts-ignore
import fragment from './shaders/.frag';
import * as dat from 'dat.gui';

export class Effect {
  uniforms: {
    uResolution: { value: THREE.Vector2 };
    uTime: { value: number };
    uResolution1: { value: THREE.Vector4 };
    uCameraPos: { value: THREE.Vector3 };
    uLightPos: { value: THREE.Vector3 };
  };
  geometry: THREE.BufferGeometry | null;
  material: THREE.ShaderMaterial | null;
  mesh: THREE.Points | null;
  vertex: string;
  fragment: string;

  constructor(){
    // super();
    this.uniforms = { 
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0.0 },
      uResolution1: { value : new THREE.Vector4()},
      uCameraPos: { value: new THREE.Vector3() },
      uLightPos: { value: new THREE.Vector3(-5, 5, 5).normalize() },
    };
    this.geometry = null;
    this.material = null;
    this.mesh = null;

    this.vertex = vertex;
    this.fragment = fragment;

    this.init();
    this.update();
  }
  
  init() {
    // const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    // const spherePos = sphereGeo.getAttribute('position').clone();

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      uniforms: this.uniforms, 
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      wireframe: false,
      transparent: true,
      blending: THREE.NormalBlending,
      // side: THREE.DoubleSide,
      depthWrite: true,
      depthTest: true,
    });
    let number = 20000;

    let pos = new Float32Array(number * 3);
    let rows = Math.sqrt(number);
    let cols = Math.sqrt(number);

    for (let i = 0; i < number; i++) {
      let i3 = i * 3;
      let x = 0.1 * (i % rows);
      let y = 0.1 * (Math.floor(i / cols));
      let z = 0.1 * (Math.random() * 10 - 2 * Math.PI * 2 );
      pos[i3 + 0] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.rotation.set(0, 190, 0);
    return this.mesh;
  }

  update(){
    this.uniforms.uTime.value += 0.005;
  }

  set(x: number, y: number, z: number){
    this.mesh?.position.set(x, y, z);
  }

  rotate(x: number, y: number, z: number){
    this.mesh?.rotation.set(x, y, z);
  }
}