var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/podme");
var User = require("./user");
var Podlist = require("./podlist");
var Podcast = require("./podcast");

module.exports.Podcast = Podcast;
module.exports.User = User;
module.exports.Podlist = Podlist;