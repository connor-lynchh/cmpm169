// sketch.js - Experiment 4 Images, Video, and Sound Art
// Author: Connor Lynch
// Date: 2/5/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-serviceable parts
// In a longer project, I like to put these in a separate file

let cubVid; // Variable to hold the video capture
let x, y; // Variables for the position of the video feed
let xspeed, yspeed; // Variables for the speed of the video feed
let videoColor; // Variable for the current color of the video feed
let gong; // Variable for the ding sound
let maxSpeed = 10;  // Maximum speed
let minSpeed = 3;   // Minimum speed
let acceleration = 1.1;  // Acceleration rate
let deceleration = 0.9;  // Deceleration rate
let speedingUp = true;   // Flag to determine if we are speeding up or slowing down

function preload() {
  // Load the ding sound here
  soundFormats('mp3','ogg');
  // Make sure to have a "ding.mp3" file in your project directory, or change the filename as needed
  gong = loadSound('js/gong_sound.mp3');
}

function setup() {
  createCanvas(2440, 1440); // Set the canvas size
  cubVid = createCapture(VIDEO); // Start capturing video from the webcam
  cubVid.hide(); // Hide the actual video element

  // Initialize position to the center of the canvas
  x = width / 2;
  y = height / 2;

  // Initialize speed for both directions
  xspeed = 3;
  yspeed = 3;

  // Initialize the video feed color to white
  videoColor = color(100,1);
}

function draw() {
  background(0); // Set the background to black

  // Draw the video feed as an image tinted with the current color
 // Force a constant color tint for testing purposes

 image(cubVid, x, y, 320, 240);
 

 fill(videoColor);
  noStroke();
  rect(x, y, 320, 240);

  
  // Update the position of the video feed
  x += xspeed;
  y += yspeed;

  // Check for canvas borders and change direction if needed
  if (x > width - 320 || x < 0) {
    xspeed *= -1;
    adjustSpeed('x');
    changeColor();
    checkCorner();
  }

  if (y > height - 240 || y < 0) {
    yspeed *= -1;
    adjustSpeed('y');
    changeColor();
    checkCorner();
  }
}

// Function to change the color of the video feed randomly
function changeColor() {
  videoColor = color(random(255), random(255), random(255),100);
  console.log("Color changed to:", videoColor.toString()); // This will log the color to the console
 // tint(videoColor); 
}

// Function to check if the video feed hits one of the corners
function checkCorner() {
  if ((x <= 0 && y <= 0) || (x >= width - 320 && y <= 0) || (x <= 0 && y >= height - 240) || (x >= width - 320 && y >= height - 240)) {
    gong.play(); // Play the ding sound
  }
}

function adjustSpeed(axis) {
    if (speedingUp) {
      if (axis === 'x') {
        xspeed *= acceleration;
        if (Math.abs(xspeed) > maxSpeed) speedingUp = false;
      } else {
        yspeed *= acceleration;
        if (Math.abs(yspeed) > maxSpeed) speedingUp = false;
      }
    } else {
      if (axis === 'x') {
        xspeed *= deceleration;
        if (Math.abs(xspeed) < minSpeed) speedingUp = true;
      } else {
        yspeed *= deceleration;
        if (Math.abs(yspeed) < minSpeed) speedingUp = true;
      }
    }
  }