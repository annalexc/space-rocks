console.log("Space asteroids!");

$(function(){
  // **** LIGHT UP THE NIGHT SKY ****//
  var starField = $("#space-bg");
  // console.log(starField.height());
  createStarryNight(starField);


  //**** ADD ASTEROIDS ****//
  // renderAsteroids();
  //console.log(w);


  
  // renderGlobe();

}); // $(function(){}); END




function renderAsteroids(){
  var spaceField = $("#asteroids");
  var w = parseInt($(spaceField).css("width")),
      h = parseInt($(spaceField).css("height")),
      mLeft = parseInt($(spaceField).css("margin-left")),
      mRight = parseInt($(spaceField).css("margin-right"));
      console.log(w);

  var data = asteroids.slice();
  var format = d3.time.format("%Y-%m-%d");
  var distanceFn = function(d) { return d.miss_distance }
  
  var dateFn = function(d) { 
    // console.log(format.parse(d.closest_approach));
    return format.parse(d.closest_approach) }



// var x = d3.time.scale()
//     .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
//     .rangeRound([0, width - margin.left - margin.right]);

// var y = d3.scale.linear()
//     .domain([0, d3.max(data, function(d) { return d.total; })])
//     .range([height - margin.top - margin.bottom, 0]);



  var x = d3.time.scale()
    
    .domain(d3.extent(data, dateFn))
    .range([20, w])
    // .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
    // .rangeRound([0, w]);

    console.log(d3.extent(data,dateFn));

  var y = d3.scale.linear()
    .domain(d3.extent(data, distanceFn))
    .range([20,h-20])

    console.log(d3.extent(data,distanceFn));
  

  var svg = d3.select("#asteroids").append("svg:svg")
    .attr("width", w)
    .attr("height", h)

  svg.selectAll("circle").data(data).enter()
    .append("svg:circle")
    .attr("r", 10)
    .attr("cx", function(d) { return x(dateFn(d)) })
    .attr("cy", function(d) { return y(distanceFn(d)) })
    .append("svg:title")
      .html(function(d){
        return d.name;
      })



  svg.selectAll("circle")
    .data(asteroids, function(d) {
    return d.closest_approach
  })
};



function createStarryNight(starField){
  var leftStart= Math.ceil(Math.random()*starField.width())+'px';
  renderStars(starField, 125, 1);
  renderStars(starField, 75, 2);
  renderStars(starField, 50, 3);
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


