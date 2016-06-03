var express = require('express');
var router = express.Router();
var Asteroid = require('../../models/asteroid');


// GET ALL THE Asteroids!
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



// GET A SINGLE Asteroid!
router.get('/:id', function(req, res, next){
  var id = req.params.id;
  console.log(id);
  Asteroid.findById(id, function(err, response){
    if (err) {
      res.status(404).end();
    }else {
      res.json(response);
    }
  })
});



// POST NEW Asteroid!
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



// DELETE
router.delete('/:id', function(req, res, next){
  var id = req.params.id;
  Asteroid.findByIdAndRemove(id, function(err){
    if (err) {
      res.status(500).end();
    }else {
      res.status(204).end();
    }
  })
});


module.exports = router;
