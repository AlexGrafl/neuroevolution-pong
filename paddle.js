class Paddle {
  constructor(brain) {
    this.position = new Position();
    this.width = PADDLE_WIDTH;
    this.height = 100;
    this.movement = new Movement();
    this.health = 5;
    this.hits = 1;
    this.fitness = 0;
    this.winner = false;
    this.score = 0;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(6, 10, 3);
    }
    this.position.x = width - this.width;
  }

  calculateScore() {
    this.score = this.hits;
    this.score += exp(this.health);
    if (this.winner === true) {
      this.score += exp(this.hits);
    }
  }

  setLeft() {
    this.position.x = this.width;
  }

  update() {
    this.position.y += this.movement.y;
    this.position.y = constrain(this.position.y, this.height / 2, height - this.height / 2);
  }

  move(steps) {
    this.movement.y = steps;
  }

  hitBall(ball) {
    if (ball.bottomEdge() > this.topEdge() && ball.topEdge() < this.bottomEdge()) {
      if (ball.leftEdge() < this.leftEdge() && ball.rightEdge() >= this.leftEdge()) {
        ball.bounceLeft(this);
        this.hits++;
      }
      if (ball.rightEdge() > this.rightEdge() && ball.leftEdge() <= this.rightEdge()) {
        ball.bounceRight(this);
        this.hits++;
      }
    }
  }

  missBall(ball) {
    if (ball.bottomEdge() < this.topEdge() || ball.topEdge() > this.bottomEdge()) {
      if ((ball.leftEdge() > this.leftEdge() && ball.rightEdge() < this.rightEdge()) ||
        (ball.leftEdge() > this.leftEdge() && ball.leftEdge() < this.rightEdge()) ||
        (ball.rightEdge() > this.leftEdge() && ball.rightEdge() < this.rightEdge())) {
          this.health--;
          return true;
        }
      }
      return false;
    }

    mutate() {
      this.brain.mutate(0.1);
    }

    think(ball) {
      let inputs = [];
      inputs[0] = ball.position.x / width;
      inputs[1] = ball.position.y / height;
      inputs[2] = this.position.y / height;
      inputs[3] = this.movement.y;
      inputs[4] = ball.movement.x;
      inputs[5] = ball.movement.y;
      let output = this.brain.predict(inputs);
      if (output[0] > output[1] && output[0] > output[2]) {
        this.move(0);
      }
      if (output[1] > output[0] && output[1] > output[2]) {
        this.move(-10);
      }
      if (output[2] > output[0] && output[2] > output[1]) {
        this.move(10);
      }
    }

    rightEdge() {
      return this.position.x + this.width / 2;
    }

    leftEdge() {
      return this.position.x - this.width / 2;
    }

    topEdge() {
      return this.position.y - this.height / 2;
    }

    bottomEdge() {
      return this.position.y + this.height / 2;
    }


    show() {
      fill(255);
      rectMode(CENTER);
      rect(this.position.x, this.position.y, this.width, this.height);
    }
  }
