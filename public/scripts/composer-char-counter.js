$(document).ready(function() {

  $(".new-tweet form textarea").on("keyup", function(event) {
    let number = $(this).val().length;
    let counterLocation = $(this).parent().find(".counter");
    let charaCounter = counterLocation.text(140 - number);
    if (number >  140) {
      charaCounter.addClass('error');
    } else {
      charaCounter.removeClass('error');
    }

    $(".add-comment-btn").click(function(){
      $(this).next(".inline-comment-form").slideToggle(200)
        .find("textarea").focus();

      return false;
    });

  });

});