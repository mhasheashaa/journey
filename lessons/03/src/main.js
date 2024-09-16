import * as THREE from "three";

const config = {
  size: {
    width: 800,
    height: 600,
  },
};

const canvas = document.querySelector("canvas.gl");

const scene = new THREE.Scene();

// mesh = geometry + material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  config.size.width / config.size.height,
);
camera.position.set(0, 0, 3);
scene.add(camera);

// renderer = scene + camera
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(config.size.width, config.size.height);

const keys = {};

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

setInterval(() => {
  if (keys.ArrowUp) {
    camera.position.z -= 0.01;
  } else if (keys.ArrowDown) {
    camera.position.z += 0.01;
  }

  if (keys.ArrowRight) {
    camera.position.x -= 0.01;
  } else if (keys.ArrowLeft) {
    camera.position.x += 0.01;
  }

  renderer.render(scene, camera);
}, 1000 / 60);
