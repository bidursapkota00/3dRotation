import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  300
);

const rotationSpeed = 0.01;
const animation = ["translate", "showProjection", "rotateX"];
let currentAnimationStep = 0;
const maxAnimationStep = animation.length;

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 90;
camera.lookAt(5, 5, 5);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const xAxisMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
  linewidth: 10,
});
const yAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00,
  linewidth: 10,
});
const zAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 10,
});
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 1,
});
const axisLetterMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
});
const lineCopy1Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
const projectionLineMaterial = new THREE.LineDashedMaterial({
  color: 0x000000,
  dashSize: 2,
  gapSize: 1,
  transparent: true,
  opacity: 0,
});

const origin = new THREE.Vector3(0, 0, 0);
const xAxisPoints = [origin, new THREE.Vector3(20, 0, 0), new THREE.Vector3(20, 1, 0), new THREE.Vector3(21, 0, 0), new THREE.Vector3(20, -1, 0), new THREE.Vector3(20, 0, 0)];
const yAxisPoints = [origin, new THREE.Vector3(0, 20, 0), new THREE.Vector3(-1, 20, 0), new THREE.Vector3(0, 21, 0), new THREE.Vector3(1, 20, 0), new THREE.Vector3(0, 20, 0)];
const zAxisPoints = [origin, new THREE.Vector3(0, 0, 20), new THREE.Vector3(1, 0, 20), new THREE.Vector3(0, 0, 21), new THREE.Vector3(-1, 0, 20), new THREE.Vector3(0, 0, 20)];
let linePoints = [new THREE.Vector3(4, 4, 0), new THREE.Vector3(9, 16, 5)];
let lineCopy1Points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 12, 5)];
let xPoints = [new THREE.Vector3(22, 1, 0), new THREE.Vector3(23, 0, 0), new THREE.Vector3(22, -1, 0), new THREE.Vector3(24, 1, 0), new THREE.Vector3(23, 0, 0), new THREE.Vector3(24, -1, 0)];
let yPoints = [new THREE.Vector3(-1, 24, 0), new THREE.Vector3(0, 23, 0), new THREE.Vector3(1, 24, 0), new THREE.Vector3(-1, 22, 0)];
let zPoints = [new THREE.Vector3(-1, 1, 22), new THREE.Vector3(0, 1, 22),new THREE.Vector3(-1, 0, 22),new THREE.Vector3(0, 0, 22),];
let projectionLinePoints = [
  new THREE.Vector3(5, 12, 5),
  new THREE.Vector3(0, 12, 5),
  new THREE.Vector3(0, 0, 0),
];

const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yAxisPoints);
const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zAxisPoints);
const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
const lineCopy1Geometry = new THREE.BufferGeometry().setFromPoints(lineCopy1Points);
const xGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
const yGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
const zGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
const projectionLineGeometry = new THREE.BufferGeometry().setFromPoints(
  projectionLinePoints
);

const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);
const line = new THREE.Line(lineGeometry, lineMaterial);
const lineCopy1 = new THREE.Line(lineCopy1Geometry, lineCopy1Material);
const x = new THREE.Line(xGeometry, axisLetterMaterial);
const y = new THREE.Line(yGeometry, axisLetterMaterial);
const z = new THREE.Line(zGeometry, axisLetterMaterial);
const projectionLine = new THREE.Line(
  projectionLineGeometry,
  projectionLineMaterial
);

projectionLine.computeLineDistances();

let lineGroup = new THREE.Group();
scene.add(lineGroup);
lineGroup.add(xAxis, yAxis, zAxis, x, y, z, line, lineCopy1, projectionLine);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const animateForward = (currentAnimationStep) => {
  switch (animation[currentAnimationStep]) {
    case "translate":
      gsap.to(line.position, { duration: 1, x: -4, y: -4, z: 0 });
      break;
    case "showProjection":
      gsap.to(projectionLine.material, { duration: 1, opacity: 1 });
      break;
    case "rotateX":
      var tl = gsap.timeline();
      tl.set(line.material, { opacity: 0 });
      tl.set(lineCopy1.material, { opacity: 1 });
      tl.to(lineCopy1.rotation, { duration: 1, x: 1.176 }, ">");
      tl.to(projectionLine.rotation, { duration: 1, x: 1.176 }, "<");
      break;
  }
};

const animateBackward = (currentAnimationStep) => {
  switch (animation[currentAnimationStep - 1]) {
    case "translate":
      gsap.to(line.position, { duration: 1, x: 0, y: 0, z: 0 });
      break;
    case "showProjection":
      gsap.to(projectionLine.material, { duration: 1, opacity: 0 });
      break;
    case "rotateX":
      var tl = gsap.timeline();
      tl.to(lineCopy1.rotation, { duration: 1, x: 0 }, ">");
      tl.to(projectionLine.rotation, { duration: 1, x: 0 }, "<");
      tl.set(line.material, { opacity: 1 }, ">");
      tl.set(lineCopy1.material, { opacity: 0 }, "<");
      break;
  }
};

const onKeyDown = (event) => {
  const key = event.key.toLowerCase();

  switch (key) {
    case "arrowup":
      lineGroup.rotation.x += rotationSpeed;
      break;
    case "arrowdown":
      lineGroup.rotation.x -= rotationSpeed;
      break;
    case "arrowleft":
      lineGroup.rotation.y -= rotationSpeed;
      break;
    case "arrowright":
      lineGroup.rotation.y += rotationSpeed;
      break;
    case "f":
      if (currentAnimationStep >= maxAnimationStep) return;
      animateForward(currentAnimationStep);
      currentAnimationStep += 1;
      break;
    case "b":
      if (currentAnimationStep <= 0) return;
      animateBackward(currentAnimationStep);
      currentAnimationStep -= 1;
      break;
  }
};

window.addEventListener("keydown", onKeyDown);

animate();
