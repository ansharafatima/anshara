let stars = [];

function setup() {
  createCanvas(800, 600);
  noStroke(); // Remove borders for shapes

  // Generate stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height)
    });
  }
}

function draw() {
  background(0); // Black background for space

  // Draw stars
  drawStars();

  // Draw alien
  drawAlien();
}

function drawStars() {
  fill(255); // White color for stars
  for (let star of stars) {
    ellipse(star.x, star.y, 2, 2); // Small circles for stars
  }
}

function drawAlien() {
  // Alien body
  fill(0, 255, 0); // Green color for the alien
  ellipse(400, 400, 120, 160); // Body

  // Alien head
  ellipse(400, 300, 120, 120); // Head

  // Alien eyes
  fill(255); // White color for eyes
  ellipse(370, 280, 30, 50); // Left eye
  ellipse(430, 280, 30, 50); // Right eye

  fill(0); // Black color for eye pupils
  ellipse(370, 280, 15, 25); // Left pupil
  ellipse(430, 280, 15, 25); // Right pupil

  // Alien mouth
  fill(255, 0, 0); // Red color for mouth
  ellipse(400, 340, 60, 30); // Mouth

  // Alien antennae
  stroke(0, 255, 0); // Green color for antennae
  strokeWeight(4);

  // Left antenna
  line(380, 250, 350, 200);
  fill(255, 0, 0); // Red color for antenna tips
  ellipse(350, 200, 15, 15); // Antenna tip

  // Right antenna
  line(420, 250, 450, 200);
  ellipse(450, 200, 15, 15); // Antenna tip

  // Alien hands
  fill(0, 255, 0); // Green color for hands
  ellipse(310, 400, 30, 30); // Left hand
  ellipse(490, 400, 30, 30); // Right hand

  // Alien feet
  ellipse(360, 500, 40, 20); // Left foot
  ellipse(440, 500, 40, 20); // Right foot

  // Alien clothes
  fill(0, 0, 255); // Blue color for shirt
  beginShape();
  vertex(340, 370);
  vertex(460, 370);
  vertex(480, 440);
  vertex(320, 440);
  endShape(CLOSE);

  fill(255, 0, 0); // Red color for belt
  rect(340, 430, 120, 10); // Belt

  // Alien pants
  fill(0, 0, 255); // Blue color for pants
  rect(340, 440, 120, 60);
}

