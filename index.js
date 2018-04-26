const twit = require("twit");

const config = require("./config.js");
const spoilers = require("./spoilers.js");
// console.log(spoliers);

let randomIndex = Math.floor(Math.random() * spoilers.length);

const twitter = new twit(config);
twitter
  .get("search/tweets", {
    q: "infinity OR avenger -filter:retweets",
    count: 1,
    result_type: "recent",
    lang: "en",
    tweet_mode: "extended"
  })
  .catch(function(err) {
    console.log("Caught Error", err.stack);
  })
  .then(function(result) {
    let tweet = result.data.statuses[0];
    let tweetID = tweet.id_str;
    let username = tweet.user.screen_name;
    // console.log(tweet.full_text);
    twitter.post(
      "statuses/update",
      {
        status: "@" + username + " " + spoilers[randomIndex],
        in_reply_to_status_id: tweetID
      },
      function(err, data, response) {
        if (err) {
          console.log("Caught Error", err.stack);
        }
        // console.log(data);
      }
    );
  });
