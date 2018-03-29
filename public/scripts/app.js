/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.tweet').hover(function(){

    $('.userName').toggleClass("hovered");

  });


  $('.new-tweet form').on('submit', function(event) {

    event.preventDefault();

    let inputString = $("#textTweet").val();
    let inputSerial = $("#textTweet").serialize();

    if (inputString.length === 0) {

      alert("Error:  Your tweet is empty!  Please add some text to your tweet :)");
      return;
    }

    if (inputString.length > 140) {

      alert("Error:  Your tweet is too long!  Please keep your tweet to 140 characters or less!");
      return;
    }

    $.ajax({

      url: '/tweets',
      method: 'POST',
      data: inputSerial,
      success: function (){


        $.ajax({
         url: '/tweets',
         method: 'GET',
         success: function (tweets) {

        console.log(tweets.length -1);

        let $newTweet = createTweetElement(tweets[tweets.length - 1]);
           //console.log($newTweet);
           $("#mainContainer").append($newTweet);
         }
       })
      }
    })
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

      let $currentTweet = createTweetElement(tweets[i]);

      $("#mainContainer").append($currentTweet);

    }

  }

  function loadTweets() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        //console.log(tweets);
        renderTweets(tweets);
      }

    });
  }

  loadTweets();

});



