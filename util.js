class Position {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }
}

class Movement {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

function createRandomMovement(speed) {
  let angle = random(-PI / 4, PI / 4);
  return createMovement(angle);
}

function createMovement(angle) {
  let movement = new Movement();
  movement.x = 1 * cos(angle);
  movement.y = 1 * sin(angle);
  return movement;
}
