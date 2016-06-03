var mongoose = require('mongoose');

var AsteroidSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  neo_reference_id: { type: String, required: true },
  url: { type: String, required: true },
  api_link: { type: String, required: true },
  closest_approach: { type: String, required: false },
  potentially_hazardous: { type: Boolean, required: false },
  absolute_magnitude_h: { type: Number, required: false },
  estimated_diameter: { type: Number, required: false },
  kilometers_per_second: { type: Number, required: false },
  miss_distance: { type: String, required: false },
  orbital_data: { type: Array, required: false }
  }, { timestamps: true });

module.exports = mongoose.model('Asteroid', AsteroidSchema);

// ************************ //
// ***** EXAMPLE DATA ***** //
// ************************ //

// {"name":"(2016 AQ164)",
// "neo_reference_id":"3739965",
// "url":"http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3739965",
// "api_link":"https://api.nasa.gov/neo/rest/v1/neo/3739965?api_key=CGuQueDNtud5hWODnVj9El7kwfizD8Ql2XqEz3s5",
// "closest_approach":"2016-01-10",
// "potentially_hazardous":false,
// "absolute_magnitude_h":29.8,
// "estimated_diameter":0.0047156614,
// "kilometers_per_second":14.1550153122,
// "miss_distance":0.2714633048,
// "orbital_data":{"orbit_id":"2","orbit_determination_date":"2016-02-25 17:12:52","orbit_uncertainty":"8","minimum_orbit_intersection":".000666723","jupiter_tisserand_invariant":"3.702","epoch_osculation":"2457400.5","eccentricity":".5776138327563798","semi_major_axis":"1.916402704291666","inclination":"5.297667771878435","ascending_node_longitude":"289.902695404191","orbital_period":"969.0107374373287","perihelion_distance":".8094619931610657","perihelion_argument":"120.7086396784628","aphelion_distance":"3.023343415422266","perihelion_time":"2457358.362382953606","mean_anomaly":"15.65466877778838","mean_motion":".3715129111490194","equinox":"J2000"}},

