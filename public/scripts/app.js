$(document).ready(function() {

  /* The escape function takes in a string and returns one that has had things like
  <script> etc converted to literal text.  This prevents malicious users from enterting
  scipts into text input areas. */

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
  }

  /* The function modifyTimeStamp takes in a timeStamp and returns a string that contains
  the amount of time passed in hours, or days if it has been at least a day. */

  function modifyTimeStamp(tweetTime) {

    let outputString = "";

    let now = new Date();
    let currentTime = now.getTime();
    let modifiedTime = currentTime - tweetTime;
    modifiedTime = modifiedTime / 1000;
    modifiedTime = modifiedTime / 60;
    let timeInHours = modifiedTime / 60;
    let timeInDays = timeInHours / 24;

    if (Math.floor(timeInDays) === 0) {
      if (Math.round(timeInHours) === 1) {
        outputString = Math.round(timeInHours) + " hour ago";
      } else {
          outputString = Math.round(timeInHours) + " hours ago";
      }
    } else {
      if (Math.round(timeInDays) === 1) {
          outputString = Math.round(timeInDays) + " day ago";
      } else {
          outputString = Math.round(timeInDays) + " days ago";
      }
    }

    return outputString;
  }

  /* The function createTweetElement takes in a tweet (json format) and returns an html
  element ($tweet) that has had all the data from the tweet converted into the appropriate
  html elements. */

  function createTweetElement(tweet) {

    let $tweet = $("<article>").addClass("tweet");
    let $tweetHead = $("<div>").addClass("tweetHeader");
    let $userName = $("<p>").addClass("userName").html(tweet["user"]["name"]);
    let $image = $("<img>").attr("src", tweet["user"]["avatars"]["regular"]);
    let $avatar = $("<div>").addClass("avatar");
    let $handle = $("<div>").addClass("handle").html(tweet["user"]["handle"]);
    let $tweetContent = $("<p>").addClass("someTweet").html(escape(tweet["content"]["text"]));
    let $tweetDate = $("<footer>").addClass("footer").html(modifyTimeStamp(tweet["created_at"]));
    let $likeBar = $("<div>").addClass("likeBar");
    let $likeBarImage = $("<img>").attr("src", "/images/likeFlagShare.png");
    let $line = $("<section>").html("<hr>");

    $avatar.append($image);
    $tweetHead.append($avatar);
    $tweetHead.append($userName);
    $tweetHead.append($handle);
    $tweet.append($tweetHead);
    $tweet.append($tweetContent);
    $tweet.append($line);
    $tweet.append($tweetDate);
    $likeBar.append($likeBarImage);
    $tweet.append($likeBar);

    return $tweet;
  }

/* The function renderTweets takes in an array of tweets (JSON format) and calls
createTweetElement for each tweet in the array, then appends each tweet to the
main Container.  */

  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      let $currentTweet = createTweetElement(tweets[i]);
      $("#mainContainer").append($currentTweet);
    }
  }

/*
*
* The function loadTweets uses ajax to load all the tweets from the mongo database
*
*/
  function loadTweets() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        renderTweets(tweets);
      }
    });
  }

  /* The following bit of code reveals the tweet compose form, if the user
  clicks on the compose button or the pencil image. */



  let input = $('#textTweet');

  $('#nav-bar .pencil').on('click', function() {
    if ( $('.new-tweet').is (":hidden") ) {
      $('.new-tweet').slideDown( "slow" );
      input.focus();
    } else {
      $( ".new-tweet").slideUp( "slow" );
    }
  });

  $('#nav-bar .compose').on('click', function() {
    if ( $( '.new-tweet').is (":hidden") ) {
      $( '.new-tweet').slideDown( "slow" );
      input.focus();
    } else {
      $( ".new-tweet").slideUp( "slow ");
    }
  });

//
//  New tweet form submit handler
//

  $('.new-tweet form').on('submit', function(event) {

    event.preventDefault();
    let inputText = $("#textTweet");
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
            let $newTweet = createTweetElement(tweets[tweets.length - 1]);
            $("#mainContainer").append($newTweet);
          }
        })
      }
    })
    inputText.val("");
    $('#counter').html(140);
  });

  /* Here the code makes the username bold and revelas the like / share / flag image,
     when the user moves the mouse over indivdual tweets. */


  $("#mainContainer").on({
    mouseenter: function() {
      $(this).find(".userName").css("font-weight", "bold");
      $(this).find(".likeBar img").css("visibility", "visible");
  },
    mouseleave: function() {
      $(this).find(".userName").css("font-weight", "normal");
      $(this).find(".likeBar img").css("visibility", "hidden");
    }
  }, ".tweet")

//
// Here it loads the inital tweets on the first webpage load
//

  loadTweets();

});