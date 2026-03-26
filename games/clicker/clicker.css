let score = 0;
let time = 10;
let gameOver = false;
let timerStarted = false;

const btn = document.getElementById("btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

btn.textContent = "START";

btn.onclick = () => {
  if (!timerStarted) {
    timerStarted = true;
    btn.textContent = "CLICK";
    startTimer();
  } else if (!gameOver) {
    score++;
    scoreEl.textContent = "Score: " + score;
  }
};

function startTimer() {
  const timer = setInterval(() => {
    time--;
    timeEl.textContent = "Time: " + time;

    if (time === 0) {
      gameOver = true;
      btn.disabled = true;
      clearInterval(timer);
      alert("Game Over! Score: " + score);
    }
  }, 1000);
}
