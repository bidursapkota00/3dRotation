import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const origin = new THREE.Vector3(0, 0, 0);
let yzPlaneOpacity = false;

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  300
);

const rotationSpeed = 0.01;
const animation = [
  "translate",
  "showProjection",
  "showProjection2",
  "hideProjection2",
  "rotateX",
  "rotateY",
  "rotateZ",
  "rotateNY",
  "rotateNX",
  "translateN",
];
let currentAnimationStep = 0;
const maxAnimationStep = animation.length;

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 70;
camera.lookAt(5, 5, 5);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const xAxisMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
  linewidth: 2,
});
const xAxisPoints = [
  origin,
  new THREE.Vector3(20, 0, 0),
  new THREE.Vector3(20, 1, 0),
  new THREE.Vector3(21, 0, 0),
  new THREE.Vector3(20, -1, 0),
  new THREE.Vector3(20, 0, 0),
];
const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);

const yAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00,
  linewidth: 2,
});
const yAxisPoints = [
  origin,
  new THREE.Vector3(0, 20, 0),
  new THREE.Vector3(-1, 20, 0),
  new THREE.Vector3(0, 21, 0),
  new THREE.Vector3(1, 20, 0),
  new THREE.Vector3(0, 20, 0),
];
const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yAxisPoints);
const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);

const zAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 2,
});
const zAxisPoints = [
  origin,
  new THREE.Vector3(0, 0, 20),
  new THREE.Vector3(1, 0, 20),
  new THREE.Vector3(0, 0, 21),
  new THREE.Vector3(-1, 0, 20),
  new THREE.Vector3(0, 0, 20),
];
const zAxisGeometry = new THREE.BufferGeometry().setFromPoints(zAxisPoints);
const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);

///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 1,
});
let linePoints = [new THREE.Vector3(4, 4, 0), new THREE.Vector3(9, 16, 5)];
const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
const line = new THREE.Line(lineGeometry, lineMaterial);

const lineCopy1Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
let lineCopy1Points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 12, 5)];
const lineCopy1Geometry = new THREE.BufferGeometry().setFromPoints(
  lineCopy1Points
);
const lineCopy1 = new THREE.Line(lineCopy1Geometry, lineCopy1Material);

const lineCopy2Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
let lineCopy2Points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 13)];
const lineCopy2Geometry = new THREE.BufferGeometry().setFromPoints(
  lineCopy2Points
);
const lineCopy2 = new THREE.Line(lineCopy2Geometry, lineCopy2Material);

const lineCopy3Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
let lineCopy3Points = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 13.93),
];
const lineCopy3Geometry = new THREE.BufferGeometry().setFromPoints(
  lineCopy3Points
);
const lineCopy3 = new THREE.Line(lineCopy3Geometry, lineCopy3Material);

const lineCopy5Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
let lineCopy5Points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 13)];
const lineCopy5Geometry = new THREE.BufferGeometry().setFromPoints(
  lineCopy5Points
);
const lineCopy5 = new THREE.Line(lineCopy5Geometry, lineCopy5Material);

const lineCopy6Material = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
  transparent: true,
  opacity: 0,
});
let lineCopy6Points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 12, 5)];
const lineCopy6Geometry = new THREE.BufferGeometry().setFromPoints(
  lineCopy6Points
);
const lineCopy6 = new THREE.Line(lineCopy6Geometry, lineCopy6Material);

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const pointMaterial = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 1,
});
const pointGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(5, 8, 10),
]);
const point = new THREE.Points(pointGeometry, pointMaterial);

const pointCopy1Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy1Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(1, 4, 10),
]);
const pointCopy1 = new THREE.Points(pointCopy1Geometry, pointCopy1Material);

const pointCopy2Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy2Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(1, -7.692, 7.54),
]);
const pointCopy2 = new THREE.Points(pointCopy2Geometry, pointCopy2Material);

