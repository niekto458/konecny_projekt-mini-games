const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const timeInput = document.getElementById("timeInput");

let score = 0;
let time = 0;
let timer;
let playing = false;

startBtn.onclick = () => {
  clearInterval(timer);

  score = 0;
  time = parseInt(timeInput.value);

  scoreEl.textContent = score;
  timeEl.textContent = time;

  playing = true;
  startBtn.disabled = true;
  moveBox();

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
};

box.onclick = () => {
  if (!playing) return;
  score++;
  scoreEl.textContent = score;
  moveBox();
};

function moveBox() {
  const maxX = window.innerWidth - 500;
  const maxY = window.innerHeight - 200;
  box.style.transform = `translate(${Math.random() * maxX}px, ${Math.random() * maxY}px)`;
}

function endGame() {
  playing = false;
  clearInterval(timer);
  startBtn.disabled = false;
}
