const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const scoreEl = document.getElementById("score");
const mistakesEl = document.getElementById("mistakes");
const accuracyEl = document.getElementById("accuracy");
const wpsEl = document.getElementById("wps");
const mainBtn = document.getElementById("mainBtn");
const wordsInput = document.getElementById("wordsInput");
const container = document.getElementById("container");
const stats = document.getElementById("stats");
const gameArea = document.getElementById("gameArea");
const gameOverModal = document.getElementById("gameOverModal");
const gameOverScore = document.getElementById("gameOverScore");
const gameOverMistakes = document.getElementById("gameOverMistakes");
const gameOverAccuracy = document.getElementById("gameOverAccuracy");
const gameOverWps = document.getElementById("gameOverWps");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the process of creating instructions for computers.",
  "The weather today is absolutely beautiful and sunny.",
  "I enjoy reading books about science and technology.",
  "Technology has changed the way we live our daily lives.",
  "The internet connects people from all around the world.",
  "Learning new skills helps us grow and develop personally.",
  "Music has the power to evoke emotions and memories.",
  "Exercise is important for maintaining good physical health.",
  "Creativity allows us to solve problems in unique ways.",
  "The ocean is vast and contains many mysterious creatures.",
  "History teaches us about the past and shapes our future.",
  "Art expresses ideas and emotions through visual elements.",
  "Nature provides us with beauty and resources to sustain life.",
  "Education opens doors to new opportunities and experiences.",
  "Friendship brings joy and support throughout our lives.",
  "Innovation drives progress and improves our quality of life.",
  "The stars in the night sky have fascinated humans for centuries.",
  "Cooking allows us to create delicious meals from simple ingredients.",
  "Travel broadens our horizons and exposes us to new cultures.",
  "Science helps us understand the world around us better.",
  "Sports teach valuable lessons about teamwork and perseverance.",
  "The mind is a powerful tool that can achieve great things.",
  "Gardening connects us with nature and provides fresh produce.",
  "Photography captures moments and preserves memories forever.",
  "Writing helps us express our thoughts and communicate ideas.",
  "Dance is a form of artistic expression through movement.",
  "The mountains offer breathtaking views and challenging adventures.",
  "Volunteering helps make our communities stronger and better.",
  "Mathematics is the language of patterns and logical thinking.",
  "Theater brings stories to life through performance and acting.",
  "Meditation helps reduce stress and improve mental clarity.",
  "Bicycles are an eco-friendly way to travel and stay fit.",
  "Poetry uses words to create beautiful and meaningful expressions.",
  "Astronomy explores the mysteries of the universe beyond Earth.",
  "Painting allows artists to bring their imagination to life.",
  "The forest is home to diverse wildlife and ancient trees.",
  "Philosophy encourages deep thinking about life's big questions.",
  "Sculpture creates three-dimensional art from various materials.",
  "The desert landscape is both harsh and strikingly beautiful.",
  "Literature transports us to different worlds and perspectives.",
  "Swimming is a refreshing way to exercise and stay cool.",
  "Architecture shapes the spaces where we live and work.",
  "Psychology studies human behavior and mental processes.",
  "The river flows steadily, carving paths through the land.",
  "Film combines visual storytelling with sound and music.",
  "Hiking allows us to explore nature and challenge ourselves.",
  "The city lights create a magical atmosphere at night.",
  "Yoga promotes flexibility, strength, and inner peace.",
  "Chemistry explains how substances interact and transform.",
  "The beach offers relaxation and fun in the sun.",
  "Journalism informs the public about important events.",
  "The meadow is filled with colorful flowers and buzzing bees."
];

let currentSentence = "";
let currentInput = "";
let mistakes = 0;
let totalChars = 0;
let correctChars = 0;
let playing = false;
let startTime = 0;
let gameTimer;
let sentenceCount = 0;
let totalSentences = 0;
let sentenceCompleted = false;

mainBtn.onclick = startGame;
wordInput.addEventListener("input", handleInput);

