let score = 0;
let time = 10;
let gameOver = false;

const btn = document.getElementById("btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

btn.onclick = () => {
  if (!gameOver) {
    score++;
    scoreEl.textContent = "Score: " + score;
  }
};

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
