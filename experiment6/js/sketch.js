// sketch.js - purpose and description here
// Author: Connor Lynch
// Date:2/19/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let words = [];
let wordSets;
let currentSetIndex = 0;
let lastChangeTime = 0;
const changeInterval = 10000; // 10 seconds in milliseconds
let setColors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(30);

  // Define the colors for each set of words
  setColors = [
    color(255, 229, 204), // Morning: Light Orange
    color(255, 255, 204), // Afternoon: Light Yellow
    color(204, 229, 255), // Evening: Light Blue
    color(224, 176, 255), // Night: Mauve (purpleish)
    color(224, 224, 224)  // Sleep: Light Gray
  ];

  // Define the sets of words for different times of day
  wordSets = [
    ["SLEEPY", "TIRED", "WAKING", "LAZY"],
    ["HUNGRY", "ANXIOUS", "RELUCTANT", "IRRITATED"],
    ["STUDY", "WORK", "TRAIN", "DRAINED"],
    ["TIRED", "STRESSED", "OVERWHELMED", "HUNGRY", "OPTIMISTIC"],
    ["SLEEP"]
  ];

  // Record the initial time
  lastChangeTime = millis();
}

function draw() {
  background(255);
  strokeWeight(3);
  
  // Check the time and update the current set of words if necessary
  if (millis() - lastChangeTime > changeInterval) {
    currentSetIndex = (currentSetIndex + 1) % wordSets.length;
    lastChangeTime = millis();
  }

  // Add a new word at a random x position at the top of the canvas
  if (frameCount % 10 == 0) { // This controls the rate of new words appearing
    let newWord = new Word(random(wordSets[currentSetIndex]), random(windowWidth), 0, setColors[currentSetIndex]);
    words.push(newWord);
  }
  
  // Update and display words
  for (let i = words.length - 1; i >= 0; i--) {
    words[i].update();
    words[i].display();
    
    // Remove the word if it's off the bottom of the canvas
    if (words[i].y > windowHeight) {
      words.splice(i, 1);
    }
  }
}

// Word class
class Word {
  constructor(text, x, y, color) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.textSize = 30;
    this.speed = random(2, 5); // Random speed for falling effect
    this.color = color; // Set the background color based on the word set
  }
  
  update() {
    this.y += this.speed; // Move the word down
  }
  
  display() {
    let w = textWidth(this.text) + 50;
    fill(this.color);
    rect(this.x, this.y, w, 50, 50);
    textSize(this.textSize);
    fill(0); // Text color is black for contrast
    text(this.text, this.x + 25, this.y + 35);
  }
}
