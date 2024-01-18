import * as THREE from "three";

// 기본 장면

export default function example() {
  // Renderer
  // console.log(THREE);

  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // html에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector("#three-canvas");
  // const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    // 시야각(field of view), 종횡비(aspect). near, far
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 2;
  camera.position.z = 7;

  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);
}
