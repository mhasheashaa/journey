import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";

const canvas = document.querySelector("canvas.gl");

const size = {
  width: 800,
  height: 600,
};

const cursor = {
  x: 0,
  y: 0,
};

const v = new THREE.Vector3();

canvas.addEventListener("mousemove", (event) => {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  cursor.x = x / size.width - 0.5;
  cursor.y = -(y / size.height - 0.5);
});

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({color: 0xff0000}),
);
scene.add(mesh);

const aspectRatio = size.width / size.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);

const clock = new THREE.Clock();
const tick = () => {
  requestAnimationFrame(tick);

  // camera.position.x = cursor.x * 3;
  // camera.position.y = cursor.y * 3;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  controls.update();

  renderer.render(scene, camera);
};

tick();
