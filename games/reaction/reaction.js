const gameBox = document.getElementById("gameBox");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const reactionEl = document.getElementById("reaction");
const mainBtn = document.getElementById("mainBtn");
const timeInput = document.getElementById("timeInput");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameArea = document.getElementById("gameArea");

let score = 0;
let timeLeft = 0;
let gameTimer;
let nextGreenTimer;
let greenStart = null;
let waitingForGreen = false;
let playing = false;

mainBtn.onclick = startGame;
gameBox.onclick = handleClick;

function startGame() {
  clearAllTimers();

  score = 0;
  timeLeft = parseInt(timeInput.value, 10) || 10;
  if (timeLeft < 1) timeLeft = 10;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  reactionEl.textContent = "0";

  container.style.display = "none";
  stats.style.display = "flex";
  gameArea.style.display = "flex";

  playing = true;
  waitingForGreen = true;
  setBoxState("red", "Wait for green");

  scheduleGreen();
  gameTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function scheduleGreen() {
  clearTimeout(nextGreenTimer);
  waitingForGreen = true;
  setBoxState("red", "Wait for green");
  nextGreenTimer = setTimeout(() => {
    turnGreen();
  }, 1000 + Math.random() * 2000);
}

function turnGreen() {
  waitingForGreen = false;
  greenStart = performance.now();
  setBoxState("green", "CLICK!");
}

function handleClick() {
  if (!playing) return;

  if (waitingForGreen) {
    setBoxState("danger", "Too soon!");
    waitingForGreen = true;
    greenStart = null;
    clearTimeout(nextGreenTimer);
    nextGreenTimer = setTimeout(scheduleGreen, 1200);
    return;
  }

  if (greenStart !== null) {
    const reactionTime = Math.round(performance.now() - greenStart);
    reactionEl.textContent = reactionTime;
    score += 1;
    scoreEl.textContent = score;
    greenStart = null;
    scheduleGreen();
  }
}

function setBoxState(state, text) {
  gameBox.classList.remove("red", "green", "danger");
  gameBox.classList.add(state);
  gameBox.textContent = text;
}

function endGame() {
  playing = false;
  clearAllTimers();
  setBoxState("red", "Game Over");
  container.style.display = "flex";
  gameArea.style.display = "none";
  stats.style.display = "none";
}

function backToHome() {
  clearAllTimers();
  playing = false;
  window.location.href = "../../index.html";
}

function clearAllTimers() {
  clearInterval(gameTimer);
  clearTimeout(nextGreenTimer);
}
