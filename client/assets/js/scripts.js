console.log("Space asteroids!");

$(function(){
  //********************************//
  //**** LIGHT UP THE NIGHT SKY ****//
  //********************************//
  var starField = $("#space-bg");
  createStarryNight(starField);
  scrollBarHeight = $("#scrollbar").height();
  scrollMessage = $("#scroll-msg");
  scrollTop = parseInt($("#scroll").css("top"));
  scrollBarDragHandler();
  toggleScaleViewHandler();



  //**** ADD ASTEROIDS ****//
  displayAsteroidsByYear(2016);
  

  renderGlobe();

}); // $(function(){}); END

var apiLinkBase = "https://api.nasa.gov/neo/rest/v1/";
var apiKey = "CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5";
var asteroidData = [];
var orbits;
var EARTH_DIAMETER = 600; // Diameter of WebGLglobe
var EM_DISTANCE = 384400;
var EM_DISTANCE_X = 30; // Multiplier, avg distance of moon from earth is 30x earth"s diameter
var EM_DIAMETER_X = 0.273 // Multiplier, avg size of moon relative to earth
var scrollBarHeight,
    scrollMessage,
    scrollTop,
    missDistance,
    percentScrolled;


function scrollBarDragHandler(){
   
  $( "#scroll" ).draggable({ 
    axis: "y",
    containment: "parent",
    drag: function( event, ui ) {

      percentScrolled = parseFloat((ui.position.top - scrollTop)/scrollBarHeight).toFixed(3);
      missDistance = 1-percentScrolled;

      // console.log("% scrolled", percentScrolled);
      console.log("Miss Distance:", missDistance);
      $(scrollMessage).css("top", ui.position.top);
      $("#scroll-msg span").text(
        parseInt(EM_DISTANCE-(EM_DISTANCE*percentScrolled)) + " km");
    } 
  });
}

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

