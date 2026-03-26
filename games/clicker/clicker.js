let score = 0;
let time = 10;
let gameStarted = false;
let gameOver = false;
let timer;

const btn = document.getElementById("btn");
const retryBtn = document.getElementById("retry");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

btn.onclick = () => {
  if (!gameStarted) {
    startGame();
  } else if (!gameOver) {
    score++;
    scoreEl.textContent = score;
  }
};

retryBtn.onclick = () => {
  resetGame();
};

function startGame() {
  gameStarted = true;
  gameOver = false;
  btn.disabled = false;
  btn.textContent = "CLICK";
  retryBtn.style.display = "none";

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  gameOver = true;
  btn.disabled = true;
  btn.textContent = "GAME OVER";
  retryBtn.style.display = "block";
}

function resetGame() {
  clearInterval(timer);
  score = 0;
  time = 10;
  gameStarted = false;
  gameOver = false;

  scoreEl.textContent = score;
  timeEl.textContent = time;

  btn.disabled = false;
  btn.textContent = "START";
  retryBtn.style.display = "none";
}
