import { ThreeGlobe } from './node_modules/three-globe/dist/three-globe'
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls'

Object.assign(THREE, { TrackballControls });

// Gen random  data 
 const N = 30;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ['red', 'yellow', 'white', 'blue'][Math.round(Math.random() * 3)]
}));

const Globe = new ThreeGlobe()
    .globeImageUrl('img/earth-night.jpg')
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(3)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1000)

// Set up renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('my_globe').appendChild(renderer.domElement);

// Setup scene 

const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

//  Setup camera 

const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 500;

// Add camera controls 

const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 101;
tbControls.rotateSpeed = 5;
tbControls.zoomSpeep = 0.8;

// Kick-off renderer

(function animate() {
  // Frame cycle
  tbControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();