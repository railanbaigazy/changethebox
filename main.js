import * as THREE from 'three';
import "./style.css";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons";
import SplitType from "split-type";

const scene = new THREE.Scene();

const startColor = "#613774";

const geometry = new THREE.BoxGeometry( 3, 3, 3 );
const material = new THREE.MeshStandardMaterial({
    color: startColor,
    roughness: .3
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const light1 = new THREE.PointLight(0xffffff, 70, 50, 1.5);
const light2 = new THREE.PointLight(0xffffff, 20, 70, 1.5);
light1.position.set(10, 0, 10);
light2.position.set(-10, -10, -20);
scene.add(light1);
scene.add(light2);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 5, 100);
camera.position.z = 15;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height)
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();

const colorInput = document.querySelector('.input-color');
colorInput.value = startColor;

const navText = new SplitType('.nav-text');

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo('.title', { opacity: 0 }, { opacity: 1 });
t1.fromTo(mesh.scale, { z: 0, x: 0, y:0 }, { z: 1, x: 1, y: 1 });
t1.fromTo('.char', { y: -20 }, { y: 0, stagger: 0.05, delay: 0.2 });
t1.fromTo('.controls', { opacity: 0 }, { opacity: 1 });

const inputs = document.querySelectorAll('input');

function handleUpdate() {
    const suffix = this.dataset.suffix || '';
    document.documentElement.style.setProperty(`--${this.id}`, this.value + suffix);
    const newColor = new THREE.Color(this.value);
    gsap.to(mesh.material.color, newColor);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
//inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
