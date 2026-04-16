const box = document.getElementById("box");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const timeInput = document.getElementById("timeInput");
const hud = document.getElementById("hud");
const ready = document.getElementById("ready");

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

  ready.classList.add("hidden");
  hud.classList.remove("hidden");
  box.classList.remove("hidden");

  playing = true;
  spawnCenter();

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

function spawnCenter() {
  const x = window.innerWidth / 2 - 60;
  const y = window.innerHeight / 2 - 60;
  box.style.left = x + "px";
  box.style.top = y + "px";
}

function moveBox() {
  const maxX = window.innerWidth - box.offsetWidth - 40;
  const maxY = window.innerHeight - box.offsetHeight - 40;

  box.style.left = Math.random() * maxX + "px";
  box.style.top = Math.random() * maxY + "px";
}

function endGame() {
  playing = false;
  clearInterval(timer);
  box.classList.add("hidden");
  hud.classList.add("hidden");
  ready.classList.remove("hidden");
}
