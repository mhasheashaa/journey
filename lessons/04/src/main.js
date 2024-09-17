import * as THREE from "three";

const config = {
  size: {
    width: 800,
    height: 600,
  },
  frequency: 1000 / 60, // 60 fps,
};

const canvas = document.querySelector("canvas.gl");

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const group = new THREE.Group();
scene.add(group);

const fan = new THREE.Group();
scene.add(fan);

const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
const hand1 = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 1), material);
const hand2 = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 1), material);
hand2.rotation.z = Math.PI / 2;
fan.add(hand1, hand2);

const camera = new THREE.PerspectiveCamera(
  75,
  config.size.width / config.size.height,
);
camera.position.z = 10;
scene.add(camera);

setInterval(() => {
  fan.rotation.z += 0.05;
}, 1000 / 60);

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(config.size.width, config.size.height);
renderer.render(scene, camera);

const random = {
  float: (a, b) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.random() * (max - min) + min;
  },
  integer: (a, b) => {
    const min = Math.ceil(Math.min(a, b));
    const max = Math.floor(Math.max(a, b));
    return Math.floor(Math.random() * (max - min) + min);
  },
  element: (arr) => {
    const index = random.integer(0, arr.length);
    return arr[index];
  },
};

const color = () => {
  const choices = [0xff0000, 0x00ff00, 0x0000ff];
  return random.element(choices);
};

const position = () => {
  const x = random.integer(-5, 6);
  const y = random.integer(-5, 6);
  const z = random.integer(-5, 2);
  return [x, y, z];
};

const materials = [];

const processKeys = () => {
  if (map.n) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: color(),
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position());
    group.add(mesh);
  }

  const dx = map.arrowright ? 1 : map.arrowleft ? -1 : 0;
  // const dy = map.arrowright ? 1 : map.arrowleft ? -1 : 0;
  const dz = map.arrowup ? -1 : map.arrowdown ? 1 : 0;

  group.position.x += dx;
  group.position.z += dz;

  if (map["+"]) {
    group.scale.x += 0.01;
  } else if (map["-"]) {
    group.scale.x -= 0.01;
  }

  if (map.x) {
    group.rotation.x += 0.01;
  }

  if (map.y) {
    group.rotation.y += 0.01;
  }

  if (map.z) {
    group.rotation.z += 0.01;
  }
};

const map = {};

const createKeyboardEventHandler = (setTo) => (event) => {
  map[event.key.toLowerCase()] = setTo;
  processKeys();
};

document.addEventListener("keydown", createKeyboardEventHandler(true));

document.addEventListener("keyup", createKeyboardEventHandler(false));

let wireframe = false;
document.addEventListener("keypress", (event) => {
  switch (event.key.toLowerCase()) {
    case "q":
      {
        wireframe = !wireframe;
        for (const material of materials) {
          material.wireframe = wireframe;
        }
        if (wireframe) {
          scene.add(axesHelper);
        } else {
          scene.remove(axesHelper);
        }
      }
      break;
  }
});

setInterval(() => {
  renderer.render(scene, camera);
}, config.frequency);
