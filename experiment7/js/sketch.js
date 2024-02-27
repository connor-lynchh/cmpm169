// sketch.js - purpose and description here
// Author: Connor Lynch
// Date:2/19/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Constants - User-serviceable parts

let currentJoke = ''; // The current joke to display
let displayText = ''; // The text that's currently being displayed
let jokeIndex = 0; // Index of the next character to show in the joke
//let jokeIsReady = false; // Flag to know if a new joke is ready to be animated
let jokeCount = 0;
let jokes = [];
let displayTexts = [];
let jokeIndices = [];
let jokeIsReady = [];
let moveCounter = 0; // Counter for button moves
let buttonPressed = false;

function setup() {
  let cnv = createCanvas(1000, 300);
  cnv.parent('canvas-container');
  textSize(16);
  noLoop();
}

function draw() {
  background(255);

  for (let i = 0; i < jokes.length; i++) {
    if (jokeIsReady[i]) {
      if (jokeIndices[i] < jokes[i].length) {
        displayTexts[i] += jokes[i][jokeIndices[i]++];
      } else {
        jokeIsReady[i] = false;
      }
    }
    fill(0);
    text(displayTexts[i] || '', 10, i * 60 + 50);
  }

  fill(0);
  text(`Jokes fetched: ${jokeCount}`, 10, height - 10);
}

function fetchJoke() {
  // Reset jokes
  jokes = [];
  displayTexts = [];
  jokeIndices = [];
  jokeIsReady = [];


    // Add a class to the button to show the spinner
  $('#fetchJokeBtn').addClass('loading').text('Fetching...');

  for (let i = 0; i < 3; i++) {
    $.ajax({
      url: 'https://icanhazdadjoke.com/',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      success: function(data) {
        jokes.push(data.joke);
        displayTexts.push('');
        jokeIndices.push(0);
        jokeIsReady.push(true);

        jokeCount++;
        if (jokes.length === 3) {
          // Delay the removal of the spinner and starting of the loop
          setTimeout(function() {
            $('#fetchJokeBtn').removeClass('loading').text('Fetch Jokes');
            loop();
          }, 4000); // Adjust the timeout duration (in milliseconds) as needed
        }
      },
      error: function(xhr, status, error) {
        console.error('Error fetching dad joke:', error);
      }
    });
  }
}

function moveButton() {
  if (moveCounter < 10) {
    const newX = Math.floor(Math.random() * (width - 100));
    const newY = Math.floor(Math.random() * (height - 100));
    $('#fetchJokeBtn').css({ top: newY + 'px', left: newX + 'px' });
    moveCounter++;
  }
}

function resetButton() {
  $('#fetchJokeBtn').css({ top: 'initial', left: 'initial' });
  moveCounter = 0;
  buttonPressed = false;
}

$(document).ready(function() {
  $('#fetchJokeBtn').mouseover(function() {
    if (!buttonPressed) {
      moveButton();
    }
  });

  $('#fetchJokeBtn').click(function() {
    if (moveCounter >= 10) {
      let password = prompt("Enter the password to see dad jokes:");
      if (password !== null && password.trim() !== "") {
        fetchJoke();
        resetButton();
      }
    }
  });
});
