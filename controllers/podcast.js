var db = require('../models');

function index(req, res){
  db.Podcast.find({}, function(err, podcasts){
    if(err){console.log(err);}
    res.json(podcasts);
  })
};

function addToPodlist(req, res){
  var id = req.params.id;
  var info = req.body;
  db.Podlist.findOne({_id: id}, function(err, podlist){
    if(err){console.log(err);}
    db.Podcast.find(info, function(err, podcast){
      if(err){console.log(err);}
      if(podcast.length){
        console.log("FOUND PODCAST TO ADD TO PODLIST",podcast);
        podlist.podcasts.push(podcast);
        podlist.save(function(err, podlist){
          console.log("SAVED PODLIST",podlist);
          res.json(podlist);
        });
      }else{
        var podcast = new db.Podcast(info);
        console.log("New Podcast Info",info);
        podcast.save(function(err, podcast){
          if(err){console.log(err);}
          podlist.podcasts.push(podcast);
          podlist.save(function(err, podlist){
          console.log("SAVED PODLIST",podlist);
          res.json(podlist);
        });
        })
      }
    })
  })
}

function removeFromPodlist(req, res){
  var id = req.params.id;
  var podcast_id = req.params.podcast_id
  db.Podlist.findOne({_id:id}, function(err, podlist){
    var podcasts = podlist.podcasts;
    if(err){console.log(err);}
    for(var i=0; i < podcasts.length; i++){
      console.log("PODCAST",typeof(podcasts[i]), " ", "ID:", typeof(podcast_id));
      if(String(podcasts[i]) === podcast_id){
        podcasts.splice(i, 1);
        console.log("DELETED ONE!", podlist.podcasts);
        podlist.save(function (err, podlist){  
          res.json(podlist);
        })
      }
    }
  })
}

module.exports = {
  index: index,
  addToPodlist: addToPodlist,
  removeFromPodlist: removeFromPodlist
}