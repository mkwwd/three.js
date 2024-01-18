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
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearColor(0x00c9ff);
  // renderer.setClearAlpha(0.9);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00c9ff);
  // 안개
  scene.fog = new THREE.Fog(0x00c9ff, 4, 9);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    // 시야각(field of view), 종횡비(aspect). near, far
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 7;
  scene.add(camera);

  // light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 5;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "gray",
  });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.y = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    meshes.forEach((item) => {
      item.position.x += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    window.requestAnimationFrame(draw);
  }
  renderer.render(scene, camera);

  function setSize() {
    // 화면크기에 따라 변화됨
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  draw();
}
