import './style.css';

import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(40)
scene.add(camera);

//Render
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry( 15, 2.4, 100, 1000 )
const material = new THREE.MeshStandardMaterial ({
    color: 0x4A9AFF,
})
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

//Light
const pointLight = new THREE.PointLight( 0xFFFFFF )
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight( 0xffffff )
scene.add( pointLight, ambientLight );

const LightHelper = new THREE.PointLightHelper(pointLight);
const GridHelper = new THREE.GridHelper( 2000, 500 )
// scene.add( LightHelper, GridHelper);

//Orbit Control
const controls = new OrbitControls(camera, renderer.domElement);


//Space Texture
const spaceTexture = new THREE.TextureLoader().load('./bg.jpeg')
scene.background = spaceTexture;


//Moon
const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
)

scene.add( moon )

//Scroll
document.body.onscroll = moveCamera

moveCamera();


animate();
Array(500).fill().forEach( addStars )


function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.03;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

function addStars(){
    const geometry = new THREE.SphereGeometry( 0.2 , 24, 24 )
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,

    })
    const star = new THREE.Mesh( geometry, material );
    const[x, y, z] = Array(78).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));


    star.position.set( x, y, z );
    scene.add( star );
}

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.005
    moon.rotation.y += 0.0075
    moon.rotation.z += 0.005

    camera.position.z = 1;
    camera.position.x = t * 0.02;
    camera.position.y = t * 0.002;
}