let mode = 'title';
let ammo, paddle;
let paddleX, paddleY;
let bricks = [];
let hurdles = [];
let dust, dust2;
let life, score, level;
let powerUps = [];
let powerUpActive = false;
let powerUpTimer = 0;
let collisionSound, powerUpSound;
let magicMeter = 100; // Magic meter to track fireball shots
let explosions = []; // Array to store explosions

function preload() {
  collisionSound = loadSound('collision.mp3');
  powerUpSound = loadSound('powerup.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ammo = new Marble();
  paddle = new Paddle();
  paddleX = (width / 2) - 75;
  paddleY = height / 1.1;
  
  resetBricks();
  resetHurdles();

  dust = new ParticleSystem(width / 1.5, height / 2);
  dust2 = new ParticleSystem(width / 3, height / 2);

  life = 5;
  score = 0;
  level = 1;
}

function draw() {
  if (mode === 'title') {
    titleScreen();
  } else if (mode === 'gameplay') {
    gameplayScreen();
  } else if (mode === 'gameover') {
    gameoverScreen();
  } else if (mode === 'gamewin') {
    gamewinScreen();
  }
}

function titleScreen() {
  background(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text('PINBALL', width / 2, height / 4);
  textSize(35);
  fill(255);
  text('Press SHIFT To Start', width / 2, height / 2);
  text('Get 100 points to win!', width / 2, height / 1.5);

  dust.update();
  dust2.update();

  if (keyIsDown(SHIFT)) {
    mode = 'gameplay';
  }
}

function gameplayScreen() {
  background(0);
  textSize(35);
  textAlign(LEFT, TOP);
  fill(255);

  // Display game stats
  text('balls = ' + life, width / 15, height / 20);
  text('score = ' + score, width / 15, height / 10);
  text('level = ' + level, width / 15, height / 7);
  text('magic = ' + magicMeter, width / 15, height / 5);

  // Draw and update game objects
  ammo.draw();
  ammo.move();
  ammo.collision();

  bricks.forEach(brick => brick.draw());
  hurdles.forEach(hurdle => hurdle.draw());

  paddle.draw();
  paddle.move();

  if (powerUpActive) {
    powerUpTimer--;
    if (powerUpTimer <= 0) {
      paddle.reset();
      powerUpActive = false;
    }
  }

  powerUps.forEach((powerUp, index) => {
    powerUp.draw();
    if (powerUp.checkCollision(ammo)) {
      powerUpSound.play();
      powerUps.splice(index, 1);
      paddle.width *= 1.5;
      powerUpActive = true;
      powerUpTimer = 300;
    }
  });

  // Handle explosion effects
  explosions.forEach((explosion, index) => {
    explosion.update();
    explosion.draw();
    if (explosion.isFinished()) {
      explosions.splice(index, 1);
    }
  });

  // Check for ammo out of bounds
  if (ammo.location()) {
    life -= 1;
    ammo.reset();
    if (life === 0) {
      mode = 'gameover';
    }
  }

  // Check for win condition
  if (score >= 100) {
    mode = 'gamewin';
  }
}

function gamewinScreen() {
  background(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text('YOU HAVE WON', width / 2, height / 4);
  textSize(35);
  text('Press BACKSPACE to return', width / 2, height / 2);

  if (keyIsDown(BACKSPACE)) {
    resetGame();
    mode = 'title';
  }
}

function gameoverScreen() {
  background(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text('GAME OVER', width / 2, height / 4);
  textSize(35);
  text('Press BACKSPACE to return to menu', width / 2, height / 2);

  if (keyIsDown(BACKSPACE)) {
    resetGame();
    mode = 'title';
  }
}

function resetGame() {
  ammo.reset();
  paddle.reset();
  life = 5;
  score = 0;
  level = 1;
  magicMeter = 100;
  resetBricks();
  resetHurdles();
  powerUps = [];
  powerUpActive = false;
  powerUpTimer = 0;
  explosions = [];
}

function resetBricks() {
  bricks = [];
  for (let i = 0; i < level * 6; i++) {
    bricks.push(new Brick());
  }
  powerUps = [];
  for (let i = 0; i < 3; i++) {
    powerUps.push(new PowerUp());
  }
}

function resetHurdles() {
  hurdles = [];
  for (let i = 0; i < 6; i++) { // Added more hurdles
    hurdles.push(new Hurdle());
  }
}

class Marble {
  constructor() {
    this.reset();
    this.radius = 25;
    this.color = 200;
  }

  draw() {
    fill(this.color);
    ellipse(this.ballX, this.ballY, this.radius);
  }

  move() {
    this.ballX += this.dirX;
    this.ballY += this.dirY;
  }

  collision() {
    // Wall collisions
    if (this.ballX > width || this.ballX < 0) {
      this.dirX *= -1;
    }
    if (this.ballY < 0) {
      this.dirY *= -1;
    }

    // Paddle collision
    if (this.ballY > paddleY - 20 && this.ballY < paddleY && this.ballX > paddleX - 5 && this.ballX < paddleX + paddle.width) {
      this.dirY *= -1;
      this.ballY += this.dirY;
      collisionSound.play();
    }

    // Brick collisions
    bricks.forEach((brick, index) => {
      if (this.ballY > brick.y - 25 && this.ballY < brick.y && this.ballX > brick.x - 5 && this.ballX < brick.x + 55) {
        score += 10;
        this.dirX *= 1.05;
        this.dirY *= 1.05;
        this.dirY *= -1;
        this.ballY += this.dirY;
        brick.reset();
        collisionSound.play();
        explosions.push(new Explosion(this.ballX, this.ballY));
      }
    });

    // Hurdle collisions
    hurdles.forEach((hurdle, index) => {
      if (this.ballY > hurdle.y - hurdle.height / 2 && this.ballY < hurdle.y + hurdle.height / 2 && this.ballX > hurdle.x - hurdle.width / 2 && this.ballX < hurdle.x + hurdle.width / 2) {
        score += 5;
        this.dirY *= -1;
        this.ballY += this.dirY;
        collisionSound.play();
        explosions.push(new Explosion(this.ballX, this.ballY));
      }
    });
  }

  location() {
    return this.ballY - this.radius > height;
  }

  reset() {
    this.ballX = width / 2;
    this.ballY = height / 2;
    this.dirX = 6;
    this.dirY = 6;
  }
}

class Brick {
  constructor() {
    this.reset();
    this.width = 50;
    this.height = 25;
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  reset() {
    this.x = width / random(1.1, 10);
    this.y = height / random(1.5, 8);
  }
}

class Paddle {
  constructor() {
    this.width = 150;
    this.height = 20;
    this.color = [0, 255, 0];
    this.reset();
  }

  draw() {
    fill(this.color);
    rect(paddleX, paddleY, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      paddleX -= 20;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      paddleX += 20;
    }
  }

  reset() {
    this.width = 150;
    this.height = 20;
    this.color = [0, 255, 0];
  }
}

class ParticleSystem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rate = 8;
    this.spawnTimer = this.rate;
    this.particles = [];
  }

  update() {
    this.spawnTimer -= 1;
    if (this.spawnTimer < 0) {
      this.particles.push(new Particle(this.x, this.y));
      this.spawnTimer = this.rate;
    }

    this.particles.forEach((p, index) => {
      p.update();
      p.draw();
      if (p.life <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = random(-1, 1);
    this.velY = random(-5, 5);
    this.color = [random(100, 255), random(0, 255), random(0, 255)];
    this.life = random(10, 30);
    this.size = random(5, 10);
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.life -= 1;
  }

  draw() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.life * 10);
    ellipse(this.x, this.y, this.size);
  }
}

class PowerUp {
  constructor() {
    this.x = random(width);
    this.y = random(height / 4);
    this.size = 20;
    this.color = [255, 0, 0];
  }

  draw() {
    fill(this.color);
    // Draw heart shape
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);
  }

  checkCollision(marble) {
    let d = dist(this.x, this.y, marble.ballX, marble.ballY);
    return d < this.size / 2 + marble.radius / 2;
  }
}

class Hurdle {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2, height - 100);
    this.width = 80;
    this.height = 20;
    this.color = [255, 255, 0]; // Yellow color for hurdles
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Explosion class for particle effects on collisions
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(x, y));
    }
  }

  update() {
    this.particles.forEach((p, index) => {
      p.update();
      if (p.life <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  draw() {
    this.particles.forEach(p => p.draw());
  }

  isFinished() {
    return this.particles.length === 0;
  }
}


