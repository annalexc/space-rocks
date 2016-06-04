function renderAsteroids(){
  var container = $("#asteroid-field");
  var w = parseInt($(container).css("width")),
      h = parseInt($(container).css("height")),
      mLeft = parseInt($(container).css("margin-left")),
      mRight = parseInt($(container).css("margin-right"));
  

  // Color for brightest asteroid: hsl(188,100%,52%);
  
  // Moon mean orbital velocity = 1.022 km/s
  var MOON_VELOCITY = 1.022;

  // Moon relative diameter to earth = 0.273

 
  

  // Load JSON asteroid data and intialize d3 rendering
  var asteroidD3 = d3.json("/data/neosLD.json", function(spaceRocks){
    
    
    var data = spaceRocks.slice();
    var dateTimeFormat = d3.time.format("%Y-%m-%d");
    var dateFormat = d3.time.format("%a %b %d %Y");
    var toString = d3.format(",d");
    var yearFormat = d3.time.format("%Y");
    var decimalFormat = d3.format(".2f");



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
      .domain([d3.min(data, dateTimeFn), new Date])
      .range([20, w])
      
    // console.log(d3.min(data, dateTimeFn))
    // console.log((new Date));

    // Scale for asteroid miss distance. May change this if orbital movement can be incorporated
    var missDistScale = d3.scale.linear()
      .domain(d3.extent(data, distanceFn))
      .range([h-20,20])
      // console.log(d3.extent(data, distanceFn));

    // Scale for asteroid estimated radius
    var radiusScale = d3.scale.linear()
      .domain(d3.extent(data, radiusFn))
      // .range([4,15])
      .range([5,20])


    // Scale for asteroid absolute magnitude
    var absMagScale = d3.scale.linear()
      .domain(d3.extent(data, absMagnitudeFn))
      // .range([188,360])
      // .range([54,0]) // yellow to red
      .range([321,188])

      // console.log(d3.extent(data, absMagnitudeFn));

    // Scale for asteroid velocity

    var velocityScale = d3.scale.linear()
      .domain(d3.extent(data, relVelocityFn))
      .range(d3.extent(data, relVelocityFn))

      // console.log(d3.extent(data, relVelocityFn));
    
    // Select asteroid field to append space objects   
    var asteroidField = d3.select("#asteroid-field").append("svg:svg")
      .attr("width", w)
      .attr("height", h) 
      // console.log(w);




    //**************************//
    //***** WHYYYYYYYYYYYY *****//
    //**************************//
    var label = asteroidField.append("text")
      .attr("class", "label")
      .attr("text-anchor", "end")
      .attr("y", h - 24)
      .attr("x", w)
      .style("fill", "white")
      .text(2016)
    //**************************//
    //* ISN'T THIS RENDERING? **//
    //**************************//





    // Render center axis to represent closest approach date
    // var approachAxis = asteroidField.append("line")
    //   .attr("x1", w/2)  
    //   .attr("y1", 0)
    //   .attr("x2", w/2)  //<<== and here
    //   .attr("y2", h)
    //   .style("stroke-width", 1)
    //   .style("stroke", "red")
    //   .style("fill", "none");




    var asteroidGroup = asteroidField.append("g");

    //**************************//
    //**** RENDER ASTEROIDS ****//
    //**************************//

    var asteroid = asteroidGroup.selectAll("g.asteroid")
      .data(data)
      .enter()      
      .append("svg:circle")
      .attr("class", "asteroid")
      .attr("r", function(d) { return radiusScale(radiusFn(d)) })
      .attr("cx", function(d) { return timeScale(dateTimeFn(d)) })
      .attr("cy", function(d) { return missDistScale(distanceFn(d)) })
      .style("fill", function(d) { return "url(#grad" + generateHue(d) + ")"})
      // .style("fill", function(d){ return "hsl(" + generateHue(d) + ",100%,57%)" })
      .style("stroke-opacity", 0.25)
      .style("stroke-width", "2px")
      .style("stroke", function(d){ return "hsl(" + generateHue(d) + ",100%,52%)"})
      .on("mouseover", displayInfo)
      .on("mouseout", hideInfo)
      .append("svg:title")
        .html(function(d){return d.name + " " + d.closest_approach;})

    asteroidGroup.selectAll("g.asteroid")
      .data(spaceRocks, function(d) {
        return d.closest_approach
      });

      

    


    //**************************//
    //*** ASTEROID GRADIENTS ***//
    //**************************//

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



    // Let's add a button !
    var buttonFly = d3.select("#fly");
    

    buttonFly.on("click", fly);


    //**************************//
    //******* FUNCTIONS ********//
    //**************************//

    function generateHue(d){
      return absMagScale(absMagnitudeFn(d));
    }


    function displayInfo(d){

      d3.select("#asteroid-info").classed("hidden",false);

      d3.select("#asteroid-info")
        .style("left", function() { 
          var left = timeScale(dateTimeFn(d));
          left = left + "px";
          return left;
        })
        .style("top", function() { 
          var top = missDistScale(distanceFn(d));
          top = top + "px";
          return top;
        })
        .transition()
        .duration(500)
        .style("opacity", 1)

      d3.select("#a-name").html("<span class='big bold'>" + d.name + "</span>");
      d3.select("#a-date").html("Closest Approach Date: <span class='bold'>" + dateFn(d) + "</span>");
      d3.select("#a-distance").html("Miss Distance: <span class='bold'>" + decimalFormat(d.miss_distance) + "</span> LD");
      d3.select("#a-diameter").html("Avg. Est. Diameter: <span class='bold'>" + decimalFormat(d.estimated_diameter*1000) + "</span> m");
      d3.select("#a-velocity").html("Relative Velocity: <span class='bold'>" + decimalFormat(d.kilometers_per_second) + "</span>" + "</span> km/s");
      d3.select("#a-magnitude").html("Absolute Magnitude: <span class='bold'>" + decimalFormat(d.absolute_magnitude_h) + "</span> H");
    };

    function hideInfo(d){
      d3.select("#asteroid-info")
        .transition()
        .duration(500)
        .style("opacity", 0)

      d3.select("#asteroid-info").classed("hidden",true);
    }


    function fly() {
      console.log("clicked!");

      var asteroid = asteroidGroup.selectAll(".asteroid");
      (function repeat() {
        asteroid = asteroid.transition()
          .duration(250)
          .attr("cx", "20px")
          .transition()
          // .duration(2000)
          .duration(function(d){ 
            console.log(d.name, velocityScale(relVelocityFn(d)));
            return MOON_VELOCITY/velocityScale(relVelocityFn(d))*100000;
          })
          .attr('stroke-width', 0.5)
          .attr("cx", w)
          .ease('linear')
          // .each("end", repeat);
      })()};
    });
};
