/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function() {

  $('.tweet').hover(function(){

    $('.userName').toggleClass("hovered");

  });

  function createTweetElement(tweet) {

    let $tweet = $("<article>").addClass("tweet");
    let $tweetHead = $("<div>").addClass("tweetHeader");
    let $userName = $("<p>").addClass("userName").html(tweet["user"]["name"]);
    let $tweetContent = $("<section>").addClass("someTweet").html(tweet["content"]["text"]);
    let $tweetDate = $("<footer>").addClass("footer").html(tweet["created_at"]);
    let $line = $("<section>").html("<hr>");


    $tweetHead.append($userName);
    $tweet.append($tweetHead);

    $tweet.append($tweetContent);
    $tweet.append($line);
    $tweet.append($tweetDate);

    return $tweet;

  }

  function renderTweets(tweets) {

    for (let i = 0; i < tweets.length; i++) {

      let $currentTweet = createTweetElement(tweets[0]);

      $("#mainContainer").append($currentTweet);

    }

  }

  let $tweet = createTweetElement(tweetData);

  console.log($tweet);

  $("#mainContainer").append($tweet);

});



