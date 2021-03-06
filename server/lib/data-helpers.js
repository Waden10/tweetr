"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
   saveTweet: function(newTweet, callback) {
     console.log("save method");
      db.collection("tweets").insertOne(newTweet, (err, res) => {
        if (err) {
          return callback(err);
        }
        callback(null, res);
      });
    },



    // Get all tweets in `db`, sorted by newest first
   getTweets: function(callback) {
   
      db.collection("tweets").find().toArray((err, tweet) => {
        if (err) {
          return callback(err);
        } else {
          callback(null, tweet);
        }
    });
    }
  };
};
