import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';






/**/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5,5,5);

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);

const lighthelper = new THREE.PointLightHelper(pointlight)
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridhelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addstar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)

}

Array(200).fill().forEach(addstar)

const texture = new THREE.TextureLoader().load('colorful.png');
scene.background = texture;

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.05;

  controls.update();
  renderer.render(scene, camera);
}

animate()




/*

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += -0.01;
  renderer.render( scene, camera );
};

animate();
*/