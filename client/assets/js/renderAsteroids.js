// ***************************** //
// ********* CONSTANTS ********* //
// ***************************** //

// Moon mean orbital velocity = 1.022 km/s
var MOON_VELOCITY = 1.022;
// Moon relative diameter to earth = 0.273
var MOON_EARTH_D_RATIO = 0.273;
// Color for brightest asteroid: hsl(188,100%,52%);

function displayAsteroidsByYear(year){
  getData('/api/asteroids/year/'+year, function(spaceRocks){
    renderAsteroids(spaceRocks);
  });
};

function displayAsteroidsByYearToScale(year){
  getData('/api/asteroids/year/'+year, function(spaceRocks){
    renderAsteroidsToScale(spaceRocks);
  });
};

function renderAsteroidsToScale(spaceRocks){
  containerAll.empty();
  var w = parseInt($(containerAll).css("width")),
      h = parseInt($(containerAll).css("height")),
      mLeft = parseInt($(containerAll).css("margin-left")),
      mRight = parseInt($(containerAll).css("margin-right"));

  var data = spaceRocks.slice();
  var dateTimeFormat = d3.time.format("%Y-%m-%d");
  var dateFormat = d3.time.format("%a %b %d %Y");
  var toString = d3.format(",d");
  var yearFormat = d3.time.format("%Y");
  var decimalFormat = d3.format(".4f");

 
  var dateTimeFn = function(d) { return dateTimeFormat.parse(d.closest_approach) };
  var dateTimeFn2 = function(input) { return dateTimeFormat(input) };
  var dateFn = function(d) { return dateFormat(dateTimeFn(d)) }
  var yearFn = function(d) { return yearFormat(dateTimeFn(d)) };
  var distanceFn = function(d) { return d.miss_distance };
  var radiusFn = function(d) { return d.estimated_diameter/2 };
  var absMagnitudeFn = function(d) { return d.absolute_magnitude_h };
  var relVelocityFn = function(d) { return d.kilometers_per_second };

    // console.log(dateTimeFn2(new Date));
    // var majAxisFn = function(d) { return d.orbital_data.}
    // Time Scale here for now. May choose to remove later.
    var timeScale = d3.time.scale()
      .domain(d3.extent(data, dateTimeFn))
      .range([0.1*w, 0.75*w])

    // Scale for asteroid miss distance. May change this if orbital movement can be incorporated
    var missDistScale = d3.scale.linear()
      .domain(d3.extent(data, distanceFn))
      // .range([h*d3.max(data, distanceFn)-20,h*d3.min(data, distanceFn)+50])
      .range([h-81.9, 90])

    var missDistScaleHalfHeight = d3.scale.linear()
      .domain(d3.extent(data, distanceFn))
      // .range([h*d3.max(data, distanceFn)-20,h*d3.min(data, distanceFn)+50])
      .range([h/1.65-81.9, 90])
      
    // Scale for asteroid estimated radius
    var radiusScale = d3.scale.linear()
      // .domain(d3.extent(data, radiusFn))
      .domain([0,0.1])
      // .range([4,15])
      .range([0,100])

   
    // Scale for asteroid estimated radius
    var radiusXScale = d3.scale.linear()
      // .domain(d3.extent(data, radiusFn))
      // .range([4,15])
      .range([0.1*w,0.65*w])

    // Scale for asteroid absolute magnitude
    var absMagScale = d3.scale.linear()
      .domain(d3.extent(data, absMagnitudeFn))
      // .range([188,360])
      .range([54,0]) // yellow to red
      // .range([321,188])

     console.log(d3.extent(data, absMagnitudeFn));


    var yAxis = d3.svg.axis()
      .scale(missDistScale)
      .orient("right")
      .ticks(5);

    var velocityScale = d3.scale.linear()
      .domain(d3.extent(data, relVelocityFn))
      .range(d3.extent(data, relVelocityFn))


    // Select asteroid field to append space objects   
    var asteroidField = d3.select("#asteroid-all")
      .append("svg:svg")
      // .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr("viewBox", function(d){ return "0 0 " + w + " " + h})
      .attr("width", w)
      .attr("height", h)

    // asteroidField.append("g")
    //   .attr("class", "axis")
    //   .attr("transform", "translate(30,0)")
    //   // .attr("fill", "white")
    //   .call(yAxis); 

    asteroidField.append("svg:image")
      .attr("x", w/2-81.9)
      .attr("y", -85)
      // .attr("src", "/assets/images/moon.png")
      .attr("xlink:href", "/assets/images/moon.png")
      .attr("id", "moon-svg")
      .attr("width", 163.8)
      .attr("height", 163.8)
      .style("position", "absolute")
      .style("left", 0)
      .style("right", 0)
      .style("margin", "0 auto")
      // .attr("text-anchor", "middle"); 

    var asteroidGroup = asteroidField.append("g");
    //**************************//
    //**** RENDER ASTEROIDS ****//
    //**************************//

    // renderAsteroidGroup();
    // renderAsteroidGradients();

    // function renderAsteroidGroup(){
      

      
      var asteroid = asteroidGroup.selectAll("g.asteroid")
        .data(data)
        .enter()
        .append("g");

      asteroid.append("a")
      var link = asteroidGroup.selectAll("a")
        .attr("xlink:href", function(d) { return d.url; }) 
        .attr("target", "_blank")  
        .append("svg:circle")
        .attr("class", "asteroid")
        .attr("r", function(d) { return radiusScale(radiusFn(d)) })
        .attr("cx", function(d) { return timeScale(dateTimeFn(d)) })
        .attr("cy", function(d) { return missDistScale(distanceFn(d)) })
        .attr("xlink:href", function(d) { return d.url; })
        .style("fill", function(d) { return "url(#grad" + generateHue(d) + ")"})
        // .style("fill", function(d){ return "hsl(" + generateHue(d) + ",100%,57%)" })
        .style("stroke-opacity", 0.25)
        .style("stroke-width", "2px")
        .style("stroke", function(d){ return "hsl(" + generateHue(d) + ",100%,52%)"})
        .on("mouseover", displayInfo)
        .on("mouseout", hideInfo)
      
      var labels = asteroidField.append("g");

      var nameLabel = labels.selectAll("g.name-label")
        .data(data)
        .enter()
        .append("text")
        .style("display","none")
        .attr("class", "name-label")
        .attr("x", function(d) { return timeScale(dateTimeFn(d))+radiusScale(radiusFn(d))+5})
        .attr("y", function(d) { return missDistScale(distanceFn(d))+5 })
        .text(function(d){ return d.name; })
      

      labels.append("text")
        .style("display","none")
        .attr("class", "moon-label")
        .attr("x", 0)
        .attr("y", 0)
        .text("This represents the moon travelling at ~1.022 km/s")



      // var distLabel = labels.selectAll("g.dist-label")
      //   .data(data)
      //   .enter()
      //   .append("text")
      //   .attr("class", "dist-label")
      //   .attr("x", function(d) { return timeScale(dateTimeFn(d))+radiusScale(radiusFn(d))+5})
      //   .attr("y", function(d) { return missDistScale(distanceFn(d))+15 })
      //   .text(function(d){ return decimalFormat(d.miss_distance) + " LD"; })



      asteroidGroup.selectAll("g.asteroid")
        .data(spaceRocks, function(d) {
          return d.closest_approach
        });
      // };


    //**************************//
    //*** ASTEROID GRADIENTS ***//
    //**************************//
    // function renderAsteroidGradients(){
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
    // }
    // Let's add a button !
    var buttonFly = d3.select("#fly");
    

    buttonFly.on("click", fly);


    //**************************//
    //******* FUNCTIONS ********//
    //**************************//

    function generateHue(d){
      return absMagScale(absMagnitudeFn(d));
    };

    function fly(){
      console.log("clicked!");
      var moon = asteroidField.select("#moon-svg");
      moon = moon.transition()
        .duration(250)
        .attr("x", 0.25*w)
        .attr("y", -85)
        .transition()
        .duration(200000)
        .attr("x", 0.75*w)
        .ease("linear")


       var moonLabel = asteroidField.select(".moon-label").transition()
        .duration(250)
        .style("opacity", 1)
        .attr("x", 0.25*w+164)
        .attr("y", 42)
        .transition()
        .duration(10000)
        .style("opacity", 0)
        .transition()
        .duration(200000)
        .attr("x", 0.75*w)
        .ease("linear")


      var nameLabels = asteroidField.selectAll(".name-label").transition()
        .duration(250)
        .style("display", "inline")
        .attr("x", function(d) {return 0.25*w + "px"})
        .attr("y", function(d) { return missDistScaleHalfHeight(distanceFn(d))+4 })
        .transition()
        .duration(function(d){ 
            console.log(d.name, velocityScale(relVelocityFn(d)));
            return MOON_VELOCITY/velocityScale(relVelocityFn(d))*200000;
          })
        .attr("x", 0.75*w)
        .ease("linear")

      var asteroid = asteroidGroup.selectAll(".asteroid");
        asteroid = asteroid.transition()
          .duration(250)
          .attr("cx", function(d) {return 0.25*w + "px"})
          .attr("cy", function(d) { return missDistScaleHalfHeight(distanceFn(d)) })
          .transition()
          // .duration(2000)
          .duration(function(d){ 
            console.log(d.name, velocityScale(relVelocityFn(d)));
            return MOON_VELOCITY/velocityScale(relVelocityFn(d))*200000;
          })
          .attr('stroke-width', 0.5)
          .attr("cx", 0.75*w)
          .ease('linear')
      };

    function displayInfo(d){

      // d3.select("#asteroid-info").classed("invisible",false);
      d3.select("#asteroid-info")
        .style("display","block")
        .classed("fadein",true)


      var coordinates = [0, 0];
      coordinates = d3.mouse(document.body);
      var x = coordinates[0];
      var y = coordinates[1];
      // console.log(coordinates);

      d3.select("#asteroid-info")
        .style("left", function() { 
          return x + "px";
        })
        .style("top", function() { 
          return y + "px";
        })  
        // .transition()
        // .duration(200)
        // .style("opacity", 1)
      d3.select("#a-name").html("<span class='big bold'>" + d.name + "</span>");
      d3.select("#a-date").html("Closest Approach Date: <span class='bold'>" + dateFn(d) + "</span>");
      d3.select("#a-distance").html("Miss Distance: <span class='bold'>" + decimalFormat(d.miss_distance) + "</span> LD");
      d3.select("#a-diameter").html("Avg. Est. Diameter: <span class='bold'>" + decimalFormat(d.estimated_diameter*1000) + "</span> m");
      d3.select("#a-velocity").html("Relative Velocity: <span class='bold'>" + decimalFormat(d.kilometers_per_second) + "</span>" + "</span> km/s");
      d3.select("#a-magnitude").html("Absolute Magnitude: <span class='bold'>" + decimalFormat(d.absolute_magnitude_h) + "</span> H");
    };

    function hideInfo(d){
      d3.select("#asteroid-info")
        // .transition()
        // .duration(500)
        .style("display", "none")
      d3.select("#asteroid-info").classed("fadein",false);
      // d3.select("#asteroid-info").classed("invisible",true);
    };
};






