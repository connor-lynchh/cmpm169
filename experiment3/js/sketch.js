
var hueRange = [0, 360]; // Full spectrum
var satRange = [50, 100]; // From somewhat colorful to full color
var briRange = [50, 100]; // From medium brightness to full brightness


var cnv;

var dirX;
var dirY;

var wid = 800;
var hei = 500;

var NB_FRAMES = 100;

var frame_count = 0;
function activation(t) {
    return ((1 - cos(2 * PI * t)) / 2) ** 1;
}

function object(id) {
    this.id = id;
    
    this.draw = function() {
        var t = ((frame_count) % NB_FRAMES) / NB_FRAMES + this.id / NB;
        var x0 = lerp(0, wid, this.id / NB);
        var theta = PI / 2;
        var xx = x0;
        var yy = 0;
        var Nt = 75;
        var step = hei / Nt;
        var turn = lerp(0, 0.4, activation((this.id / NB + t) % 1));
        
            // Color variation based on position and time
            var h = map(noise(this.id * 0.1, t * 0.1), 0, 1, hueRange[0], hueRange[1]);
            var s = map(noise(this.id * 0.1 + 5, t * 0.1 + 5), 0, 1, satRange[0], satRange[1]);
            var b = map(noise(this.id * 0.1 + 10, t * 0.1 + 10), 0, 1, briRange[0], briRange[1]);
    
        fill(h, s, b);
        stroke(h, s, b);
        strokeWeight(1);
        beginShape();
        vertex(xx, yy);


        for (var i = 0; i <= Nt; i++) {
            theta += turn * sin(2 * PI * (15 * noise(0.2 * this.id / NB, 0.02 * i) + t));
            xx += step * cos(theta);
            yy += step * sin(theta);
            var xx2 = lerp(xx, x0, (i / Nt) * (i / Nt) * (i / Nt));
            var yy2 = lerp(yy, lerp(0, hei, i / Nt), max(i / Nt, 1 - sqrt(i / Nt)));
            vertex(xx2, yy2);
        }
        endShape();
    }
}

var Objects = [];
var NB = 100;

function setup() {
    colorMode(HSB);
    // Use a random seed for noise each time the program starts
    noiseSeed(floor(random(10000)));
    
    cnv = createCanvas(wid, hei);
    cnv.parent('canvas-container');
    background(0);

  

    var angle = random(TWO_PI); // Random angle between 0 and 2*PI
    var speed = 0.5; // Speed of the animation movement
    dirX = cos(angle) * speed;
    dirY = sin(angle) * speed;
  
    
    for (var i = 0; i < NB; i++) {
        Objects[i] = new object(i);
    }
}

function draw() {
    background(0);
    
    var t = ((frame_count) % NB_FRAMES) / NB_FRAMES;
    t += dirX; // Adjust horizontal movement
    var yPhase = t + dirY; // Adjust vertical movement

    // Draw each object
    for (var i = 0; i < NB; i++) {
        Objects[i].draw(); // Only call draw here
    }
    
    frame_count++;
    if (frame_count <= 100 && frame_count > 80) {
        // Optionally save the canvas if needed
        // saveCanvas('s5_' + frame_count + '.png');
    }
}
