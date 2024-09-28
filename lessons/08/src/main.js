import "./main.css";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";

const canvas = document.querySelector("canvas.main");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = size.width / size.height;
let pixelRatio = window.devicePixelRatio;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  aspectRatio = size.width / size.height;
  pixelRatio = window.devicePixelRatio;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(pixelRatio);
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  }
});

const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const positionsArray = new Float32Array([0, 0.5, 0, 0.5, 0, 0, -0.5, 0, 0]);
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(pixelRatio);
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
