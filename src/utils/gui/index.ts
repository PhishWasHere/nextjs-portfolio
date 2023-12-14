import * as dat from 'dat.gui';
import * as THREE from 'three';

export default class GUI {
  gui: dat.GUI;
  camera: THREE.Camera;
  constructor(camera: THREE.Camera) {
    this.gui = new dat.GUI();
    this.camera = camera;
  }

  init() {
    this.gui.add(this.camera.rotation, 'x', 0, Math.PI * 2, 0.01).name('camera rotation x');
    this.gui.add(this.camera.rotation, 'y', 0, Math.PI * 2, 0.01).name('camera rotation y');
    this.gui.add(this.camera.rotation, 'z', 0, Math.PI * 2, 0.01).name('camera rotation z');

    this.gui.add(this.camera.position, 'x', -25, 25, 0.01).name('camera position x');
    this.gui.add(this.camera.position, 'y', -25, 25, 0.01).name('camera position y');
    this.gui.add(this.camera.position, 'z', -25, 25, 0.01).name('camera position z');

    return this.gui;
  }
}