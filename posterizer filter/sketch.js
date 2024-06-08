// Creating a variable to store the image.
var img;

// Preloading the image named "SUN.jpg" before setup.
function preload() {
img = loadImage("pink.jpg");

}

function setup () {
// Creating a canvas for window.
createCanvas (800, 700);
// Setting the background color to "0" 
background(0);

}

function draw() {
// Clear the background on each frame
background(0);
image(img, 0, 0);//to show the entire picture
var v = map (mouseX,0, width, 5 ,0);
filter(POSTERIZE, v);//v - depending on the mouse interaction 

}