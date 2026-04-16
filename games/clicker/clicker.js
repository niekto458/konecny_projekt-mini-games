const clickBtn = document.getElementById("clickBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const timeInput = document.getElementById("timeInput");

let score = 0;
let time = 0;
let playing = false;
let timer;

startBtn.onclick = () => {
  score = 0;
  scoreEl.textContent = score;

  time = parseInt(timeInput.value);
  timeEl.textContent = time;

  playing = true;
  startBtn.disabled = true;

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
};

clickBtn.onclick = () => {
  if (!playing) return;
  score++;
  scoreEl.textContent = score;
};

function endGame() {
  playing = false;
  clearInterval(timer);
  startBtn.disabled = false;
}
