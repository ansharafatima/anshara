let lines = [];
let circles = [];
let squares = [];
let numElements = 100;
let neonColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  neonColor = color(0, 255, 255, 150); // Neon blue color
  
  // Initialize lines, circles, and squares with random positions
  for (let i = 0; i < numElements; i++) {
    lines.push({
      x1: random(width),
      y1: random(height),
      x2: random(width),
      y2: random(height),
      speedX1: random(-1, 1),
      speedY1: random(-1, 1),
      speedX2: random(-1, 1),
      speedY2: random(-1, 1)
    });
    circles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speedX: random(-1, 1),
      speedY: random(-1, 1)
    });
    squares.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speedX: random(-1, 1),
      speedY: random(-1, 1)
    });
  }
}

function draw() {
  background(0);
  
  // Update positions of lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].x1 += lines[i].speedX1;
    lines[i].y1 += lines[i].speedY1;
    lines[i].x2 += lines[i].speedX2;
    lines[i].y2 += lines[i].speedY2;

    // Bounce off edges
    if (lines[i].x1 < 0 || lines[i].x1 > width) {
      lines[i].speedX1 *= -1;
    }
    if (lines[i].y1 < 0 || lines[i].y1 > height) {
      lines[i].speedY1 *= -1;
    }
    if (lines[i].x2 < 0 || lines[i].x2 > width) {
      lines[i].speedX2 *= -1;
    }
    if (lines[i].y2 < 0 || lines[i].y2 > height) {
      lines[i].speedY2 *= -1;
    }
  }

  // Update positions of circles
  for (let i = 0; i < circles.length; i++) {
    circles[i].x += circles[i].speedX;
    circles[i].y += circles[i].speedY;

    // Bounce off edges
    if (circles[i].x < 0 || circles[i].x > width) {
      circles[i].speedX *= -1;
    }
    if (circles[i].y < 0 || circles[i].y > height) {
      circles[i].speedY *= -1;
    }
  }

  // Update positions of squares
  for (let i = 0; i < squares.length; i++) {
    squares[i].x += squares[i].speedX;
    squares[i].y += squares[i].speedY;

    // Bounce off edges
    if (squares[i].x < 0 || squares[i].x > width) {
      squares[i].speedX *= -1;
    }
    if (squares[i].y < 0 || squares[i].y > height) {
      squares[i].speedY *= -1;
    }
  }

  // Draw lines
  stroke(neonColor);
  strokeWeight(2);
  for (let i = 0; i < lines.length; i++) {
    line(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
  }

  // Draw circles
  noStroke();
  fill(neonColor);
  for (let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].size, circles[i].size);
  }

  // Draw squares
  for (let i = 0; i < squares.length; i++) {
    rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
  }

  // Draw text in the middle of the screen
  fill(255, 255, 0); // Yellow color
  textSize(64);
  textAlign(CENTER, CENTER);
  text('Bathspa University', width / 2, height / 2);
}
function mouseMoved() {
  // Change the speed of elements based on mouse position
  for (let i = 0; i < lines.length; i++) {
    let d = dist(mouseX, mouseY, lines[i].x1, lines[i].y1);
    lines[i].speedX1 = map(d, 0, width, -1, 1);
    lines[i].speedY1 = map(d, 0, height, -1, 1);

    d = dist(mouseX, mouseY, lines[i].x2, lines[i].y2);
    lines[i].speedX2 = map(d, 0, width, -1, 1);
    lines[i].speedY2 = map(d, 0, height, -1, 1);
  }

  for (let i = 0; i < circles.length; i++) {
    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    circles[i].speedX = map(d, 0, width, -1, 1);
    circles[i].speedY = map(d, 0, height, -1, 1);
  }

  for (let i = 0; i < squares.length; i++) {
    let d = dist(mouseX, mouseY, squares[i].x, squares[i].y);
    squares[i].speedX = map(d, 0, width, -1, 1);
    squares[i].speedY = map(d, 0, height, -1, 1);
  }
}
