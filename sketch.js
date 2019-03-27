const TOTAL = 350;
const PADDLE_WIDTH = 20;
let population = []
let savedPaddles = [];
let slider;
let bestPaddle;

function setup() {
  createCanvas(600, 400);
  slider = createSlider(1, 100, 1);
  for (var i = 0; i < TOTAL; i++) {
    population[i] = [];
    population[i].push(new Ball());
    let paddle = new Paddle();
    paddle.setLeft();
    let array = [];
    population[i].push(array);
    population[i][1].push(paddle);
    population[i][1].push(new Paddle());
  }
  bestPaddle = population[0][1][0];
}

function draw() {
  // put drawing code here

  for (let n = 0; n < slider.value(); n++) {
    for (var i = 0; i < population.length; i++) {
      let ball = population[i][0];
      let paddles = population[i][1];
      let missed = false;
      for (let paddle of paddles) {
        paddle.hitBall(ball);
        missed |= paddle.missBall(ball);
        paddle.think(ball);
        paddle.update();
        if (paddle.health === 0) {
          population.splice(i, 1)[0];
          savedPaddles.push(...paddles);
          break;
        }
      }

      ball.edges();
      ball.update();
      if (missed) {
        ball.reset();
      }

      if (population.length === 0) {
        nextGeneration();
      }
    }
  }

  background(0);
  for (var i = 0; i < population.length; i++) {
    let ball = population[i][0];
    let paddles = population[i][1];
    ball.show();
    for (let paddle of paddles) {
      paddle.show();
    }
  }

}
