const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const scoreEl = document.getElementById("score");
const mistakesEl = document.getElementById("mistakes");
const accuracyEl = document.getElementById("accuracy");
const mainBtn = document.getElementById("mainBtn");
const wordsInput = document.getElementById("wordsInput");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameArea = document.getElementById("gameArea");
const gameOverModal = document.getElementById("gameOverModal");
const gameOverScore = document.getElementById("gameOverScore");
const gameOverMistakes = document.getElementById("gameOverMistakes");
const gameOverAccuracy = document.getElementById("gameOverAccuracy");

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

  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;
  accuracyEl.textContent = "100%";

  container.style.display = "none";
  stats.style.display = "flex";
  gameArea.style.display = "flex";
  wordInput.value = "";
  wordInput.focus();

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

  if (userWord === currentWord.toLowerCase()) {
    score++;
  } else {
    mistakes++;
  }

  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;

  const accuracy = Math.round((score / wordCount) * 100);
  accuracyEl.textContent = accuracy + "%";

  if (wordCount >= totalWords) {
    endGame();
  } else {
    pickNewWord();
  }
}

function updateUI() {
  const accuracy = wordCount > 0 ? Math.round((score / wordCount) * 100) : 100;
  accuracyEl.textContent = accuracy + "%";
}

function endGame() {
  playing = false;
  gameArea.style.display = "none";
  stats.style.display = "none";

  const finalAccuracy = wordCount > 0 ? Math.round((score / wordCount) * 100) : 100;

  gameOverScore.textContent = score;
  gameOverMistakes.textContent = mistakes;
  gameOverAccuracy.textContent = finalAccuracy + "%";

  gameOverModal.classList.add("show");
  gameOverModal.style.display = "flex";
}

function closeGameOver() {
  gameOverModal.classList.remove("show");
  gameOverModal.style.display = "none";
  container.style.display = "flex";
}

function backToHome() {
  window.location.href = "../../index.html";
}

