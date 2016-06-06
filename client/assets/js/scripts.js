console.log("Space asteroids!");

$(function(){
  setVariables();

  //********************************//
  //**** LIGHT UP THE NIGHT SKY ****//
  //********************************// 
  createStarryNight(starField);
  var yearSelect = $(".year");
  yearSelect.each(function(id, year){
    setTimeout(function(){ 
      $(year).addClass("fadein");
    },1000 * id *0.5);
  });
  linkSelectHandler(intro,wrapper);

  scrollBarDragHandler();
  toggleScaleViewHandler();
  animateHamburger();


  //************************************//
  //* ADD ASTEROIDS BASED ON SELECTION *//
  //************************************//
  // displayAsteroidsByYearToScale(2016);
  
  window.onresize = scrollBarDragHandler;
  // renderGlobe();

}); // $(function(){}); END

var apiLinkBase = "https://api.nasa.gov/neo/rest/v1/",
    apiKey = "CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5",
    asteroidData = [],
    container,
    containerAll,
    count = 0,
    earth,
    EARTH_DIAMETER = 600, // Diameter of WebGLglobe
    EM_DISTANCE = 384402,
    EM_DISTANCE_X = 30, // Multiplier, avg distance of moon from earth is 30x earth"s diameter
    EM_DIAMETER_X = 0.273, // Multiplier, avg size of moon relative to earth
    guide,
    intro,
    missDistance,
    orbits,
    pctScrolled3,
    pctScrolled2,
    scrollBarHeight,
    scrollMessage,
    scrollTop,
    starField,
    wrapper,
    wrapperScaled,
    hAll,
    years = ["2012","2013","2014","2015","2016"],
    year;



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

function setVariables(){

  // Elements
  starField = $("#space-bg");
  scrollMessage = $("#scroll-msg");
  earth = $("#earth");
  guide = $("#guide");
  intro = $("#intro");
  wrapper = $("#wrapper");
  wrapperScaled = $("#wrapper-scaled");
  container = $("#asteroid-field");
  containerAll = $("#asteroid-all");

  // Element Values
  scrollBarHeight = $("#scrollbar").height()-1.01;
  scrollTop = parseInt($("#scroll").css("top"));
  // w = parseFloat($(containerAll).css("width")),
  // h = parseFloat($(container).css("height")),
  hAll = parseFloat($(containerAll).css("height"));
  // mLeft = parseInt($(container).css("margin-left")),
  // mRight = parseInt($(container).css("margin-right"));
  
}


function scrollBarDragHandler(){
  $("#scroll").draggable({ 
    axis: "y",
    containment: "parent",
    refreshPositions: true,
    start: function(event, ui) {
      $("#guide").addClass("fadein");
      $("#guide").removeClass("invisible");
    },
    drag: function( event, ui ) {
      if (count == 0) {
        scrollTop = ui.position.top;
      }
      count++;

      pctScrolled3 = parseFloat((ui.position.top - scrollTop)/scrollBarHeight).toFixed(3);
      pctScrolled2 = parseFloat((ui.position.top - scrollTop)/scrollBarHeight).toFixed(2);
      missDistance = 1-pctScrolled3;
      // console.log(pctScrolled3);
      // console.log("Miss Distance: ", missDistance);
      
      if(pctScrolled3 <= 0){
        $("#scroll-msg span").text("384402 km");
        $(scrollMessage).css("top",scrollTop);
        $(guide).css("top", scrollTop);
      } else if (pctScrolled3 >= 0.995) {
        $("#scroll-msg span").text("0 km");
        $(scrollMessage).css("top", (scrollTop+scrollBarHeight));
        $(guide).css("top", (scrollTop+scrollBarHeight));
      } else {
        $("#scroll-msg span").text(parseInt(EM_DISTANCE-(EM_DISTANCE*pctScrolled3)) + " km");
        $(scrollMessage).css("top", ui.position.top);
        $(guide).css("top", ui.position.top);
      }

      $(earth).css({
          "bottom" : -300 + pctScrolled3*270
        });
      
      $(containerAll).css({
        "margin-top" : 0 - pctScrolled2*(hAll)*0.462
      });

      $(starField).css({
        "top" : 0 - pctScrolled2*(hAll/8)
      });

      // $(".w-to-b").css({
      //   "color" : "hsla(0,0%," + (1-pctScrolled3)*100 + "%,0.9)"
      // })
      // $(".w-to-b-fade").css({
      //   "color" : "hsla(0,0%," + (1-pctScrolled3)*100 + "%,0.65)"
      // })

    // };
    },
    stop: function( event, ui ){
      $("#guide").addClass("invisible");
      $("#guide").removeClass("fadein");
    } 
  });
};


