import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

import {
  OrbitControls
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";
import {
  GLTFLoader
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js";
import {
  DRACOLoader
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/DRACOLoader.js";
import {
  TextGeometry
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/geometries/TextGeometry.js";
import {
  FontLoader
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/FontLoader.js";

let container = document.querySelector(".scene");
let camera;
let renderer;
let scene;
let controls;
let modelContainer;
let loader;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var modelPosition;

//DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
);
dracoLoader.setDecoderConfig({
  type: "js"
});
dracoLoader.preload();

const frame1 = [{
    meshName: "main",
    gltf: "/img/model/IG4.123C.gltf",
    scale: 1,
    isFlip: false,
  },
  {
    meshName: "main",
    gltf: "/img/model/IG4.123C.gltf",
    scale: 1,
    isFlip: true,
  },
];

const frame2 = [{
    meshName: "main",
    gltf: "/img/model/IG4.166C.gltf",
    scale: 1,
    isFlip: false,
  },
  {
    meshName: "main",
    gltf: "/img/model/IG4.166C.gltf",
    scale: 1,
    isFlip: true,
  },
];
var temple = [{
  meshName: 'temple',
  gltf: '/img/model/rTemplePlast.gltf',
  // colorCode: 'fffffff', 
  scale: 0.01,
  isFlip: false,
},
{
  meshName: 'temple',
  gltf: '/img/model/rTemplePlast.gltf',
  scale: 0.01,
  isFlip: true,
},
];
let frameList = [frame1, frame2];

//Intail load
loadFrames(frameList[0], "main");

//click frame
// let frames = document.getElementById("frames").children;
// for (let i = 0; i < frames.length; i++) {
//   console.log("frames......." + frames[i]);
//   frames[i].addEventListener("click", () => {
//     // Inactive all frames
//     for (let j = 0; j < frames.length; j++) {
//       frames[j].classList.replace("border-slate-400", "border-white");
//     }
//     modelPosition = null;
//     console.log("frames......." + i);
//     frames[i].classList.replace("border-white", "border-slate-400");
//     loadFrames(frameList[i], "main");
//   });
// }
// document.getElementById("templeClick").addEventListener("click", () => {
//   const temple = [
//     {
//       meshName: "temple",
//       gltf: "/img/model/asta.gltf",
//       scale: 0.01,
//       isFlip: false,
//     },
//     {
//       meshName: "temple",
//       gltf: "/img/model/asta.gltf",
//       scale: 0.01,
//       isFlip: true,
//     },
//   ];

//   gLTFLoader(temple);
// });

// document.getElementById("boltClick").addEventListener("click", () => {
//   const bolt = [
//     {
//       meshName: "bolt",
//       gltf: "/img/model/bolt_1.gltf",
//       scale: 0.01,
//       isFlip: true,
//     },
//     {
//       meshName: "bolt",
//       gltf: "/img/model/bolt_1.gltf",
//       scale: 0.01,
//       isFlip: false,
//     },
//   ];
//   gLTFLoader(bolt);
// });
// document.getElementById("textClick").addEventListener("click", () => {
//   textLoader();
// });

//Click front
// let frontsControls = document.querySelector("#frontsControls");
// frontsControls.addEventListener("click", (event) => {
//   sceneTraverse("LENTE_DX", "/img/model/textures/blue.jpg");
// });

// //Click Frame
// let frameControls = document.querySelector("#colorControls");
// frameControls.addEventListener("click", (event) => {
//   sceneTraverse("FRONTALE", "/img/model/textures/PL0321.jpg");
// });

// //Click Frame
// let templeControls = document.querySelector("#templeControls");
// templeControls.addEventListener("click", (event) => {
//   sceneTraverse("MAT_METAL_GREY", "/img/model/textures/yellow.jpg");
// });

function onMouseMove(event) {
  mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
  //console.log(mouse.x, mouse.y)
}

/************** */
function frameTemplesLenses(DefaultFrame) {

}



export function loadFrames(modelObj, meshName) {
  if (renderer != null && meshName == "main") {
    disposeAllObjects();
  }
  scene = new THREE.Scene();
  modelContainer = new THREE.Group();
  scene.add(modelContainer);

  const fov = 25;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.7;
  const far = 900;

  // camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, -1, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const ambient = new THREE.AmbientLight(0x404040, 3);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(10, 10, 30);
  scene.add(light);

  //renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);

  //load model
  gLTFLoader(modelObj);
  setTimeout(function(){
    gLTFLoader(temple);
  }, 2000); 
  
  
  

  animate();
  onWindowResize();

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousemove", onMouseMove, false);
}

function textLoader() {
  const fontLoader = new FontLoader();
  fontLoader.load(
    "https://threejs.org/examples/fonts/optimer_regular.typeface.json",
    function (font) {
      const geometry = new TextGeometry("Ashok", {
        font: font,
        size: 0.05,
        height: 0.1,
        curveSegments: 30,
        weight: "Regular",
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 0.1,
        bevelSegments: 1,
        amount: 0.01,
      });

      var textMaterial = new THREE.MeshBasicMaterial({
        color: 0xf00000,
      });
      var textMesh = new THREE.Mesh(geometry, textMaterial);
      textMesh.position.set(modelPosition.x, modelPosition.y, modelPosition.z);
      textMesh.rotation.set(0, 45, 0);

      scene.add(textMesh);
      //modelContainer.add(scene);
    }
  );
}

function gLTFLoader(modelObj) {
  loader = new GLTFLoader();
  modelObj.forEach((modelDetails) => {
    const {
      gltf,
      scale,
      position,
      link,
      isFlip,
      meshName
    } = modelDetails;
    loader.load(gltf, ({
        scene
      }) => {
        if (meshName == "main" && !isFlip) {
          var target = scene.children.find((temp) => temp.name == "P1");
          if (target) modelPosition = target.position;
          else console.log("doesn't exists");
        }
        modelContainer.add(scene);
        scene.scale.set(scale, scale, scale);
        if ((meshName == "temple" || meshName == "bolt") && isFlip == false) {
          scene.position.set(modelPosition.x, modelPosition.y, modelPosition.z);
        } else if (
          (meshName == "temple" || meshName == "bolt") &&
          isFlip == true

        ) {
          scene.position.set(-modelPosition.x, modelPosition.y, modelPosition.z);
        } else {
          scene.position.set(0, 0, 0);
        }

        //scene.add(sprite);
        if (isFlip) {
          const vector = new THREE.Vector3(1, 1, 1);
          vector.x *= -1;
          vector.z *= 1;
          scene.scale.multiply(vector);
        }
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      // onError callback
      function (err) {
        console.error('An error happened');
      }
    );
  });
  loader.setDRACOLoader(dracoLoader);
}

function sceneTraverse(meshName, url) {
  var textureLoader = new THREE.TextureLoader();
  for (let i = 0; i < scene.children.length; i++) {
    var child = scene.children[i];
    var frameName = child.getObjectByName(meshName);
    if (frameName != null && frameName.name == meshName) {
      textureLoader.load(
        url,
        function (texture) {
          console.log(child.name);
          var children = scene.children[i].children;
          for (let j = 0; j < children.length; j++) {
            var childrenObj = children[j];
            const material = new THREE.MeshBasicMaterial({
              map: texture,
            });
            texture.flipY = false;
            if (childrenObj.getObjectByName(meshName) != null) {
              var materialObj = childrenObj.getObjectByName(meshName);
              materialObj.material.dispose();
              materialObj.material = material;
              materialObj.material.map.isRenderTargetTexture = true;
              materialObj.material.map.premultiplyAlpha = true;
              materialObj.material.map.flipY = true;
              texture.needsUpdate = true;
              materialObj.material.needsUpdate = true;
              //child.material.background.needsUpdate = true;
              materialObj.material.background = material;
              animate();
            }

          }
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded[Cap]");
        },
        function (err) {
          console.log("An error happened" + error);
        }
      );
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    container.style.cursor = "pointer";
  } else {
    container.style.cursor = "initial";
  }

  // modelContainer.children.forEach(child => {
  //   child.rotation.y += 0.01;
  // });

  controls.update();

  renderer.physicallyCorrectLights = true;
  renderer.render(scene, camera);
  update()
}
function update() {
  controls.maxDistance = 6;
  controls.minDistance =3;
}


function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function disposeAllObjects() {
  scene.children.forEach((sceneObject) => {
    if (!(sceneObject instanceof THREE.Object3D)) return;

    // Remove geometries to free GPU resources
    if (sceneObject.geometry) sceneObject.geometry.dispose();

    // Remove materials to free GPU resources
    if (sceneObject.material) {
      if (sceneObject.material instanceof Array) {
        sceneObject.material.forEach((material) => material.dispose());
      } else {
        sceneObject.material.dispose();
      }
    }

    // Remove object from scene
    scene.remove(sceneObject); // OR sceneObject.removeFromParent()
    scene.clear();

    renderer.renderLists.dispose();
    renderer.forceContextLoss();
    renderer.domElement = null;
    renderer.dispose();
    renderer = null;
    scene = null;
    camera = null;
    $(".scene").find('canvas').remove();

  });
}

export function disposeTempleObject() {
  scene.children.forEach((sceneObject) => {
    if (!(sceneObject instanceof THREE.Object3D)) return;

    // Remove geometries to free GPU resources
    if (sceneObject.geometry) sceneObject.geometry.dispose();

    // Remove materials to free GPU resources
    if (sceneObject.material) {
      if (sceneObject.material instanceof Array) {
        sceneObject.material.forEach((material) => {
          console.log('materialText', material);
        });
      }
    }


    // Remove object from scene
    // scene.remove(sceneObject); // OR sceneObject.removeFromParent()
    // scene.clear();

    // renderer.renderLists.dispose();
    // renderer.forceContextLoss();
    // renderer.domElement = null;
    // renderer.dispose();
    // renderer = null;
    // scene = null;
    // camera = null;
    // $(".scene").find('canvas').remove();

  });
}

export function setFrame(pos) {
  loadFrames(frameList[pos], "main");
}

export function setTemple(temple) {
 
  gLTFLoader(temple);
  //modelContainer.rotation.x = -1.600;
  //modelContainer.rotation.y = 1.600;
  modelContainer.rotation.z = 1.900
  // modelContainer.zoomIn = 1.900

}
export function setTemplePos() {
camera.updateProjectionMatrix();
  modelContainer.rotation.y = 17.109999999999875;
  modelContainer.rotation.z =6.19999999999913;
}


// Engraving Name 

// export function setTextView(){
//   textLoader();
// }

export function setFrontTexture(meterialName, img) {
  camera.zoom = 0.8;
  sceneTraverse(meterialName, img);
}
