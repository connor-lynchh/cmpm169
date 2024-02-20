// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let angleX = 0;
let angleY = 0;
let prevMouseX;
let prevMouseY;
let dragging = false;

let ball;
let leftPaddle, rightPaddle;
let ballSpeed;
let maxBallSpeed;
let ballDirection;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ball = new Ball();
  leftPaddle = new Paddle(-windowWidth / 4);
  rightPaddle = new Paddle(windowWidth / 4);
  ballSpeed = 5;
  maxBallSpeed = 15; // Set a maximum speed for the ball
  ballDirection = createVector(1, random(-1, 1));
  noStroke(); // Add this line to remove the lines from all shapes
}

function draw() {
  background(51);


  if (dragging) {
    angleY += (mouseX - prevMouseX) * 0.01;
    angleX += (mouseY - prevMouseY) * 0.01;
  }
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  
  push();
  rotateX(angleX);
  rotateY(angleY);


  // Draw and update the paddles
  leftPaddle.update(ball);
  rightPaddle.update(ball);
  leftPaddle.display();
  rightPaddle.display();

  // Draw and update the ball
  ball.update();
  ball.display();

  // Check for collision with paddles
  if (ball.x > rightPaddle.x - rightPaddle.width / 2 && ball.y < rightPaddle.y + rightPaddle.height / 2 && ball.y > rightPaddle.y - rightPaddle.height / 2) {
    ballDirection.x *= -1;
    ballSpeed = min(maxBallSpeed, ballSpeed * 1.1); // Increase ball speed without exceeding max
    ball.changeColor(); // Change the color of the ball
  } else if (ball.x < leftPaddle.x + leftPaddle.width / 2 && ball.y < leftPaddle.y + rightPaddle.height / 2 && ball.y > leftPaddle.y - rightPaddle.height / 2) {
    ballDirection.x *= -1;
    ballSpeed = min(maxBallSpeed, ballSpeed * 1.1); // Increase ball speed without exceeding max
    ball.changeColor(); // Change the color of the ball
  }
}


function mousePressed() {
    dragging = true;
  }
  
  function mouseReleased() {
    dragging = false;
  }

// Ball class
class Ball {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.diameter = 50;
    this.color = color(random(255), random(255), random(255)); // Initial random color
  }

  update() {
    this.x += ballDirection.x * ballSpeed;
    this.y += ballDirection.y * ballSpeed;
    

    // Bounce off top and bottom
    if (this.y > height / 2 - this.diameter / 2 || this.y < -height / 2 + this.diameter / 2) {
      ballDirection.y *= -1;
    }
  }

  changeColor() {
    // Change to a new random color
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    push();
    translate(this.x, this.y);
    //stroke(255);
    //strokeWeight(0.1);
    fill(this.color);
    sphere(this.diameter / 2);
    pop();
  }
}

// Paddle class
class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = 20;
    this.height = 200;
    
  }

  update(ball) {
    // Move the paddle towards the ball's y position within the canvas bounds
    let targetY = ball.y;
    targetY = constrain(targetY, -height / 2 + this.height / 2, height / 2 - this.height / 2);
    
    if (targetY > this.y) {
      this.y += 5;
    } else if (targetY < this.y) {
      this.y -= 5;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 0, 0); // Set the fill color to red
    stroke(255); // Set the stroke color to white
    strokeWeight(2); // Set the stroke weight (outline thickness)
    box(this.width, this.height, 20);
    pop();
  }
}