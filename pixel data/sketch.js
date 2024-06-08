// Declared the variables for both the image and mouse coordinates.
var img, x, y;

function preload() {
//  Preloading the images before the setup.
img = loadImage('scenery.jpg'); //Insert The Image

}



function setup() {
// Creating a canvas with a width 800 and a height 700.
createCanvas (800, 700);
  
// Setting the background color to "0".
background(0);
  
// Used to disable any strokes for shapes.
noStroke();

}



function draw() {

// Used to clear the background on each of the frame.
background(0);
  
// Updating the x & y coordinate with the position of the mouse.
x = mouseX;
y = mouseY;
  
// Drawing the image at position "(0, 0)".
image( img, 0, 0);

var c = get(x, y);
  
// Used to set the fill color to the color obtained from the pixel.
fill(c); // DEPENDING ON THE VARIABLE C
  
// Drawing a rectangle at the position of the mouse with size 80x80.
rect (x, y, 80, 80);

}