$(function(){
 
  var earth = $('#earth');

  var width  = window.innerWidth,
      height = window.innerHeight;

  // Earth params
  var radius   = 0.5,
      segments = 32,
      rotation = 6;  

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 2000);
  camera.position.z = 1.5;

  // var renderer = new THREE.WebGLRenderer();
  var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setClearColor( 0x000000, 0 );
  renderer.setSize(width, height);

  scene.add(new THREE.AmbientLight(0x333333));

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,3,5);
  scene.add(light);

  var sphere = createSphere(radius, segments);
  sphere.rotation.y = rotation; 
  scene.add(sphere)



  $(earth).append(renderer.domElement);

  render();

  function render() {
    // controls.update();
    sphere.rotation.y += 0.0005;
    // clouds.rotation.y += 0.0005;    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }


  
  function createSphere(radius, segments) {
    var loader = new THREE.TextureLoader();
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map:   loader.load('/assets/images/world.jpg')
      })
    );
  }



}());