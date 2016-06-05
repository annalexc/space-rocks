console.log("Space asteroids!");

$(function(){
  //********************************//
  //**** LIGHT UP THE NIGHT SKY ****//
  //********************************//
  starField = $("#space-bg");
  createStarryNight(starField);
  scrollBarHeight = $("#scrollbar").height()-1.01;
  scrollMessage = $("#scroll-msg");
  guide = $("#guide");
  scrollTop = parseInt($("#scroll").css("top"));
  scrollBarDragHandler();
  toggleScaleViewHandler();
  container = $("#asteroid-field");
  containerAll = $("#asteroid-all");
  w = parseFloat($(container).css("width")),
  h = parseFloat($(container).css("height")),
  hAll = parseFloat($(containerAll).css("height")),
  mLeft = parseInt($(container).css("margin-left")),
  mRight = parseInt($(container).css("margin-right"));


  //************************************//
  //* ADD ASTEROIDS BASED ON SELECTION *//
  //************************************//
  displayAsteroidsByYearToScale(2016);
  
  window.onresize = scrollBarDragHandler;
  // renderGlobe();

}); // $(function(){}); END

var apiLinkBase = "https://api.nasa.gov/neo/rest/v1/",
    apiKey = "CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5",
    asteroidData = [],
    container,
    containerAll,
    count = 0,
    EARTH_DIAMETER = 600, // Diameter of WebGLglobe
    EM_DISTANCE = 384402,
    EM_DISTANCE_X = 30, // Multiplier, avg distance of moon from earth is 30x earth"s diameter
    EM_DIAMETER_X = 0.273, // Multiplier, avg size of moon relative to earth
    guide,
    missDistance,
    orbits,
    pctScrolled3,
    pctScrolled2,
    scrollBarHeight,
    scrollMessage,
    scrollTop,
    starField,
    w,h, hAll, mLeft,mRight;
    

function scrollBarDragHandler(){
   
  $("#scroll").draggable({ 
    axis: "y",
    containment: "parent",
    drag: function( event, ui ) {
      // console.log(ui);
      var asteroids = $('.asteroid');
      if (count == 0) {
        scrollTop = ui.position.top;
      }
      count++;

      pctScrolled3 = parseFloat((ui.position.top - scrollTop)/scrollBarHeight).toFixed(3);
      pctScrolled2 = parseFloat((ui.position.top - scrollTop)/scrollBarHeight).toFixed(2);
      missDistance = 1-pctScrolled3;
      console.log(pctScrolled3);
      // console.log("Miss Distance: ", missDistance);
      $(scrollMessage).css("top", ui.position.top);
      $(guide).css("top", ui.position.top);
      
      if(pctScrolled3 <= 0){
        $("#scroll-msg span").text("384402 km");
        $(scrollMessage).css("top",scrollTop);
        $(guide).css("top", scrollTop);
      } else if (pctScrolled3 >= 0.995) {
        $("#scroll-msg span").text("0 km");
        $(scrollMessage).css("top", (scrollTop+scrollBarHeight));
        $(guide).css("top", (scrollTop+scrollBarHeight));
      } else {
        $("#scroll-msg span").text(
         parseInt(EM_DISTANCE-(EM_DISTANCE*pctScrolled3)) + " km");
      }
      
    
      if(asteroids.length){

        $(containerAll).css({
          'margin-top' : 0 - pctScrolled2*(hAll)*0.462
        })
      };
    } 
  });
};


// function scrollAsteroidsHandler(){ 
//   $("#scroll").draggable({ 
//     axis: "y",
//     containment: "parent",
//     drag: function( event, ui ) {
//       var circles = $("circles");
//       console.log(circles);
//     } 
//   });
// };

function toggleScaleViewHandler(){
  $("#scale").on("click", function(){
    var wrapperScaled = $("#wrapper-scaled");
    var wrapper = $("#wrapper");
    
    if($(wrapperScaled).hasClass("hidden")){
      $(wrapper).fadeOut(750, function(){
        $(wrapperScaled).removeClass("hidden").fadeIn(1200);
        $(this).addClass("hidden");
      });  
    } else {
      $(wrapperScaled).fadeOut(750, function(){
        $(wrapper).removeClass("hidden").fadeIn(1200);
        $(this).addClass("hidden");
      });    
    };
  });
};


function createStarryNight(starField){
  var leftStart= Math.ceil(Math.random()*starField.width())+"px";
  renderStars(starField, 170, 1);
  renderStars(starField, 125, 2);
  renderStars(starField, 65, 3);
};

function renderStars(starField, numStars, size){
  for(var i = 0; i < numStars; i++){
    var $star = $("<div>");
    var starClass = "star star"+size;
    var marginLeft = Math.ceil(Math.random()*1950)+"px";
    $star.addClass(starClass);
    $star.css({
      "width"           : size*1.5+"px",
      "height"          : size*1.5+"px",
      "background-color": "white",
      "position"        : "absolute",
      "margin-top"      : Math.ceil(Math.random()*starField.height())+"px",
      "margin-left"     : marginLeft
    });
    $("#stars"+size).append($star);
  };
};


function getData(route, callback){
  callback = callback || function(){};
  $.ajax({
    url: route,
    type: "get",
    success: function(response){
      callback(response);
    }
  });
};

