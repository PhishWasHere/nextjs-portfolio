import * as THREE from 'three';

// i dont know how any of this works, i suck at math
export function createAttractor(length: number, start?: any) {
  const positions = [];

  const p = start ? start : [0.1, 0.1, 0.1];
  for (let i = 0; i < length; i++) {
    positions.push(new THREE.Vector3().fromArray(p));
  }

  const currentPosition = new THREE.Vector3().fromArray(p);

  return [positions, currentPosition];
}

export function updateAttractor(currentPosition: THREE.Vector3, scale: number, simulation: any, timeStep: number) {
  const [dx, dy, dz] = simulation(currentPosition.toArray(), timeStep);

  currentPosition.add(new THREE.Vector3(dx, dy, dz));

  const normalizedPosition = currentPosition
    .clone()
    .normalize()
    .multiplyScalar(scale);

  return normalizedPosition;
}

/**
 * Different attractor types
 * https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/
*/

export function aizawaAttractor([x, y, z]: any, timestep: number) {
  const a = 0.95;
  const b = 0.7;
  const c = 0.6;
  const d = 3.5;
  const e = 0.25;
  const f = 0.1;

  const dx = ((z - b) * x - d * y) * timestep;
  const dy = (d * x + (z - b) * y) * timestep;
  const dz =
    (c + a * z - (z * z * z) / 3 - x * x + f * z * (x * x * x)) * timestep;

  return [dx, dy, dz];
}

export function dequanAttractor([x, y, z]: any, timestep: number) {
  const a = 40.0;
  const b = 1.833;
  const c = 0.16;
  const d = 0.65;
  const e = 55.0;
  const f = 20.0;

  const dx = (a * (y - x) + c * x * z) * timestep;
  const dy = (e * x + f * y - x * z) * timestep;
  const dz = (b * z + x * y - d * x * x) * timestep;

  return [dx, dy, dz];
}

export function lorenzAttractor([x, y, z]: any, timestep: number) {
  const beta = 8 / 3;
  const rho = 28;
  const sigma = 10;

  const dx = sigma * (y - x) * timestep;
  const dy = (x * (rho - z) - y) * timestep;
  const dz = (x * y - beta * z) * timestep;

  return [dx, dy, dz];
}

