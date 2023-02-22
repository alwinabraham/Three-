import * as THREE from 'three';
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import "./style.css"
//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(2,64,64);
// const geometry = new THREE.BoxGeometry( 3, 3, 3 );
const material = new THREE.MeshStandardMaterial({
  color:"#cc0cbf",
  roughness: 0.6,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes
const sizes ={
  width: window.innerWidth,
  height:window.innerHeight
}

//Light
const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
light.intensity = 1.25
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)


const spacetexture = new THREE.TextureLoader().load('photo-1617309215127-ebeb4eddeba5.jpeg');
scene.background = spacetexture


//Renderer    
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGL1Renderer({canvas})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize',()=>{
  //Upadte sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight
  //Update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

const loop = () => {
  // mesh.rotation.x += 0.
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magic
const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale,{z:0, x:0, y:0}, {z:1, x:1, y:1})
t1.fromTo('nav',{y:"-100%"},{y:"0%"})
t1.fromTo(".title",{opacity:0},{opacity:1})

//Mouse Animation Color
let mouseDown = false
let rgb = []
window.addEventListener("mousedown",()=>(mouseDown=true))
window.addEventListener("mouseup",()=>(mouseDown=false))

window.addEventListener("mousedown",(e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageX/sizes.height)*255),
      150,
    ]
    //Lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{
      r:newColor.r,
      g:newColor.g,
      b:newColor.b}
      )}
})


