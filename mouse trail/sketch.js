let trails = []; // Array to store the positions of the trails

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  background(0); // Black background to create a contrast with the trails

  // Add current mouse position to the trails array
  trails.push({ x: mouseX, y: mouseY, r: random(200, 255), g: random(100, 200), b: random(150, 255) });

  // Limit the length of the trails array
  if (trails.length > 50) {
    trails.shift(); // Remove the oldest position
  }

  // Draw the trails
  for (let i = 0; i < trails.length; i++) {
    let pos = trails[i];
    fill(pos.r, pos.g, pos.b, 150); // Semi-transparent color for the trail
    drawHeart(pos.x, pos.y, 20); // Draw the heart
  }
}

// Function to draw a heart at position (x, y) with size s
function drawHeart(x, y, s) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
  bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  endShape(CLOSE);
}

