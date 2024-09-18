import gsap from "gsap";
import * as THREE from "three";
import {Timer} from "three/addons/misc/Timer";
import {timer} from "./timer";

const config = {
  size: {
    width: 800,
    height: 600,
  },
};

const canvas = document.querySelector("canvas.gl");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  config.size.width / config.size.height,
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(config.size.width, config.size.height);

// Date.now()
// let time = Date.now();
// const tick = () => {
//   const currentTime = Date.now();
//   const delta = currentTime - time;
//   time = currentTime;

//   mesh.rotation.y += 0.005 * delta;

//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// };

// tick();

// Clock
// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   mesh.position.x = Math.sin(elapsedTime);
//   mesh.position.y = Math.cos(elapsedTime);

//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// };

// tick();

// Timer
// const timer = new Timer();
// const tick = (time) => {
//   requestAnimationFrame(tick);

//   timer.update(time);

//   const delta = timer.getDelta();

//   mesh.rotation.y += 2 * delta;

//   renderer.render(scene, camera);
// };

// tick();

// gsap
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
// gsap.to(mesh.position, {duration: 1, delay: 2, y: 2, x: 0});
// const tick = () => {
//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// };

// tick();

// custom
const getElapsedTime = timer();

const tick = () => {
  const elapsedTime = getElapsedTime();

  mesh.position.x = Math.sin(elapsedTime);
  mesh.position.y = Math.cos(elapsedTime);

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
