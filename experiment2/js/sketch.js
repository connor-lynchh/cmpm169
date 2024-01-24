// sketch.js - Experiment 2 
// Author: Connor Lynch
// Date: 1/21/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// KEYS
// 1-7                 : choose shapes
// arrow up/down       : scale of shapes
// arrow left/right    : additional rotation of shapes
// d                   : toggle size depending on distance
// g                   : toggle grid resolution
// s                   : save png
// c                   : changes color of all shapes to a different one

'use strict';

var tileCount = 10;
var tileWidth;
var tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var maxDist;
var currentShape; // Define currentShape
var sizeMode = 0;
var shapes = [];
var cKeyPressed = false;
var cursorInCorner = {
 topLeft: false,
 topRight: false,
 bottomLeft: false,
 bottomRight: false
};
var commonColor;
var lastColor;

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var direction = SOUTH;
var stepSize = 3;
var minLength = 10;
var angleCount = 7;
var angle;
var reachedBorder = false;
var posX;
var posY;
var posXcross;
var posYcross;
var diameter = 1;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));

 for (var i = 0; i < 5; i++) {
   shapes.push('shape ' + (i + 1));
 }

 shapes.push('star');
 shapes.push('diamond');

 currentShape = shapes[0];
 commonColor = color(random(255), random(255), random(255));

 colorMode(HSB, 360, 100, 100, 100);
 background(360);

 angle = getRandomAngle(direction);
 posX = floor(random(width));
 posY = 5;
 posXcross = posX;
 posYcross = posY;
}

function draw() {
  var speed = int(map(mouseX, 0, width, 0, 20));
  for (var i = 0; i <= speed; i++) {
   // drawBackgroundLines();

    for (var gridY = 0; gridY < tileCount; gridY++) {
      for (var gridX = 0; gridX < tileCount; gridX++) {
        var posX = tileWidth * gridX + tileWidth / 2;
        var posY = tileHeight * gridY + tileWidth / 2;

        var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));

        if (sizeMode == 0) newShapeSize = shapeSize;
        if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
        if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

        push();
        translate(posX, posY);
        rotate(angle);
        noStroke();

        if (cKeyPressed) {
          if (!lastColor) {
            lastColor = color(random(255), random(255), random(255));
          }
          fill(lastColor);
        } else {
          fill(commonColor);
          lastColor = null;
        }

        drawShape(currentShape, newShapeSize);

        pop();
      }
    }
  }
  drawBackgroundLines();
}
function drawBackgroundLines() {
 strokeWeight(1);
 stroke(180, 0, 0);
 for (var i = 0; i < width; i += 5) {
   for (var j = 0; j < height; j += 5) {
     line(i, j, i + cos(radians(angle)) * diameter, j + sin(radians(angle)) * diameter);
   }
 }
}

function keyReleased() {
 if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
 if (keyCode == DELETE || keyCode == BACKSPACE) {
   background(360);
   updateCommonColor();
 }
}

function getRandomAngle(currentDirection) {
 var a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
 if (currentDirection == NORTH) return a - 90;
 if (currentDirection == EAST) return a;
 if (currentDirection == SOUTH) return a + 90;
 if (currentDirection == WEST) return a + 180;
 return 0;
}

function updateCommonColor() {
 commonColor = color(random(255), random(255), random(255));
}

function keyReleased() {
 if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
 if (keyCode == DELETE || keyCode == BACKSPACE) {
   background(360);
   updateCommonColor();
 }
}

function mouseMoved() {
 // Check if the cursor is in one of the four corners
 var isCursorInTopLeft = mouseX < width / 2 && mouseY < height / 2;
 var isCursorInTopRight = mouseX > width / 2 && mouseY < height / 2;
 var isCursorInBottomLeft = mouseX < width / 2 && mouseY > height / 2;
 var isCursorInBottomRight = mouseX > width / 2 && mouseY > height / 2;

 // If cursor is in one of the corners and hasn't been there before, change the color of all shapes
 if (isCursorInTopLeft && !cursorInCorner.topLeft ||
   isCursorInTopRight && !cursorInCorner.topRight ||
   isCursorInBottomLeft && !cursorInCorner.bottomLeft ||
   isCursorInBottomRight && !cursorInCorner.bottomRight) {
   commonColor = color(random(255), random(255), random(255));

   // Update the flag to indicate that the cursor has been in the corner
   cursorInCorner.topLeft = isCursorInTopLeft;
   cursorInCorner.topRight = isCursorInTopRight;
   cursorInCorner.bottomLeft = isCursorInBottomLeft;
   cursorInCorner.bottomRight = isCursorInBottomRight;
 }
}

function keyReleased() {
 if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
 if (keyCode == DELETE || keyCode == BACKSPACE) {
   background(360);
   updateCommonColor();
 }
 if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
 if (key == 'g' || key == 'G') {
   tileCount += 5;
   if (tileCount > 20) {
     tileCount = 10;
   }
   tileWidth = width / tileCount;
   tileHeight = height / tileCount;
 }

 // Set currentShape based on key pressed
 if (key >= '1' && key <= '7') {
   currentShape = shapes[int(key) - 1];
 }

 if (key == 'c' || key == 'C') {
   cKeyPressed = !cKeyPressed;
   if (cKeyPressed) {
     // Update commonColor when "c" is pressed
     updateCommonColor();
   }
 }
}

function drawShape(shapeName, size) {
 if (shapeName === 'shape 1') {
   ellipse(0, 0, size, size);
 } else if (shapeName === 'shape 2') {
   rect(-size / 2, -size / 2, size, size);
 } else if (shapeName === 'shape 3') {
   triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
 } else if (shapeName === 'shape 4') {
   beginShape();
   vertex(-size / 2, -size / 2);
   vertex(0, -size);
   vertex(size / 2, -size / 2);
   endShape(CLOSE);
 } else if (shapeName === 'shape 5') {
   beginShape();
   vertex(-size / 2, -size / 2);
   vertex(size / 2, -size / 2);
   vertex(0, size / 2);
   endShape(CLOSE);
 } else if (shapeName === 'star') {
   drawStar(0, 0, size / 2, size / 4, 5);
 } else if (shapeName === 'diamond') {
   drawDiamond(0, 0, size, size / 2);
 }
}

function drawStar(x, y, radius1, radius2, npoints) {
 var angle = TWO_PI / npoints;
 var halfAngle = angle / 2.0;
 beginShape();
 for (var a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
   var sx = x + cos(a) * radius2;
   var sy = y + sin(a) * radius2;
   vertex(sx, sy);
   sx = x + cos(a + halfAngle) * radius1;
   sy = y + sin(a + halfAngle) * radius1;
   vertex(sx, sy);
 }
 endShape(CLOSE);
}

function drawDiamond(x, y, width, height) {
 beginShape();
 vertex(x, y - height / 2);
 vertex(x + width / 2, y);
 vertex(x, y + height / 2);
 vertex(x - width / 2, y);
 endShape(CLOSE);
}
