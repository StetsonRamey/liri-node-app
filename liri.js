require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


