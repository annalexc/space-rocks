// rocks = [
//   { "id": 3, "closest_approach": "Sun May 05 2013", "distance": 12000},
//   { "id": 1, "closest_approach": "Mon May 13 2013", "distance": 2000},
//   { "id": 2, "closest_approach": "Thu Jun 06 2013", "distance": 17000},
//   { "id": 4, "closest_approach": "Thu May 09 2013", "distance": 15000},
//   { "id": 5, "closest_approach": "Mon Jul 01 2013", "distance": 16000}
// ];

var asteroids;
var orbits;
var apiKey = 'CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5';
var apiLinkBase = 'https://api.nasa.gov/neo/rest/v1/'

// ?https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-05-23&end_date=2016-05-30&api_key=CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5

function getData(route, opt, callback){
  callback = callback || function(){};
  $.ajax({
    url: route,
    type: 'get',
    success: function(response){
      callback(response, opt);
    }
  });
};



function parseAsteroidData(asteroidData, callback){
  callback = callback || function(){console.log("No callback.");}
  asteroids = [];
  var neos = asteroidData.near_earth_objects;
  // Iterate through the asteroid data array
  for(var key in neos){
    // console.log(neos[key][0].length);
    // console.log("neos." + key + " = " + neos[key]);
    for(var i = 0; i < neos[key].length; i++){
      asteroids.push({
        "name"  : neos[key][i].name,
        "neo_reference_id" : neos[key][i].neo_reference_id,
        "api_link" : neos[key][i].links.self,
        "closest_approach" : key,
        "absolute_magnitude_h" : neos[key][i].absolute_magnitude_h,
        "estimated_diameter"  : (neos[key][i].estimated_diameter.kilometers.estimated_diameter_min + neos[key][i].estimated_diameter.kilometers.estimated_diameter_max)/2,
        "kilometers_per_second": parseInt(neos[key][i].close_approach_data[0].relative_velocity.kilometers_per_second),
        "miss_distance" : parseInt(neos[key][i].close_approach_data[0].miss_distance.lunar)
      });
    };
  };

  callback();
};

// function createAsteroidArray(obj, key, index, orbitData){
//   // console.log(index);
//   // console.log(obj[key], "53");
  
//   // debugger
//   asteroids.push({
//     "name"  : obj[key][index].name,
//     "closest_approach" : key,
//     "absolute_magnitude_h" : obj[key][index].absolute_magnitude_h,
//     "estimated_diameter"  : (obj[key][index].estimated_diameter.kilometers.estimated_diameter_min + obj[key][index].estimated_diameter.kilometers.estimated_diameter_max)/2,
//     "kilometers_per_second": parseInt(obj[key][index].close_approach_data[0].relative_velocity.kilometers_per_second),
//     "miss_distance" : parseInt(obj[key][index].close_approach_data[0].miss_distance.lunar),
//     "orbital_data" : orbitData
//   });
// };

// console.log(i,"34");


      // getData('https://api.nasa.gov/neo/rest/v1/neo/'+neos[key][i].neo_reference_id+"?api_key="+apiKey, i, function(response, i){
        
      //   orbitData = response.orbital_data;

      //   console.log(neos[key][i].neo_reference_id, neos[key][i].name, orbitData );
      //   // console.log(index,"37");
      //   createAsteroidArray(neos, key, i, orbitData);
      // });     



function parseOrbitData(){
  orbits = [];
  console.log(asteroids);
  for(var i = 0; i < asteroids.length; i++){
  };
};
