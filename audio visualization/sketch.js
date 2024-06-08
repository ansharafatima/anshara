let mic, fft;
let numBars = 128; // Increase the number of bars for better resolution
let barWidth, barHeight;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  barWidth = width / numBars - 2;
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0, 25); // Increase transparency for trailing effect
  let spectrum = fft.analyze();

  // Draw particles
  for (let particle of particles) {
    particle.update(spectrum);
    particle.display();
  }

  // Draw circular sound visualizer
  translate(width / 2, height / 2);
  for (let i = 0; i < numBars; i++) {
    let angle = map(i, 0, numBars, 0, TWO_PI);
    let x = cos(angle) * 200; // Adjust radius
    let y = sin(angle) * 200;
    let col = map(i, 0, numBars, 0, 1);
    let h = map(spectrum[i], 0, 255, 0, 300); // Adjust height scaling
    stroke(lerpColor(color(255, 0, 0), color(0, 0, 255), col));
    line(x, y, x + cos(angle) * h, y + sin(angle) * h);
  }

  // Draw text in the middle of the circle
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Audio Visualizer", 0, 0);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.color = color(random(255), random(255), random(255), random(150, 200));
    this.noff = createVector(random(1000), random(1000)); // Perlin noise offset
  }

  update(spectrum) {
    this.acc = p5.Vector.fromAngle(noise(this.noff.x) * TWO_PI);
    this.noff.add(0.01, 0.01); // Adjust noise step for smoother movement
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    
    // Make particles react to sound
    let level = map(spectrum[int(random(spectrum.length))], 0, 255, 0, 1);
    this.size = lerp(this.size, level * 50, 0.05);

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
