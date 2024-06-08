// Declaring the variables for both the image and coordinates.
var img, x, y;

// Preloading the image named "flower.jpg" before setup.
function preload() {
img = loadImage("flower.jpg");

}



function setup() {
// Creating a canvas that fits the window.
createCanvas (800, 700);
  
// Setting the background color to "0"
background(0);

// Used to disable any strokes for shapes.
noStroke();

}



function draw() {

// Generating random squares in x & y coordinate within canvas width.
x = random(width); // putting the circle randomly in the canvas 
y = random(height); // putting the circle randomly in the canvas 

// Getting the color of the pixel at the random position from the image.
var c = img.get(x, y);

// Setting the fill color with transparency based on the pixel color.
fill(c[0], c[1], c[2], 20); // 50-transpareny

// Drawing squares at different random positions with a fixed size.
ellipse (x, y, 30, 30);

}