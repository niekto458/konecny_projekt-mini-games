const gameBox = document.getElementById("gameBox");
const scoreEl = document.getElementById("score");
const triesLeftEl = document.getElementById("triesLeft");
const reactionEl = document.getElementById("reaction");
const bestEl = document.getElementById("bestReaction");
const mainBtn = document.getElementById("mainBtn");
const triesInput = document.getElementById("triesInput");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameArea = document.getElementById("gameArea");

let score = 0;
let triesLeft = 0;
let totalTries = 0;
let gameTimer;
let nextGreenTimer;
let greenStart = null;
let waitingForGreen = false;
let playing = false;
let bestReaction = null;

mainBtn.onclick = startGame;
gameBox.onclick = handleClick;

function startGame() {
  clearAllTimers();

  score = 0;
  totalTries = parseInt(triesInput.value, 10) || 5;
  if (totalTries < 1) totalTries = 5;
  triesLeft = totalTries;
  bestReaction = null;

  scoreEl.textContent = score;
  triesLeftEl.textContent = triesLeft;
  reactionEl.textContent = "0";
  bestEl.textContent = "--";

  container.style.display = "none";
  stats.style.display = "flex";
  gameArea.style.display = "flex";

  playing = true;
  waitingForGreen = true;
  setBoxState("red", "Wait for green");

  scheduleGreen();
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
    triesLeft -= 1;
    triesLeftEl.textContent = triesLeft;

    if (bestReaction === null || reactionTime < bestReaction) {
      bestReaction = reactionTime;
      bestEl.textContent = bestReaction;
      bestEl.parentElement.classList.add("best-row");
    }

    greenStart = null;

    if (triesLeft <= 0) {
      endGame();
      return;
    }

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
