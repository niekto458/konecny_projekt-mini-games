const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const scoreEl = document.getElementById("score");
const mistakesEl = document.getElementById("mistakes");
const accuracyEl = document.getElementById("accuracy");
const timeEl = document.getElementById("time");
const mainBtn = document.getElementById("mainBtn");
const wordsInput = document.getElementById("wordsInput");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameArea = document.getElementById("gameArea");
const gameOverModal = document.getElementById("gameOverModal");
const gameOverScore = document.getElementById("gameOverScore");
const gameOverMistakes = document.getElementById("gameOverMistakes");
const gameOverAccuracy = document.getElementById("gameOverAccuracy");
const gameOverTime = document.getElementById("gameOverTime");

const words = [
  "javascript", "programming", "development", "computer", "algorithm",
  "database", "function", "variable", "array", "object",
  "string", "boolean", "number", "internet", "website",
  "application", "software", "hardware", "network", "server",
  "client", "request", "response", "browser", "code",
  "syntax", "error", "debugging", "testing", "deployment",
  "framework", "library", "module", "package", "repository",
  "version", "commit", "branch", "merge", "conflict",
  "documentation", "comment", "loop", "condition", "operator",
  "parameter", "argument", "return", "scope", "closure"
];

let wordCount = 0;
let wordsRemaining = 0;
let score = 0;
let mistakes = 0;
let totalWords = 0;
let currentWord = "";
let playing = false;
let startTime = 0;
let totalCorrectLetters = 0;
let totalLetters = 0;
let gameTimer;

mainBtn.onclick = startGame;
wordInput.addEventListener("keypress", handleKeyPress);

function startGame() {
  score = 0;
  mistakes = 0;
  totalWords = parseInt(wordsInput.value, 10) || 10;
  if (totalWords < 1) totalWords = 10;
  
  wordsRemaining = totalWords;
  wordCount = 0;
  playing = true;
  startTime = Date.now();
  totalCorrectLetters = 0;
  totalLetters = 0;

  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;
  accuracyEl.textContent = "100%";
  timeEl.textContent = "0s";

  container.style.display = "none";
  stats.style.display = "flex";
  gameArea.style.display = "flex";
  wordInput.value = "";
  wordInput.focus();

  // Start the timer update
  gameTimer = setInterval(updateTime, 100);

  pickNewWord();
}

function pickNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
  wordInput.focus();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    checkWord();
  }
}

function checkWord() {
  if (!playing) return;

  const userWord = wordInput.value.trim().toLowerCase();
  if (userWord === "") return;

  wordCount++;

  // Calculate letter-by-letter accuracy
  const targetWord = currentWord.toLowerCase();
  const maxLength = Math.max(userWord.length, targetWord.length);
  let correctLetters = 0;

  for (let i = 0; i < maxLength; i++) {
    if (i < userWord.length && i < targetWord.length && userWord[i] === targetWord[i]) {
      correctLetters++;
    }
  }

  totalCorrectLetters += correctLetters;
  totalLetters += targetWord.length;

  // Count as mistake if less than 80% of letters are correct
  const wordAccuracy = (correctLetters / targetWord.length) * 100;
  if (wordAccuracy >= 80) {
    score++;
  } else {
    mistakes++;
  }

  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;

  updateUI();

  if (wordCount >= totalWords) {
    endGame();
  } else {
    pickNewWord();
  }
}

function updateUI() {
  const accuracy = totalLetters > 0 ? Math.round((totalCorrectLetters / totalLetters) * 100) : 100;
  accuracyEl.textContent = accuracy + "%";
}

function updateTime() {
  if (!playing) return;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timeEl.textContent = elapsed + "s";
}

function endGame() {
  playing = false;
  clearInterval(gameTimer);
  gameArea.style.display = "none";
  stats.style.display = "none";

  const finalAccuracy = totalLetters > 0 ? Math.round((totalCorrectLetters / totalLetters) * 100) : 100;
  const finalTime = Math.floor((Date.now() - startTime) / 1000);

  gameOverScore.textContent = score;
  gameOverMistakes.textContent = mistakes;
  gameOverAccuracy.textContent = finalAccuracy + "%";
  gameOverTime.textContent = finalTime + "s";

  gameOverModal.classList.add("show");
  gameOverModal.style.display = "flex";
}

function closeGameOver() {
  gameOverModal.classList.remove("show");
  gameOverModal.style.display = "none";
  container.style.display = "flex";
  clearInterval(gameTimer);
}

function backToHome() {
  clearInterval(gameTimer);
  window.location.href = "../../index.html";
}

