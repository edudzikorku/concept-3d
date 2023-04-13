// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a globe
const geometry = new THREE.SphereGeometry(1, 32, 32);
const textureLoader = new THREE.TextureLoader();
const textureMap = textureLoader.load('textures/size.jpg.webp'); // Replace with your own texture map path
const material = new THREE.MeshBasicMaterial({ map: textureMap });
const globe = new THREE.Mesh(geometry, material);

// Add the globe to the scene
scene.add(globe);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the globe
  globe.rotation.y += 0.005;

  // Render the scene with the camera
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
