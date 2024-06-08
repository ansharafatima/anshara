function setup() {
  createCanvas(800, 600);
  noLoop(); // Stop draw() from looping since we only need to draw once
}

function draw() {
  background(255); // White background

  // Set up the grid with smaller cells
  let cols = 20;
  let rows = 15;
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Calculate the position for each circle
      let x = i * cellWidth + cellWidth / 2;
      let y = j * cellHeight + cellHeight / 2;

      // Randomize the size and color
      let circleSize = random(20, 60); // Increase the size range for more overlapping
      let r = random(200, 255); // Pink hues
      let g = random(100, 200); // Pink hues
      let b = random(150, 255); // Pink hues

      // Draw the circle
      fill(r, g, b, 150); // Semi-transparent to enhance overlapping effect
      ellipse(x, y, circleSize, circleSize);
    }
  }
}

