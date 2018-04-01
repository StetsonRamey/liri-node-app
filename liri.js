require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var inquirer = require("inquirer");

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


inquirer
    .prompt([

        // gather which task we'll be running
        {
            type: "list",
            message: "Please Pick One:",
            choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "type"
        }
    ])
    .then(function (inquirerResponse1) {

        // some testing / debugging
        console.log(process.argv);
        console.log(inquirerResponse1.type);

        // if my tweets task
        if (inquirerResponse1.type === "my-tweets") {

        }

        // if spotify task is picked
        else if (inquirerResponse1.type === "spotify-this-song") {
            inquirer
                .prompt ([
                    {
                        type: "input",
                        message: "What song do you want to search?",
                        name: "spotifySong"
                    }
                ])
                .then(function (inquirerResponse2) {
                    console.log(inquirerResponse2.spotifySong);
                });
        }

        // if movie task is picked
        else if (inquirerResponse1.type === "movie-this") {
            inquirer
                .prompt ([
                    {
                        type: "input",
                        message: "What movie do you want to search?",
                        name: "searchMovie"
                    }
                ])
                .then(function (inquirerResponse3) {
                    console.log(inquirerResponse3.searchMovie);
                });
        }

        // if do what it says task
        else if (inquirerResponse1.type === "do-what-it-says") {

        }
    });
