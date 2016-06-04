function renderGlobe(){
  
  var earth = $("#earth");
  var width  = window.innerWidth,
      height = 600;

  var rotation = 10;  

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(39, width / height, 1, 1000);
  camera.position.z = 1.5;

  // var renderer = new THREE.WebGLRenderer();
  var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setClearColor( 0x000000, 0 );
  renderer.setSize(width, height);

  scene.add(new THREE.AmbientLight(0x333333));

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,3,5);
  scene.add(light);

  var earthSphere = createSphere(0.5, 32, '/assets/images/world.jpg');
  earthSphere.rotation.y = rotation; 
  scene.add(earthSphere)

  $(earth).append(renderer.domElement);
  
  render();

  function render() {
    earthSphere.rotation.y += 0.0005;  
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function createSphere(radius, segments, imageUrl) {
    var loader = new THREE.TextureLoader();
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map:   loader.load(imageUrl)
      })
    );
  };
};




// function resizeCanvas() {
//   if ($("canvas").width()  !=  window.innerWidth) {
//     $("canvas").css("width", "window.innerWidth");
//     renderGlobe();
//   }
// }
