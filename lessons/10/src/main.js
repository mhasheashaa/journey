import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import "./main.css";

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

// const image = new Image();
// image.src = "/door/color.jpg";
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => {
//   texture.needsUpdate = true;
// };

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("onStart");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onProgress = () => {
  console.log("onProgress");
};
loadingManager.onError = (error) => {
  console.log("onError", error);
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const alphaTexture = textureLoader.load("/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/door/ambientOcclusion.jpg",
);
const colorTexture = textureLoader.load("/door/color.jpg");
const heightTexture = textureLoader.load("/door/height.png");
const metalnessTexture = textureLoader.load("/door/metalness.jpg");
const normalTexture = textureLoader.load("/door/normal.jpg");
const roughnessTexture = textureLoader.load("/door/roughness.jpg");

// const texture = textureLoader.load("/minecraft.png");

colorTexture.colorSpace = THREE.SRGBColorSpace;

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.repeat.x = 1;
// colorTexture.repeat.y = 1;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

const canvas = document.querySelector("canvas.main");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({map: colorTexture});
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