function toggleScaleViewHandler(){
  $("#scale").on("click", function(){
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

function linkSelectHandler(toFadeOut, toFadeIn){

  var yearMenu = $("#year-menu");
  if($(yearMenu).hasClass("invisible")){
    $(yearMenu).removeClass("invisible");
  }

  $('.year').on('click', function(){
    year = $(this).text();
    console.log(year);
    displayAsteroidsByYearToScale(year);
    toggleView(toFadeOut,toFadeIn);
    setOptions();
    buttonClickHandler();
  });
};

function buttonClickHandler(){
  if(!$(wrapperScaled).hasClass("hidden")){
    $(wrapperScaled).addClass("hidden");
  }

  var reload = $("#reload");
  var fly = $("#fly");
  var yearMenu = $("#year-menu");
  $(reload).on("click", function(){
    displayAsteroidsByYearToScale(year);
    linkSelectHandler(wrapper,wrapper);
    reload.addClass("hidden");
    fly.removeClass("hidden");
  });
  $(fly).on("click", function(){
    fly.addClass("hidden");
    reload.removeClass("hidden");
    toggleView(yearMenu);
  });
}

function toggleView(toFadeOut, toFadeIn){
  $(toFadeOut).addClass("invisible");
  $(toFadeIn).removeClass("invisible");
  $(toFadeIn).addClass("fadein");
};

function setOptions(){

  $(".left").empty();
  $(".right").empty();
  $(".center").empty();
  var nextYear;
  var prevYear;
  yearIndex = years.indexOf(year);
  if(yearIndex == years.length - 1){
    nextYear = years[0];
    prevYear = years[yearIndex-1];
  } else if(yearIndex == 0){
    nextYear = years[1];
    prevYear = years[years.length-1];
  } else {
    nextYear = years[yearIndex+1];
    prevYear = years[yearIndex-1];
  }
  // console.log(yearIndex);
  var $prevYear = $("<span>").addClass("medium year w-to-b-fade fadein");
  var $nextYear = $("<span>").addClass("medium year w-to-b-fade fadein");
  var $leftArrow = $("<span>").addClass("medium text w-to-b-fade fadein");
  var $rightArrow = $("<span>").addClass("medium text w-to-b-fade fadein");
  var $currYear = $("<span>").addClass("large text w-to-b fadein");

  $leftArrow.html("&#12296;");
  $rightArrow.html("&#12297;");

  $prevYear.text(prevYear);
  $nextYear.text(nextYear);
  $currYear.text(year);
  $(".left").append($leftArrow);
  $(".left").append($prevYear);
  $(".right").append($nextYear);
  $(".right").append($rightArrow);
  $(".center").append($currYear);

  linkSelectHandler(wrapper,wrapper);

};



function animateHamburger(){
  // toggles the open class on the hamburger when clicked
  var $hamburgerButton = $('#hamburger-button');
  var $mainMenu = $('#main-menu');
  $hamburgerButton.on('click', function(e){
    $(this).toggleClass('open');
    $mainMenu.toggleClass('open');
  });
};




