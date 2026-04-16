const target = document.getElementById("target");
const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("mainBtn");
const timeInput = document.getElementById("timeInput");
const difficulty = document.getElementById("difficulty");
const container = document.getElementById("container");
const stats = document.getElementById("stats");

let score = 0;
let timeLeft = 0;
let movementInterval;
let countdownInterval;
let gameRunning = false;

startBtn.onclick = startGame;

target.onclick = () => {
  if (!gameRunning) return;
  score++;
  scoreEl.textContent = score;
  moveTarget();
};

function startGame() {
  clearInterval(movementInterval);
  clearInterval(countdownInterval);

  score = 0;
  timeLeft = parseInt(timeInput.value, 10) || 10;
  if (timeLeft < 1) timeLeft = 10;

  scoreEl.textContent = score;
  updateUI();

  gameRunning = true;
  container.style.display = "none";
  arena.style.display = "block";
  stats.style.display = "flex";

  setup(difficulty.value);

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function setup(mode) {
  let size, speed;

  if (mode === "easy") {
    size = 70;
    speed = 0;
  } else if (mode === "medium") {
    size = 45;
    speed = 800;
  } else {
    size = 25;
    speed = 300;
  }

  target.style.width = size + "px";
  target.style.height = size + "px";

  moveTarget();
  clearInterval(movementInterval);

  if (speed > 0) {
    movementInterval = setInterval(moveTarget, speed);
  }
}

function moveTarget() {
  const maxX = arena.clientWidth - target.clientWidth;
  const maxY = arena.clientHeight - target.clientHeight;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

function updateUI() {
  timeEl.textContent = timeLeft;
}

function endGame() {
  clearInterval(countdownInterval);
  clearInterval(movementInterval);
  gameRunning = false;
  alert("Game Over! Your score: " + score);
  backToMenu();
}

function backToMenu() {
  clearInterval(countdownInterval);
  clearInterval(movementInterval);
  gameRunning = false;

  container.style.display = "flex";
  arena.style.display = "none";
  stats.style.display = "none";

  scoreEl.textContent = 0;
  timeEl.textContent = 0;
}

function backToHome() {
  clearInterval(countdownInterval);
  clearInterval(movementInterval);
  gameRunning = false;
  window.location.href = "../../index.html";
}
