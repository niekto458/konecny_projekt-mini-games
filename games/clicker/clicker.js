let score = 0;
let time = 10;
let gameStarted = false;
let gameOver = false;

const btn = document.getElementById("btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

btn.onclick = () => {
  if (!gameStarted) {
    gameStarted = true;
    btn.textContent = "CLICK";
    startTimer();
  } else if (!gameOver) {
    score++;
    scoreEl.textContent = score;
  }
};

function startTimer() {
  const timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      gameOver = true;
      btn.disabled = true;
      btn.textContent = "GAME OVER";
    }
  }, 1000);
}