function startGame() {
  mistakes = 0;
  totalChars = 0;
  correctChars = 0;
  totalSentences = parseInt(wordsInput.value, 10) || 10;
  if (totalSentences < 5) totalSentences = 10;

  sentenceCount = 0;
  playing = true;
  startTime = Date.now();

  scoreEl.textContent = sentenceCount;
  mistakesEl.textContent = mistakes;
  accuracyEl.textContent = "100%";
  wpsEl.textContent = "0";

  container.style.display = "none";
  stats.style.display = "flex";
  gameArea.style.display = "flex";
  wordInput.value = "";
  wordInput.focus();

  // Start the WPS update
  gameTimer = setInterval(updateWps, 100);

  pickNewSentence();
}

function pickNewSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  currentInput = "";
  sentenceCompleted = false;
  displaySentence();
  wordInput.value = "";
  wordInput.focus();
}

function displaySentence() {
  let displayText = '';
  const inputLength = currentInput.length;
  const sentenceLength = currentSentence.length;

  for (let i = 0; i < sentenceLength; i++) {
    if (sentenceCompleted || i < inputLength) {
      // Character has been typed or sentence is completed
      if (i < inputLength && currentInput[i] === currentSentence[i]) {
        // Correctly typed
        displayText += '<span class="correct">' + currentSentence[i] + '</span>';
      } else {
        // Incorrectly typed or not typed
        displayText += '<span class="incorrect">' + currentSentence[i] + '</span>';
      }
    } else if (i === inputLength) {
      // Current cursor position
      displayText += '<span class="current">' + currentSentence[i] + '</span>';
    } else {
      // Remaining characters
      displayText += '<span class="remaining">' + currentSentence[i] + '</span>';
    }
  }

  wordDisplay.innerHTML = displayText;
}

function handleInput(event) {
  if (!playing || sentenceCompleted) return;

  currentInput = wordInput.value;
  const inputLength = currentInput.length;
  const sentenceLength = currentSentence.length;

  // Count correct characters and mistakes
  correctChars = 0;
  let currentMistakes = 0;

  for (let i = 0; i < Math.min(inputLength, sentenceLength); i++) {
    if (currentInput[i] === currentSentence[i]) {
      correctChars++;
    } else {
      currentMistakes++;
    }
  }

  // Add mistakes for extra characters
  if (inputLength > sentenceLength) {
    currentMistakes += (inputLength - sentenceLength);
  }

  // Only count new mistakes (incremental)
  if (currentMistakes > mistakes) {
    mistakes += (currentMistakes - mistakes);
  }

  totalChars = Math.max(totalChars, inputLength);

  updateUI();
  displaySentence();

  // Check if sentence is completed (user has typed all characters)
  if (inputLength >= sentenceLength) {
    sentenceCompleted = true;
    sentenceCount++;
    scoreEl.textContent = sentenceCount;

    if (sentenceCount >= totalSentences) {
      endGame();
    } else {
      setTimeout(pickNewSentence, 500); // Brief pause before next sentence
    }
  }
}

function updateUI() {
  mistakesEl.textContent = mistakes;
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  accuracyEl.textContent = accuracy + "%";
}

function updateWps() {
  if (!playing) return;
  const elapsed = (Date.now() - startTime) / 1000; // seconds
  const wps = elapsed > 0 ? (sentenceCount / elapsed).toFixed(2) : "0.00";
  wpsEl.textContent = wps;
}

function endGame() {
  playing = false;
  clearInterval(gameTimer);
  gameArea.style.display = "none";
  stats.style.display = "none";

  const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  const finalTime = (Date.now() - startTime) / 1000; // seconds
  const finalWps = finalTime > 0 ? (sentenceCount / finalTime).toFixed(2) : "0.00";

  gameOverScore.textContent = sentenceCount;
  gameOverMistakes.textContent = mistakes;
  gameOverAccuracy.textContent = finalAccuracy + "%";
  gameOverWps.textContent = finalWps;

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