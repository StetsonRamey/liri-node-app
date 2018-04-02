require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var inquirer = require("inquirer");
var fs = require("fs");

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

        // if my tweets task
        if (inquirerResponse1.type === "my-tweets") {
            client.get('statuses/user_timeline', function (error, tweets, response) {
                if(error) throw error;
                for (let i = 0; i < tweets.length && tweets.length <= 20; i++) {
                    console.log("\nTweet #" + (i+1));
                    console.log(JSON.stringify(tweets[i].text, null, 2));
                    console.log("\n-----------------");
                }
            });
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
                    if (inquirerResponse2.spotifySong != "") {
                        spotify.search(
                            {
                            type: "track",
                            query: inquirerResponse2.spotifySong,
                            limit: 3
                            },
                            function (error, data) {
                                if (!error) {
                                    // artist(s)
                                    console.log("--------------------------------------\n");
                                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                    // Song name
                                    console.log("Track Name: " + data.tracks.items[0].name);
                                    // preview link
                                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                                    // album
                                    console.log("Album: " + data.tracks.items[0].album.name);
                                    console.log("\n--------------------------------------\n");
                                }
                                else {
                                    console.log("it's f-ed: " + error);
                                }
                            });
                    }
                    else {
                        spotify.request("https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc")
                            .then(function (data) {
                                // artist(s)
                                console.log("--------------------------------------\n");
                                console.log("Artist: " + data.artists[0].name);
                                // Song name
                                console.log("Track Name: " + data.name);
                                // preview link
                                console.log("Preview Link: " + data.preview_url);
                                // album
                                console.log("Album: " + data.album.name);
                                console.log("\n--------------------------------------\n");
                            })
                            .catch(function (error) {
                                console.log("it's f-ed: " + error);
                            });
                    }
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
                    if (inquirerResponse3.searchMovie != "") {
                       // set the queryURL
                        var queryUrl = "http://www.omdbapi.com/?t=" + inquirerResponse3.searchMovie + "&apikey=trilogy";
                        console.log(queryUrl);

                        request(queryUrl, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                console.log("--------------------------------------\n");
                                console.log("Title: " + JSON.parse(body).Title);
                                console.log("Release Year: " + JSON.parse(body).Year);
                                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                                // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating[0]);
                                console.log("Country Where Produced: " + JSON.parse(body).Country);
                                console.log("Language: " + JSON.parse(body).Language);
                                console.log("Plot: " + JSON.parse(body).Plot);
                                console.log("Actors: " + JSON.parse(body).Actors);
                                console.log("\n--------------------------------------");
                            }
                            else {
                                console.log("it's f-ed: " + error);
                            }
                        }); 
                    }
                    else {
                        // set the queryURL
                        var queryUrl = "https://www.omdbapi.com/?t=mr+nobody&apikey=trilogy";
                        console.log(queryUrl);

                        request(queryUrl, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                console.log("--------------------------------------\n");
                                console.log("Title: " + JSON.parse(body).Title);
                                console.log("Release Year: " + JSON.parse(body).Year);
                                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                                // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating[0]);
                                console.log("Country Where Produced: " + JSON.parse(body).Country);
                                console.log("Language: " + JSON.parse(body).Language);
                                console.log("Plot: " + JSON.parse(body).Plot);
                                console.log("Actors: " + JSON.parse(body).Actors);
                                console.log("\n--------------------------------------");
                            }
                            else {
                                console.log("it's f-ed: " + error);
                            }
                        }); 
                    }
                });
        }

        // if do what it says task
        else if (inquirerResponse1.type === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {
               if (error) {
                console.log("it's f-ed: " + error);
               } 
               var output = data.split(",");

            //    from here split spotify-this into a function and call that function here
            // because I have this in an inquirer, I'd have to do some other stuff to it too, like store the second place in that array directly to the inquirerResponse2 variable

            // OR JUST DO THIS

            spotify.search(
                {
                type: "track",
                query: output[1],
                limit: 3
                },
                function (error, data) {
                    if (!error) {
                        // artist(s)
                        console.log("--------------------------------------\n");
                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                        // Song name
                        console.log("Track Name: " + data.tracks.items[0].name);
                        // preview link
                        console.log("Preview Link: " + data.tracks.items[0].preview_url);
                        // album
                        console.log("Album: " + data.tracks.items[0].album.name);
                        console.log("\n--------------------------------------\n");
                    }
                    else {
                        console.log("it's f-ed: " + error);
                    }
                });
            });
        }
    });
