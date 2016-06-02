console.log("Space asteroids!");

$(function(){
  // **** LIGHT UP THE NIGHT SKY ****//
  var starField = $("#space-bg");
  // console.log(starField.height());
  createStarryNight(starField);


  //**** ADD ASTEROIDS ****//
  renderAsteroids();
  //console.log(w);


  
  // renderGlobe();

}); // $(function(){}); END

function renderAsteroids(){
  var container = $("#asteroid-field");
  var w = parseInt($(container).css("width")),
      h = parseInt($(container).css("height")),
      mLeft = parseInt($(container).css("margin-left")),
      mRight = parseInt($(container).css("margin-right"));
  
  // Color for brightest asteroid: hsl(184, 100%, 47%), #00E1F0, rgba(0, 225, 240, 1);
  // Moon mean orbital velocity = 1.022 km/s
  // Moon relative diameter to earth = 0.273

  // Load JSON asteroid data and intialize d3 rendering
  var asteroidD3 = d3.json("/data/neosLD.json", function(spaceRocks){
    
    var data = spaceRocks.slice();
    var format = d3.time.format("%Y-%m-%d");
    var dateFn = function(d) { return format.parse(d.closest_approach) };
    var distanceFn = function(d) { return d.miss_distance };
    var radiusFn = function(d) { return d.estimated_diameter/2 };
    var absMagnitudeFn = function(d) { return d.absolute_magnitude_h };
    var relVelocityFn = function(d) { return d.kilometers_per_second };
    // var majAxisFn = function(d) { return d.orbital_data.}

  
    // Time Scale here for now. May choose to remove later.
    var timeScale = d3.time.scale()
      .domain(d3.extent(data, dateFn))
      .range([20, w])
      
    // Scale for asteroid miss distance. May change this if orbital movement can be incorporated
    var missDistScale = d3.scale.linear()
      .domain(d3.extent(data, distanceFn))
      .range([20,h-20])


    // Scale for asteroid estimated radius
    var radiusScale = d3.scale.linear()
      .domain(d3.extent(data, radiusFn))
      .range([4,15])

    // Scale for asteroid absolute magnitude
    var absMagScale = d3.scale.linear()
      .domain(d3.extent(data, absMagnitudeFn))
      .range([188,360])
      // .range([54,0]) // yellow to red
    // console.log(d3.extent(data, absMagnitudeFn));
  

    // Render asteroids     
    var asteroidField = d3.select("#asteroid-field").append("svg:svg")
      .attr("width", w)
      .attr("height", h) 

    var asteroidGroup = asteroidField.append("g");
    var asteroids = asteroidGroup.selectAll("g.asteroid")
      .data(data)
      .enter()      
      .append("svg:circle")
      .attr("class", "asteroid")
      .attr("r", function(d) { return radiusScale(radiusFn(d)) })
      .attr("cx", function(d) { return timeScale(dateFn(d)) })
      .attr("cy", function(d) { return missDistScale(distanceFn(d)) })
      .style("fill", function(d) { return "url(#grad" + generateHue(d) + ")"})
      // .style("fill", function(d){ return "hsl(" + generateHue(d) + ",100%,57%)" })
      .style("stroke-opacity", 0.25)
      .style("stroke-width", "2px")
      .style("stroke", function(d){ return "hsl(" + generateHue(d) + ",100%,52%)"})
      .append("svg:title")
        .html(function(d){
          return d.name;
        });

    asteroidGroup.selectAll("g.asteroid")
      .data(spaceRocks, function(d) {
        return d.closest_approach
      });


    function generateHue(d){
      return absMagScale(absMagnitudeFn(d));
    }

    var asteroidGradients = asteroidField.append("defs");
    var asteroidGradient = asteroidGradients.selectAll("radialGradient")
      .data(data)
      .enter()
      .append("radialGradient")
      .attr("cx", "40%")
      .attr("cy", "40%")
      .attr("r", "120%")
      .attr("fx", "100%")
      .attr("fy", "40%")
      .attr("id", function(d) { return "grad" + generateHue(d)})

    asteroidGradient.append("stop")
      .attr("offset", "0%")
      .attr("style", "stop-color:rgb(240,240,240);stop-opacity:0.95")

    asteroidGradient.append("stop")
      .attr("offset", "70%")
      .attr("style", function(d){ return "stop-color:hsl(" + generateHue(d) + ",100%,52%);stop-opacity:1" })




    });
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


