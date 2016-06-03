function parseAsteroidData(data, callback){
  callback = callback || function(){}

  // Empty asteroidData array
  // asteroidData = [];
  var neos = data.near_earth_objects;
  // Iterate through the asteroid data array
  for(var key in neos){
    for(var i = 0; i < neos[key].length; i++){
      var checkId = asteroidData.map(function(x){return x.neo_reference_id; }).indexOf(neos[key][i].neo_reference_id);
      if ((parseFloat(neos[key][i].close_approach_data[0].miss_distance.lunar) <= 1) && checkId < 0){
        asteroidData.push({
          "name"  : neos[key][i].name,
          "year" : key.substr(0,4),
          "neo_reference_id" : neos[key][i].neo_reference_id,
          "url" : neos[key][i].nasa_jpl_url,
          "api_link" : neos[key][i].links.self,
          "closest_approach" : key,
          "potentially_hazardous" : neos[key][i].is_potentially_hazardous_asteroid,
          "absolute_magnitude_h" : neos[key][i].absolute_magnitude_h,
          "estimated_diameter"  : (neos[key][i].estimated_diameter.kilometers.estimated_diameter_min + neos[key][i].estimated_diameter.kilometers.estimated_diameter_max)/2,
          "kilometers_per_second": parseFloat(neos[key][i].close_approach_data[0].relative_velocity.kilometers_per_second),
          "miss_distance" : parseFloat(neos[key][i].close_approach_data[0].miss_distance.lunar),
          "orbital_data"  : new Array
        })
      };
    };
  };
  console.log(asteroidData);
  callback();
};

function parseOrbitData(){
  for(var i = 0; i < asteroidData.length; i++){
    getData(asteroidData[i].api_link, function(response){
      var orbitData = {
        neo_reference_id : response.neo_reference_id,
        orbital_data : response.orbital_data
      };
      combineAsteroidOrbitData(orbitData);
    });
  };
};

function combineAsteroidOrbitData(data){
  for(var i = 0; i < asteroidData.length; i++){
    var neoId = asteroidData[i].neo_reference_id;
    if(data.neo_reference_id == neoId && asteroidData[i].orbital_data.length == 0){
      asteroidData[i].orbital_data.push(data.orbital_data);
    };
  };
};
