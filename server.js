var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var db = require('./models');

app.use(express.static('public'));

var controllers = require('./controllers');

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function(req, res){
  res.json({
    info: "Welcome to PodMe API. Here you can find some information about the different endpoints and methods that are supported.",
    gitHub_url: "https://github.com/klawton1/Podme",
    homepage: "https://podme.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/podlist", description: "find all podlists"}
    ]
  })
});

app.get('/api/podlists', controllers.podlist.index)

app.get('/api/podcasts', controllers.podcast.index)

app.get('/api/podlists/:id', controllers.podlist.find)

app.get('/api/podlists/:id/podcasts', controllers.podlist.findPodcasts)

app.post('/api/podlists', controllers.podlist.create)

app.post('/api/podlists/:id/podcasts', controllers.podcast.addToPodlist)

app.put('/api/podlists/:id', controllers.podlist.edit)

app.delete('/api/podlists/:id', controllers.podlist.remove)

app.delete('/api/podlists/:id/podcasts/:podcast_id', controllers.podcast.removeFromPodlist)










app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});