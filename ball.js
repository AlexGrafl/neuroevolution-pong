class Ball {
  constructor() {
    this.position = new Position();
    this.movement = new Movement();
    this.size = 12;
    this.speed = 5;

    this.reset();
  }

  bounceRight(p) {
    let diff = this.position.y - p.topEdge();
    let rad = radians(random(40, 50));
    let angle = map(diff, 0, p.height, -rad, rad);
    this.movement = createMovement(angle);
    this.position.x = p.rightEdge() + this.size / 2;
  }

  bounceLeft(p) {
    let diff = this.position.y - p.topEdge();
    let angle = map(diff, 0, p.height, radians(random(220, 230)), radians(random(130, 140)));
    this.movement = createMovement(angle);
    this.position.x = p.leftEdge() - this.size / 2;
  }

  update() {
    this.position.x += (this.movement.x * this.speed);
    this.position.y += (this.movement.y * this.speed);
  }

  reset() {
    this.position = new Position();
    this.movement = createRandomMovement();
    this.speed = 5;

    if (random(1) < 0.5) {
      this.movement.x *= -1;
    }
  }

  edges() {
    if (this.topEdge() < 0 || this.bottomEdge() > height) {
      this.movement.y *= -1;
    }
  }

  increaseSpeed() {
    this.speed++;
  }

  decreaseSpeed() {
    this.speed--;
  }

  rightEdge() {
    return this.position.x + (this.size / 2);
  }

  leftEdge() {
    return this.position.x - (this.size / 2);
  }

  topEdge() {
    return this.position.y - (this.size / 2);
  }

  bottomEdge() {
    return this.position.y + (this.size / 2);
  }

  show() {
    fill(255);
    square(this.position.x, this.position.y, this.size);
  }
}
