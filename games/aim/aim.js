const target = document.getElementById("target");
const area = document.getElementById("area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");

let score = 0;
let time = 15;
let timer;
let playing = false;

startBtn.onclick = () => {
  if (playing) return;
  startGame();
};

target.onclick = () => {
  score++;
  scoreEl.textContent = score;
  moveTarget();
};

function startGame() {
  score = 0;
  time = 15;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = time;
  startBtn.disabled = true;

  target.style.display = "block";
  moveTarget();

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) endGame();
  }, 1000);
}

function moveTarget() {
  const x = Math.random() * (area.clientWidth - 40);
  const y = Math.random() * (area.clientHeight - 40);
  target.style.left = x + "px";
  target.style.top = y + "px";
}

function endGame() {
  clearInterval(timer);
  playing = false;
  target.style.display = "none";
  startBtn.disabled = false;
  startBtn.textContent = "PLAY AGAIN";
}
