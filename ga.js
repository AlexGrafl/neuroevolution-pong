function nextGeneration() {
  console.log('next generation');
  calculateFitness();
  console.log("best fittness: " + bestPaddle.fitness + " and hits: " + bestPaddle.hits);
  for (let i = 0; i < TOTAL; i++) {
    population[i] = [];
    population[i][0] = new Ball();
    let paddle = pickOne();
    paddle.setLeft();
    let array = [];
    population[i].push(array);
    population[i][1].push(paddle);
    population[i][1].push(pickOne());
  }
  savedPaddles = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedPaddles[index].fitness;
    index++;
  }
  index--;
  let paddle = savedPaddles[index];
  let child = new Paddle(paddle.brain);
  child.mutate();
  return child;
}


function calculateFitness() {
  let sum = 0;
  for (let paddle of savedPaddles) {
    paddle.calculateScore();
    sum += paddle.score;
  }
  for (let paddle of savedPaddles) {
    paddle.fitness = paddle.score / sum;
    if(paddle.fitness > bestPaddle.fitness) {
      bestPaddle = paddle;
    }
  }
}