const pointCopy3Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy3Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-1.9, -7.692, 7.364),
]);
const pointCopy3 = new THREE.Points(pointCopy3Geometry, pointCopy3Material);

const pointCopy4Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy4Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(1.9, 7.692, 7.364),
]);
const pointCopy4 = new THREE.Points(pointCopy4Geometry, pointCopy4Material);

const pointCopy5Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy5Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(4.524, 7.692, 6.113),
]);
const pointCopy5 = new THREE.Points(pointCopy5Geometry, pointCopy5Material);

const pointCopy6Material = new THREE.PointsMaterial({
  color: 0x000000,
  size: 0.9,
  transparent: true,
  opacity: 0,
});
const pointCopy6Geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(4.524, 8.6, -4.75),
]);
const pointCopy6 = new THREE.Points(pointCopy6Geometry, pointCopy6Material);

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const axisLetterMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2,
});
let xPoints = [
  new THREE.Vector3(22, 1, 0),
  new THREE.Vector3(23, 0, 0),
  new THREE.Vector3(22, -1, 0),
  new THREE.Vector3(24, 1, 0),
  new THREE.Vector3(23, 0, 0),
  new THREE.Vector3(24, -1, 0),
];
const xGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
const x = new THREE.Line(xGeometry, axisLetterMaterial);

let yPoints = [
  new THREE.Vector3(-1, 24, 0),
  new THREE.Vector3(0, 23, 0),
  new THREE.Vector3(1, 24, 0),
  new THREE.Vector3(-1, 22, 0),
];
const yGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
const y = new THREE.Line(yGeometry, axisLetterMaterial);

let zPoints = [
  new THREE.Vector3(-1, 1, 22),
  new THREE.Vector3(0, 1, 22),
  new THREE.Vector3(-1, 0, 22),
  new THREE.Vector3(0, 0, 22),
];
const zGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
const z = new THREE.Line(zGeometry, axisLetterMaterial);

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const projectionLineMaterial = new THREE.LineDashedMaterial({
  color: 0x000000,
  dashSize: 1,
  gapSize: 1,
  transparent: true,
  opacity: 0,
});
let projectionLinePoints = [
  new THREE.Vector3(5, 12, 5),
  new THREE.Vector3(0, 12, 5),
  new THREE.Vector3(0, 0, 0),
];
const projectionLineGeometry = new THREE.BufferGeometry().setFromPoints(
  projectionLinePoints
);
const projectionLine = new THREE.Line(
  projectionLineGeometry,
  projectionLineMaterial
);
projectionLine.computeLineDistances();

const projectionLine2Material = new THREE.LineDashedMaterial({
  color: 0x000000,
  dashSize: 1,
  gapSize: 1,
  transparent: true,
  opacity: 0,
});
let projectionLine2Points = [
  new THREE.Vector3(0, 12, 5),
  new THREE.Vector3(0, 0, 5),
];
const projectionLine2Geometry = new THREE.BufferGeometry().setFromPoints(
  projectionLine2Points
);
const projectionLine2 = new THREE.Line(
  projectionLine2Geometry,
  projectionLine2Material
);
projectionLine2.computeLineDistances();

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
const yzPlaneMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: false,
  transparent: true,
  opacity: 0,
});
const yzPlaneGeometry = new THREE.BoxGeometry(0, 20, 20);
const yzPlane = new THREE.Mesh(yzPlaneGeometry, yzPlaneMaterial);
yzPlane.translateY(10);
yzPlane.translateZ(10);

