import "./main.css";
import gsap from "gsap";
import GUI from "lil-gui";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";

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

// window.addEventListener("dblclick", () => {
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement;

//   if (fullscreenElement) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   } else {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen();
//     }
//   }
// });

window.addEventListener("keypress", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

const tweaks = {
  color: "#eeff00",
  subdivision: 2,
  spin: () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2});
  },
};
const gui = new GUI({
  width: 300,
  title: "Debug",
  // closeFolders: true,
});

const canvas = document.querySelector("canvas.main");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  tweaks.subdivision,
  tweaks.subdivision,
  tweaks.subdivision,
);
const material = new THREE.MeshBasicMaterial({
  color: tweaks.color,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
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

const folder = gui.addFolder("box");
folder.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
folder.add(mesh, "visible");
folder.add(material, "wireframe");
folder.addColor(tweaks, "color").onChange(() => {
  material.color.set(tweaks.color);
});
folder.add(tweaks, "spin");
folder
  .add(tweaks, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      tweaks.subdivision,
      tweaks.subdivision,
      tweaks.subdivision,
    );
  });
