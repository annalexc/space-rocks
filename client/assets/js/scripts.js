console.log("Space asteroids!");

$(function(){
  // **** LIGHT UP THE NIGHT SKY ****//
  var starField = $("#space-bg");
  createStarryNight(starField);
  toggleScaleViewHandler();
  
  //**** ADD ASTEROIDS ****//
  renderAsteroids();
  renderGlobe();

  // window.onresize = resizeCanvas;

}); // $(function(){}); END

var apiLinkBase = 'https://api.nasa.gov/neo/rest/v1/';
var apiKey = 'CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5';
var asteroidData = [];
var orbits;

function toggleScaleViewHandler(){
  $("#scale").on("click", function(){
    var wrapperScaled = $("#wrapper-scaled");
    var wrapper = $("#wrapper");

    if($(wrapperScaled).hasClass('hidden')){
      $(wrapper).fadeOut(500, function(){
        $(wrapper).addClass('hidden');
        $(wrapperScaled).fadeIn(1000, function(){
          $(wrapperScaled).removeClass('hidden');
        });
      });
    } else {
      $(wrapperScaled).fadeOut(500, function(){
        $(wrapperScaled).addClass('hidden');
        $(wrapper).fadeIn(1000, function(){
          $(wrapper).removeClass('hidden');
        });
      });
    };
  });
};


function createStarryNight(starField){
  var leftStart= Math.ceil(Math.random()*starField.width())+'px';
  renderStars(starField, 170, 1);
  renderStars(starField, 125, 2);
  renderStars(starField, 65, 3);
};

function renderStars(starField, numStars, size){
  for(var i = 0; i < numStars; i++){
    var $star = $('<div>');
    var starClass = 'star star'+size;
    var marginLeft = Math.ceil(Math.random()*1950)+'px';
    $star.addClass(starClass);
    $star.css({
      'width'           : size*1.5+'px',
      'height'          : size*1.5+'px',
      'background-color': 'white',
      'position'        : 'absolute',
      'margin-top'      : Math.ceil(Math.random()*starField.height())+'px',
      'margin-left'     : marginLeft
    });
    $('#stars'+size).append($star);
  };
};


function getData(route, callback){
  callback = callback || function(){};
  $.ajax({
    url: route,
    type: 'get',
    success: function(response){
      callback(response);
    }
  });
};

