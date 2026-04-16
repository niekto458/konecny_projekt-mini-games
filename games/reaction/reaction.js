const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const timeInput = document.getElementById("timeInput");

let score = 0;
let time = 0;
let timer;

startBtn.onclick = () => {
  score = 0;
  scoreEl.textContent = score;
  time = parseInt(timeInput.value);
  timeEl.textContent = time;

  startBtn.disabled = true;
  box.style.display = "block";

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
};

box.onclick = () => {
  score++;
  scoreEl.textContent = score;
  box.style.marginLeft = Math.random() * 200 + "px";
};

function endGame() {
  clearInterval(timer);
  startBtn.disabled = false;
  box.style.display = "none";
}
