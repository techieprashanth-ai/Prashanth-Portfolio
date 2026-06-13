/* ===================================
V5 PORTFOLIO SCRIPT
=================================== */

/* SCROLL PROGRESS BAR */

window.addEventListener(“scroll”, () => {

const winScroll =
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

const progress =
document.getElementById(“progress-bar”);

if(progress){
progress.style.width =
scrolled + “%”;
}

});

/* REVEAL ANIMATIONS */

const revealElements =
document.querySelectorAll(
“section, .glass-card, .skill-card, .project-card, .achievement-card, .contact-card, .timeline-item”
);

revealElements.forEach((el)=>{
el.classList.add(“reveal”);
});

const revealObserver =
new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){
  entry.target.classList.add("show");
}

});

},{
threshold:.15
});

revealElements.forEach((el)=>{
revealObserver.observe(el);
});

/* ACTIVE NAVIGATION */

const sections =
document.querySelectorAll(“section”);

const navLinks =
document.querySelectorAll(
“.nav-links a”
);

window.addEventListener(
“scroll”,
()=>{

let current = “”;

sections.forEach((section)=>{

const sectionTop =
  section.offsetTop - 180;
if(
  window.scrollY >= sectionTop
){
  current =
    section.getAttribute("id");
}

});

navLinks.forEach((link)=>{

link.classList.remove(
  "active"
);
if(
  link.getAttribute("href")
  === "#" + current
){
  link.classList.add(
    "active"
  );
}

});

});

/* COUNTER ANIMATION */

const counters =
document.querySelectorAll(
“.stat-card h3”
);

const animateCounter = (counter)=>{

const text =
counter.innerText;

const target =
parseInt(
text.replace(/\D/g,””)
);

if(isNaN(target))
return;

let current = 0;

const increment =
Math.ceil(target / 40);

const update = ()=>{

current += increment;
if(current >= target){
  counter.innerText =
    text;
  return;
}
counter.innerText =
  current + "+";
requestAnimationFrame(
  update
);

};

update();

};

const counterObserver =
new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){
  const counter =
    entry.target.querySelector(
      "h3"
    );
  if(
    counter &&
    !counter.dataset.done
  ){
    animateCounter(
      counter
    );
    counter.dataset.done =
      "true";
  }
}

});

},{
threshold:.4
});

document
.querySelectorAll(”.stat-card”)
.forEach((card)=>{

counterObserver.observe(
card
);

});

/* THREE JS HERO */

const threeContainer =
document.getElementById(
“three-container”
);

if(
threeContainer &&
typeof THREE !== “undefined”
){

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

threeContainer.appendChild(
renderer.domElement
);

const geometry =
new THREE.IcosahedronGeometry(
2,
1
);

const material =
new THREE.MeshBasicMaterial({
color:0x00d4ff,
wireframe:true
});

const mesh =
new THREE.Mesh(
geometry,
material
);

scene.add(mesh);

camera.position.z = 5;

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
“mousemove”,
(event)=>{

  mouseX =
    (
      event.clientX /
      window.innerWidth
    ) * 2 - 1;
  mouseY =
    (
      event.clientY /
      window.innerHeight
    ) * 2 - 1;
}

);

document.addEventListener(
“touchmove”,
(event)=>{

  if(
    !event.touches[0]
  ) return;
  mouseX =
    (
      event.touches[0].clientX /
      window.innerWidth
    ) * 2 - 1;
  mouseY =
    (
      event.touches[0].clientY /
      window.innerHeight
    ) * 2 - 1;
}

);

function animate(){

requestAnimationFrame(
  animate
);
mesh.rotation.x +=
  0.002;
mesh.rotation.y +=
  0.003;
mesh.rotation.x +=
  (
    mouseY -
    mesh.rotation.x
  ) * 0.01;
mesh.rotation.y +=
  (
    mouseX -
    mesh.rotation.y
  ) * 0.01;
renderer.render(
  scene,
  camera
);

}

animate();

window.addEventListener(
“resize”,
()=>{

  camera.aspect =
    window.innerWidth /
    window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
}

);

}
