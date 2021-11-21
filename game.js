"use strict";

let gamePattern = [];

let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let gameStarted = false;

// Handlers

$(".btn").click(function () {
  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animateClass(userChosenColour, "pressed");
  console.log(`User pattern: ${userClickedPattern}`);

  checkAnswer(userClickedPattern.length - 1);
});

// Functions

const checkAnswer = function (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Right");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound(`wrong`);
    animateClass("body", "game-over");
    gameOver();
    startOver();
  }
};

const animateClass = function (item, whatClass) {
  $(`#${item}`).addClass(`${whatClass}`);
  setTimeout(function () {
    $(`#${item}`).removeClass(`${whatClass}`);
  }, 200);
};

const playSound = function (name) {
  const buttonSound = new Audio(`sounds/${name}.mp3`);
  buttonSound.play();
  buttonSound.volume = 0.025;
};

const gameOver = function () {
  $("h1").text(`Game Over.
   Press Any Key to Restart`);
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
};

const nextSequence = function () {
  level++;
  userClickedPattern = [];
  // set level at start of sequence
  $("h1").text(`Level ${level}`);
  // generate random patern and animate + sound
  const randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  console.log(`Game pattern: ${gamePattern}`);

  $(`.${randomChosenColour}`)
    .animate({ opacity: 0 }, "fast")
    .animate({ opacity: 1 }, "fast");

  playSound(randomChosenColour);
};

// Running

// Initialization
$(document).on("keydown", function (e) {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

// setTimeout(function () {
//   nextSequence();
// }, 1000);
