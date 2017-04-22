/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function timestamp(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  return Math.floor(seconds) + " seconds";
}

  




function createTweetElement(tweet) {
  //header stuff
  let $avatar = $('<img/>', { src: tweet.user.avatars.small }).addClass("avatar");
  let $username = $('<h3/>', { text: tweet.user.name }).addClass("username");
  let $handle = $('<span/>', { text: tweet.user.handle }).addClass("handle");
  let $header = $('<header/>').addClass("header");
  $header.append([$avatar, $username, $handle]);
  
  //icons
  let $footer = $('<footer/>').addClass("footer");
  let $star = $(`<i class='fa fa-star'></i>`);
  let $icons = $('<div/>').addClass("icons");
  //footer
  let $retweet = $('<i/>').addClass("fa fa-retweet");
  let $heart = $('<i/>').addClass("fa fa-heart");
  let $timestamp = $('<div/>', { text: timestamp(tweet.created_at)}).addClass("date");
  $footer.append([$icons, $timestamp]);
  $icons.append([$star, $retweet, $heart]);
  
  //tweet text
  let $ptag = $('<p>', { text: tweet.content.text }).addClass("p");
  let $tweetContent = $('<div>').addClass("tweet-content");
  let $ptweet = $('<div>').addClass("ptweet");
  $tweetContent.append([$ptag]);

  //entire article
  let $article = $('<article/>').addClass("tweet-article");
  $article.append([$header, $tweetContent, $footer]);


  return $article.get();
  
}

function renderTweets(tweets) {
  let tweetContainer = $('#tweets-container');
  tweetContainer.empty();
  tweets.forEach((tweet) => {
    var newTweetHtml = createTweetElement(tweet);
    tweetContainer.prepend(newTweetHtml);
  });
}

$(function() {
  let $compose = $("button");
  $compose.click(function() {
    $(".new-tweet").slideToggle(400, function(){
      $("form textarea").focus();
    });
  });
});

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (tweets) {
      renderTweets(tweets);
    }
  });
}
loadTweets();

$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $userinput = $("textarea").val();
    if(!($userinput)) {
      alert("Must enter valid Tweet");
    } else if ($userinput.length > 140) {
      alert("Exceeded 140 characters");
    } else {
      $tweet = $("textarea").serialize();
      $.ajax({
        url: '/tweets',
        data: $tweet,
        method: 'POST',
        success: function (tweet) {
          loadTweets();
        }
      });
    }
  });
});



