function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // Car body
  fill(0, 0, 0); // Black color for the car body
  rect(200, 300, 400, 100, 20); // Rounded rectangle for a smoother look

  // Car top
  fill(255, 204, 0); // Yellow color for the top
  rect(275, 250, 250, 100, 20); // Rounded rectangle for the car top

  // Front window
  fill(135, 206, 250); // Light blue color for the window
  beginShape();
  vertex(285, 260);
  vertex(355, 260);
  vertex(355, 330);
  vertex(285, 330);
  endShape(CLOSE);

  // Rear window
  fill(135, 206, 250); // Light blue color for the window
  beginShape();
  vertex(395, 260);
  vertex(465, 260);
  vertex(465, 330);
  vertex(395, 330);
  endShape(CLOSE);

  // Wheels
  fill(50); // Dark gray for the tires
  ellipse(275, 425, 100, 100); // Front wheel
  ellipse(525, 425, 100, 100); // Rear wheel

  // Wheel rims
  fill(180); // Lighter gray for the rims
  ellipse(275, 425, 50, 50); // Front wheel rim
  ellipse(525, 425, 50, 50); // Rear wheel rim

  // Headlights
  fill(255, 255, 100); // Yellowish white for headlights
  ellipse(210, 350, 20, 20); // Left headlight
  ellipse(590, 350, 20, 20); // Right headlight

  // Car grill
  fill(100); // Dark gray for the grill
  rect(200, 375, 20, 20); // Left grill
  rect(580, 375, 20, 20); // Right grill

  // Side mirrors
  fill(0, 0, 0); // Black color for side mirrors
  rect(245, 280, 10, 30); // Left mirror
  rect(545, 280, 10, 30); // Right mirror

  // Adding some details to the car body
  stroke(255, 204, 0); // Yellow color for the car lines
  strokeWeight(4);
  line(275, 300, 525, 300); // Top horizontal line
  line(200, 350, 600, 350); // Bottom horizontal line
}
