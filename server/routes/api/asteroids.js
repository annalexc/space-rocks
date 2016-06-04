var express = require('express');
var router = express.Router();
var Asteroid = require('../../models/asteroid');


// Get all Asteroids!
router.get('/', function(req, res, next){
  Asteroid.find({}).sort({createdAt: -1}).exec(function(err, asteroidData){
    console.log(asteroidData);
    if (err) {
      res.status(404).end();
    }else {
      res.json( asteroidData );
    }
  });
});



// Get a SINGLE Asteroid!
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  Asteroid.findById(id, function(err, response){
    if (err) {
      res.status(404).end();
    }else {
      res.json(response);
    };
  });
});


// Get all Asteroids by year!
router.get('/year/:year', function(req, res, next){
  var year = req.params.year;
  Asteroid.find({year: year}, function(err, response){
    if (err) {
      res.status(404).end();
    }else {
      res.json(response);
    };
  })
});


// POST a new Asteroid!
router.post('/', function(req, res, next){
  console.log(req.body);
  if (!req.body.asteroid) {
    res.status(422).end();
  }else {
    Asteroid.create(req.body.asteroid, function(err, asteroidData){
      res.json(asteroidData);
    });
  };
});



module.exports = router;
