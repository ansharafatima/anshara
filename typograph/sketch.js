let textX, textY;
let textColor;
let numObjects = 100;
let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(64);
  textAlign(CENTER, CENTER);
  textX = width / 2;
  textY = height / 2;
  textColor = color(255);
  noStroke();
  
  // Initialize floating objects
  for (let i = 0; i < numObjects; i++) {
    objects.push({
      x: random(width),
      y: random(height),
      size: random(10, 50),
      col: random([color(255, 105, 180), color(255, 165, 0)]),
      xOffset: random(1000),
      yOffset: random(1000)
    });
  }
}

function draw() {
  // Yellow background
  background(255, 255, 0);
  
  // Update and draw floating objects
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    obj.x = noise(obj.xOffset) * width;
    obj.y = noise(obj.yOffset) * height;
    obj.xOffset += 0.005; // Adjust this value to change speed
    obj.yOffset += 0.005; // Adjust this value to change speed
    
    fill(obj.col);
    ellipse(obj.x, obj.y, obj.size);
  }
  
  // Check if the cursor is over the text
  if (mouseX > textX - textWidth("Bath Spa University") / 2 && 
      mouseX < textX + textWidth("Bath Spa University") / 2 &&
      mouseY > textY - textSize() / 2 && 
      mouseY < textY + textSize() / 2) {
    textColor = color(random(255), random(255), random(255));
  } else {
    textColor = color(255);
  }
  
  // Display the text
  fill(textColor);
  text("Bath Spa University", textX, textY);
}

