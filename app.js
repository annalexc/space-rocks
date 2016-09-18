var express         = require('express'),
    morgan          = require('morgan'),
    path            = require('path'),
    mongoose        = require('mongoose'),
    app             = express(),  
    apiAsteroidRouter = require('./server/routes/api/asteroids.js');

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/spacerocks" );

app.set('views', path.join(__dirname, 'client/views'));

app.use(morgan('dev'));

// Set static file root folders
app.use(express.static('client'));
app.use(express.static('bower_components'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/views/index.html');
});


app.use('/api/asteroids', apiAsteroidRouter);

app.get("/data/:file", function(req, res){
  console.log("Sending " + req.params.file );
  res.sendFile( path.resolve( __dirname + "/data/" + req.params.file ) );
});


// process.env.PORT is needed for when we deploy to Heroku
var port = process.env.PORT || 3000;
app.listen( port, function() {
  console.log("3000!");
});