let lineGroup = new THREE.Group();
scene.add(lineGroup);
lineGroup.add(
  xAxis,
  yAxis,
  zAxis,
  x,
  y,
  z,
  line,
  lineCopy1,
  lineCopy2,
  lineCopy3,
  lineCopy5,
  lineCopy6,
  projectionLine,
  projectionLine2,
  yzPlane,
  point,
  pointCopy1,
  pointCopy2,
  pointCopy3,
  pointCopy4,
  pointCopy5,
  pointCopy6
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const animateForward = (currentAnimationStep) => {
  switch (animation[currentAnimationStep]) {
    case "translate":
      gsap.to(line.position, { duration: 1, x: -4, y: -4, z: 0 });
      gsap.to(point.position, { duration: 1, x: -4, y: -4, z: 0 });
      break;
    case "showProjection":
      gsap.to(projectionLine.material, { duration: 1, opacity: 1 });
      break;
    case "showProjection2":
      gsap.to(projectionLine2.material, { duration: 1, opacity: 1 });
      break;
    case "hideProjection2":
      gsap.to(projectionLine2.material, { duration: 1, opacity: 0 });
      break;
    case "rotateX":
      var tl = gsap.timeline();
      tl.set(line.material, { opacity: 0 });
      tl.set(lineCopy1.material, { opacity: 1 });
      tl.set(point.material, { opacity: 0 });
      tl.set(pointCopy1.material, { opacity: 1 });
      tl.to(lineCopy1.rotation, { duration: 1, x: 1.176 }, ">");
      tl.to(pointCopy1.rotation, { duration: 1, x: 1.176 }, "<");
      tl.to(projectionLine.rotation, { duration: 1, x: 1.176 }, "<");
      break;
    case "rotateY":
      var tl = gsap.timeline();
      tl.set(lineCopy1.material, { opacity: 0 });
      tl.set(pointCopy1.material, { opacity: 0 }, "<");
      tl.set(lineCopy2.material, { opacity: 1 }, ">");
      tl.set(pointCopy2.material, { opacity: 1 }, "<");
      tl.to(lineCopy2.rotation, { duration: 1, y: -(5 / 13) }, ">");
      tl.to(pointCopy2.rotation, { duration: 1, y: -(5 / 13) }, "<");
      tl.to(projectionLine.material, { duration: 1, opacity: 0 }, "<");
      tl.set(lineCopy2.material, { opacity: 0 }, ">");
      tl.set(pointCopy2.material, { opacity: 0 }, "<");
      tl.set(lineCopy3.material, { opacity: 1 }, ">");
      tl.set(pointCopy3.material, { opacity: 1 }, "<");
      break;
    case "rotateZ":
      var tl = gsap.timeline();
      tl.to(pointCopy3.rotation, { duration: 1, z: Math.PI });
      tl.set(pointCopy3.material, { opacity: 0 }, ">");
      tl.set(pointCopy4.material, { opacity: 1 }, "<");
      break;
    case "rotateNY":
      var tl = gsap.timeline();
      tl.to(lineCopy3.rotation, { duration: 1, y: 5 / 13 });
      tl.to(pointCopy4.rotation, { duration: 1, y: 5 / 13 }, "<");
      tl.set(lineCopy3.material, { opacity: 0 }, ">");
      tl.set(pointCopy4.material, { opacity: 0 }, "<");
      tl.set(lineCopy5.material, { opacity: 1 }, ">");
      tl.set(pointCopy5.material, { opacity: 1 }, "<");
      break;
    case "rotateNX":
      var tl = gsap.timeline();
      tl.to(lineCopy5.rotation, { duration: 1, x: -1.176 });
      tl.to(pointCopy5.rotation, { duration: 1, x: -1.176 }, "<");
      tl.set(lineCopy5.material, { opacity: 0 }, ">");
      tl.set(pointCopy5.material, { opacity: 0 }, "<");
      tl.set(lineCopy6.material, { opacity: 1 }, ">");
      tl.set(pointCopy6.material, { opacity: 1 }, "<");
      break;
    case "translateN":
      var tl = gsap.timeline();
      tl.to(lineCopy6.position, { duration: 1, x: 4, y: 4, z: 0 });
      tl.to(pointCopy6.position, { duration: 1, x: 4, y: 4, z: 0 }, "<");
      break;
  }
};

const animateBackward = (currentAnimationStep) => {
  switch (animation[currentAnimationStep - 1]) {
    case "translate":
      gsap.to(line.position, { duration: 1, x: 0, y: 0, z: 0 });
      gsap.to(point.position, { duration: 1, x: 0, y: 0, z: 0 });
      break;
    case "showProjection":
      gsap.to(projectionLine.material, { duration: 1, opacity: 0 });
      break;
    case "showProjection2":
      gsap.to(projectionLine2.material, { duration: 1, opacity: 0 });
      break;
    case "hideProjection2":
      gsap.to(projectionLine2.material, { duration: 1, opacity: 1 });
      break;
    case "rotateX":
      var tl = gsap.timeline();
      tl.to(lineCopy1.rotation, { duration: 1, x: 0 }, ">");
      tl.to(pointCopy1.rotation, { duration: 1, x: 0 }, "<");
      tl.to(projectionLine.rotation, { duration: 1, x: 0 }, "<");
      tl.set(line.material, { opacity: 1 });
      tl.set(point.material, { opacity: 1 });
      tl.set(lineCopy1.material, { opacity: 0 });
      tl.set(pointCopy1.material, { opacity: 0 });
      break;
    case "rotateY":
      var tl = gsap.timeline();
      tl.set(lineCopy3.material, { opacity: 0 });
      tl.set(pointCopy3.material, { opacity: 0 }, "<");
      tl.set(lineCopy2.material, { opacity: 1 }, ">");
      tl.set(pointCopy2.material, { opacity: 1 }, "<");
      tl.to(lineCopy2.rotation, { duration: 1, y: 0 });
      tl.to(pointCopy2.rotation, { duration: 1, y: 0 }, "<");
      tl.to(projectionLine.material, { duration: 1, opacity: 1 }, "<");
      tl.set(lineCopy1.material, { opacity: 1 });
      tl.set(pointCopy1.material, { opacity: 1 });
      tl.set(lineCopy2.material, { opacity: 0 });
      tl.set(pointCopy2.material, { opacity: 0 });
      break;
    case "rotateZ":
      var tl = gsap.timeline();
      tl.set(pointCopy4.material, { opacity: 0 });
      tl.set(pointCopy3.material, { opacity: 1 });
      tl.to(pointCopy3.rotation, { duration: 1, z: 0 }, ">");
      break;
    case "rotateNY":
      var tl = gsap.timeline();
      tl.set(lineCopy3.material, { opacity: 1 });
      tl.set(pointCopy4.material, { opacity: 1 }, "<");
      tl.set(lineCopy5.material, { opacity: 0 }, ">");
      tl.set(pointCopy5.material, { opacity: 0 }, "<");
      tl.to(lineCopy3.rotation, { duration: 1, y: 0 }, ">");
      tl.to(pointCopy4.rotation, { duration: 1, y: 0 }, "<");
      break;
    case "rotateNX":
      var tl = gsap.timeline();
      tl.set(lineCopy5.material, { opacity: 1 });
      tl.set(pointCopy5.material, { opacity: 1 }, "<");
      tl.set(lineCopy6.material, { opacity: 0 }, ">");
      tl.set(pointCopy6.material, { opacity: 0 }, "<");
      tl.to(lineCopy5.rotation, { duration: 1, x: 0 }, ">");
      tl.to(pointCopy5.rotation, { duration: 1, x: 0 }, "<");
      break;
    case "translateN":
      var tl = gsap.timeline();
      tl.to(lineCopy6.position, { duration: 1, x: 0, y: 0, z: 0 });
      tl.to(pointCopy6.position, { duration: 1, x: 0, y: 0, z: 0 }, "<");
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
    case "y":
      gsap.to(yzPlane.material, {
        duration: 1,
        opacity: yzPlaneOpacity ? 0 : 0.1,
      });
      yzPlaneOpacity = !yzPlaneOpacity;
      break;
  }
};

window.addEventListener("keydown", onKeyDown);

animate();
