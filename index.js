
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];


var started = false;
var level = 0;

$(document).keydown(function() {

  if (!started) {
    nextSequence();
    $("#level-title").html("Level " + level);
    started = true;
  }
});

function nextSequence() {
  userChosenColor = [];
  level++;

  // Inside nextSequence(), updating the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNo =Math.floor(Math.random() * 4);

  var randomChoosenColor = buttonColors[randomNo];
  gamePattern.push(randomChoosenColor);
  var x = "#" + randomChoosenColor;
  $(x).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChoosenColor);
}

//function for playing the sound
function sound(x) {
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
}

$(".btn").click(function() {
  var chosenColor = $(this).attr("id");
  userChosenColor.push(chosenColor);
  sound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(userChosenColor.length - 1);
});

//for animating the button
function animatePress(x) {
  $("#" + x).addClass("pressed");
  setTimeout(function() {
    $("#" + x).removeClass("pressed");
  }, 100);
}


//Creation a new function called checkAnswer(), it takes one input with the name currentLevel
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userChosenColor[currentLevel]) {
    if (userChosenColor.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    sound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over!!<br>Press any key to continue");
    startOver();
  }

}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
