import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import starsTexture from "./assets/img/stars.jpg";
import sunTexture from "./assets/img/sun.jpg";
import mercuryTexture from "./assets/img/mercury.jpg";
import venusTexture from "./assets/img/venus.jpg";
import earthTexture from "./assets/img/earth.jpg";
import marsTexture from "./assets/img/mars.jpg";
import jupiterTexture from "./assets/img/jupiter.jpg";
import saturnTexture from "./assets/img/saturn.jpg";
import saturnRingTexture from "./assets/img/saturn ring.png";
import uranusTexture from "./assets/img/uranus.jpg";
import uranusRingTexture from "./assets/img/uranus ring.png";
import neptuneTexture from "./assets/img/neptune.jpg";

//setting up orbit control

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//creating a scene to add all elements

const scene = new THREE.Scene();

//creating a camera instance
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//setting up texture loader

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

//setting up orbit control

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

//seting up light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//loading planets
const textureload = new THREE.TextureLoader();
//sun
const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureload.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//adding point light
const pointLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(pointLight);

//loading another planets now
//using function

function createPlanet(size, texture, position, ring) {
  const geometry = new THREE.SphereGeometry(size, 25, 20);
  const material = new THREE.MeshStandardMaterial({
    map: textureload.load(texture),
  });
  const planet = new THREE.Mesh(geometry, material);
  const planetObj = new THREE.Object3D();
  planetObj.add(planet);
  scene.add(planetObj);
  planet.position.x = position;

  if (ring) {
    const RingGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      30
    );
    const RingMat = new THREE.MeshStandardMaterial({
      map: textureload.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const Ring = new THREE.Mesh(RingGeo, RingMat);
    planetObj.add(Ring);

    Ring.position.x = position;
    Ring.rotation.x = -0.5 * Math.PI;
  }
  return { planet, planetObj };
}

const mercury = new createPlanet(4, mercuryTexture, 20);
const venus = new createPlanet(5, venusTexture, 40);
const earth = new createPlanet(5.56, earthTexture, 60);
const mars = new createPlanet(5, marsTexture, 80);
const jupiter = new createPlanet(6, jupiterTexture, 100);
const saturn = new createPlanet(8, saturnTexture, 150, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});
const uranus = new createPlanet(8.2, uranusTexture, 200, {
  innerRadius: 10,
  outerRadius: 20,
  texture: uranusRingTexture,
});
const neptune = new createPlanet(5, neptuneTexture, 240);

var speed = 1;
function animate() {
  sun.rotateY(0.002);
  mercury.planet.rotateY(0.001);
  mercury.planetObj.rotateY(0.001 * speed);
  venus.planet.rotateY(0.0012);
  venus.planetObj.rotateY(0.0015 * speed);
  earth.planet.rotateY(0.012);
  earth.planetObj.rotateY(0.0012 * speed);
  mars.planet.rotateY(0.013);
  mars.planetObj.rotateY(0.0019 * speed);
  jupiter.planet.rotateY(0.04);
  jupiter.planetObj.rotateY(0.0023 * speed);
  saturn.planet.rotateY(0.01);
  saturn.planetObj.rotateY(0.0021 * speed);
  uranus.planet.rotateY(0.01);
  uranus.planetObj.rotateY(0.0015 * speed);
  neptune.planet.rotateY(0.01);
  neptune.planetObj.rotateY(0.001 * speed);

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

//setting window size

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener("keydown", handleKeyPressed);

function handleKeyPressed(event) {
  const accepedActions = {
    ArrowUp() {
      camera.position.y++;
    },
    ArrowDown() {
      camera.position.y--;
    },
    ArrowRight() {
      camera.position.x++;
    },
    ArrowLeft() {
      camera.position.x--;
    },
    Shift() {
      camera.position.z++;
    },
    z() {
      camera.position.z--;
    },
    a() {
      speed++;
    },
    s() {
      speed--;
    },
  };

  const executeAction = accepedActions[event.key];
  executeAction();
}
