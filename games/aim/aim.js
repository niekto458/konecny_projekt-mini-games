const target = document.getElementById("target");
const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const missedEl = document.getElementById("missed");
const accuracyEl = document.getElementById("accuracy");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("mainBtn");
const timeInput = document.getElementById("timeInput");
const difficulty = document.getElementById("difficulty");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameOverModal = document.getElementById("gameOverModal");
const gameOverScore = document.getElementById("gameOverScore");
const gameOverMissed = document.getElementById("gameOverMissed");
const gameOverAccuracy = document.getElementById("gameOverAccuracy");

let score = 0;
let missed = 0;
let totalShots = 0;
let timeLeft = 0;
let movementInterval;
let countdownInterval;
let targetDirection = 1;
let movementSpeed = 0;
let gameRunning = false;

startBtn.onclick = startGame;

target.onclick = (event) => {
  event.stopPropagation();
  if (!gameRunning) return;
  score++;
  totalShots++;
  scoreEl.textContent = score;
  updateUI();
  moveTarget();
};

arena.addEventListener("click", () => {
  if (!gameRunning) return;
  missed++;
  totalShots++;
  updateUI();
});

function startGame() {
  clearInterval(movementInterval);
  clearInterval(countdownInterval);

  score = 0;
  missed = 0;
  totalShots = 0;
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
  let size;

  if (mode === "easy") {
    size = 70;
    movementSpeed = 0;
  } else if (mode === "medium") {
    size = 45;
    movementSpeed = 1.2;
  } else {
    size = 25;
    movementSpeed = 2.4;
  }

  target.style.width = size + "px";
  target.style.height = size + "px";

  moveTarget();
  clearInterval(movementInterval);

  if (movementSpeed > 0) {
    targetDirection = Math.random() < 0.5 ? 1 : -1;
    movementInterval = setInterval(animateTarget, 20);
  }
}

function animateTarget() {
  const maxX = arena.clientWidth - target.clientWidth;
  let x = parseFloat(target.style.left) || 0;
  let nextX = x + targetDirection * movementSpeed;

  if (nextX <= 0) {
    nextX = 0;
    targetDirection = 1;
  } else if (nextX >= maxX) {
    nextX = maxX;
    targetDirection = -1;
  }

  target.style.left = nextX + "px";
}

function moveTarget() {
  const maxX = arena.clientWidth - target.clientWidth;
  const maxY = arena.clientHeight - target.clientHeight;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";

  if (movementSpeed > 0) {
    targetDirection = Math.random() < 0.5 ? 1 : -1;
  }
}

function updateUI() {
  timeEl.textContent = timeLeft;
  missedEl.textContent = missed;
  accuracyEl.textContent = totalShots ? Math.round((score / totalShots) * 100) + "%" : "0%";
}

function endGame() {
  clearInterval(countdownInterval);
  clearInterval(movementInterval);
  gameRunning = false;

  arena.style.display = "none";
  stats.style.display = "none";
  container.style.display = "none";

  gameOverScore.textContent = score;
  gameOverMissed.textContent = missed;
  gameOverAccuracy.textContent = totalShots ? Math.round((score / totalShots) * 100) + "%" : "0%";
  gameOverModal.style.display = "flex";
}

function closeGameOver() {
  gameOverModal.style.display = "none";
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
  missedEl.textContent = 0;
  accuracyEl.textContent = "0%";
  timeEl.textContent = 0;
}

function backToHome() {
  clearInterval(countdownInterval);
  clearInterval(movementInterval);
  gameRunning = false;
  window.location.href = "../../index.html";
}
