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
  { text: "The ___ cat sat on the ___ mat.", blanks: ["quick", "welcome"] },
  { text: "I like to eat ___ and ___ for breakfast.", blanks: ["eggs", "toast"] },
  { text: "The weather is ___ today in ___.", blanks: ["sunny", "spring"] },
  { text: "My favorite color is ___ and I love ___.", blanks: ["blue", "painting"] },
  { text: "The ___ dog ran through the ___ park.", blanks: ["happy", "beautiful"] },
  { text: "She reads ___ books about ___ history.", blanks: ["interesting", "ancient"] },
  { text: "We need to buy ___ and ___ at the store.", blanks: ["milk", "bread"] },
  { text: "The ___ bird sings a ___ song.", blanks: ["colorful", "beautiful"] },
  { text: "He plays ___ with his ___ friends.", blanks: ["soccer", "best"] },
  { text: "The ___ computer runs very ___ software.", blanks: ["fast", "efficient"] },
  { text: "I enjoy drinking ___ tea on ___ mornings.", blanks: ["hot", "cold"] },
  { text: "The ___ mountain is covered in ___ snow.", blanks: ["tall", "fresh"] },
  { text: "She wears a ___ dress to the ___ party.", blanks: ["red", "fancy"] },
  { text: "The ___ car drives on the ___ road.", blanks: ["new", "busy"] },
  { text: "He eats ___ fruit with ___ yogurt.", blanks: ["fresh", "plain"] },
  { text: "The ___ flower blooms in ___ gardens.", blanks: ["beautiful", "colorful"] },
  { text: "I write with a ___ pen on ___ paper.", blanks: ["blue", "white"] },
  { text: "The ___ sun sets over the ___ ocean.", blanks: ["golden", "vast"] },
  { text: "She bakes ___ cookies in the ___ oven.", blanks: ["delicious", "hot"] },
  { text: "The ___ tree grows in the ___ forest.", blanks: ["tall", "dense"] },
  { text: "He rides his ___ bike on ___ paths.", blanks: ["red", "winding"] },
  { text: "The ___ moon shines in the ___ sky.", blanks: ["bright", "clear"] },
  { text: "I read ___ stories to my ___ children.", blanks: ["funny", "young"] },
  { text: "The ___ river flows through the ___ valley.", blanks: ["wide", "green"] },
  { text: "She paints ___ pictures with ___ brushes.", blanks: ["amazing", "soft"] },
  { text: "The ___ wind blows through the ___ trees.", blanks: ["gentle", "tall"] },
  { text: "He builds ___ houses with ___ tools.", blanks: ["strong", "sharp"] },
  { text: "The ___ star twinkles in the ___ night.", blanks: ["bright", "dark"] },
  { text: "I cook ___ food in the ___ kitchen.", blanks: ["tasty", "modern"] },
  { text: "The ___ cloud floats in the ___ sky.", blanks: ["white", "blue"] },
  { text: "She sings ___ songs with her ___ voice.", blanks: ["beautiful", "clear"] },
  { text: "The ___ book teaches about ___ science.", blanks: ["thick", "complex"] },
  { text: "He plays ___ music on his ___ guitar.", blanks: ["jazz", "acoustic"] },
  { text: "The ___ rain falls on the ___ ground.", blanks: ["heavy", "wet"] },
  { text: "I draw ___ pictures with ___ crayons.", blanks: ["colorful", "bright"] },
  { text: "The ___ fire burns in the ___ fireplace.", blanks: ["warm", "cozy"] },
  { text: "She dances ___ moves to ___ rhythm.", blanks: ["graceful", "fast"] },
  { text: "The ___ ice melts in the ___ sun.", blanks: ["thick", "hot"] },
  { text: "He writes ___ letters with ___ ink.", blanks: ["long", "black"] },
  { text: "The ___ wave crashes on the ___ beach.", blanks: ["big", "sandy"] },
  { text: "I plant ___ flowers in the ___ garden.", blanks: ["pretty", "lush"] },
  { text: "The ___ clock ticks on the ___ wall.", blanks: ["old", "white"] },
  { text: "She knits ___ scarves with ___ yarn.", blanks: ["warm", "soft"] },
  { text: "The ___ train travels on ___ tracks.", blanks: ["fast", "steel"] },
  { text: "He paints ___ walls with ___ paint.", blanks: ["white", "fresh"] },
  { text: "The ___ butterfly flies over ___ fields.", blanks: ["colorful", "green"] },
  { text: "I drink ___ water from the ___ fountain.", blanks: ["cold", "clear"] },
  { text: "The ___ candle burns with ___ light.", blanks: ["scented", "soft"] },
  { text: "She teaches ___ lessons to ___ students.", blanks: ["important", "eager"] },
  { text: "The ___ bridge spans the ___ river.", blanks: ["long", "wide"] },
  { text: "He fixes ___ cars with ___ tools.", blanks: ["broken", "special"] },
  { text: "The ___ snow falls on ___ mountains.", blanks: ["white", "high"] }
];

let wordCount = 0;
let wordsRemaining = 0;
let score = 0;
let mistakes = 0;
let totalWords = 0;
let currentSentence = null;
let currentBlankIndex = 0;
let playing = false;
let startTime = 0;
let totalCorrectLetters = 0;
let totalLetters = 0;
let gameTimer;
let wordAttempts = [];

mainBtn.onclick = startGame;
wordInput.addEventListener("keypress", handleKeyPress);

function startGame() {
  score = 0;
  mistakes = 0;
  totalWords = parseInt(wordsInput.value, 10) || 10;
  if (totalWords < 5) totalWords = 10;
  
  wordsRemaining = totalWords;
  wordCount = 0;
  playing = true;
  startTime = Date.now();
  totalCorrectLetters = 0;
  totalLetters = 0;
  wordAttempts = [];

  scoreEl.textContent = score;
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
  currentBlankIndex = 0;
  displaySentence();
  wordInput.value = "";
  wordInput.focus();
}

function displaySentence() {
  const parts = currentSentence.text.split('___');
  let displayText = '';
  
  for (let i = 0; i < parts.length; i++) {
    displayText += parts[i];
    if (i < currentSentence.blanks.length) {
      if (i < currentBlankIndex) {
        // Already filled blank
        displayText += '<span class="filled-blank">' + currentSentence.blanks[i] + '</span>';
      } else if (i === currentBlankIndex) {
        // Current blank to fill
        displayText += '<span class="current-blank">___</span>';
      } else {
        // Future blank - don't show yet
        displayText += '<span class="future-blank">___</span>';
      }
    }
  }
  
  wordDisplay.innerHTML = displayText;
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

  const correctWord = currentSentence.blanks[currentBlankIndex].toLowerCase();
  
  // Calculate letter-by-letter accuracy
  const maxLength = Math.max(userWord.length, correctWord.length);
  let correctLetters = 0;

  for (let i = 0; i < maxLength; i++) {
    if (i < userWord.length && i < correctWord.length && userWord[i] === correctWord[i]) {
      correctLetters++;
    }
  }

  totalCorrectLetters += correctLetters;
  totalLetters += correctWord.length;

  // Count as mistake if less than 80% of letters are correct
  const wordAccuracy = (correctLetters / correctWord.length) * 100;
  const isCorrect = wordAccuracy >= 80;
  
  if (isCorrect) {
    score++;
  } else {
    mistakes++;
  }

  // Store the attempt
  wordAttempts.push({
    target: correctWord,
    userInput: wordInput.value.trim(),
    correct: isCorrect,
    letterAccuracy: wordAccuracy,
    sentence: currentSentence.text,
    blankIndex: currentBlankIndex
  });

  scoreEl.textContent = score;
  mistakesEl.textContent = mistakes;

  updateUI();

  // Move to next blank or next sentence
  currentBlankIndex++;
  if (currentBlankIndex >= currentSentence.blanks.length) {
    // Sentence completed, check if we need more sentences
    if (wordCount >= totalWords) {
      endGame();
    } else {
      pickNewSentence();
    }
  } else {
    // Next blank in current sentence
    displaySentence();
    wordInput.value = "";
    wordInput.focus();
  }
}

function updateUI() {
  const accuracy = totalLetters > 0 ? Math.round((totalCorrectLetters / totalLetters) * 100) : 100;
  accuracyEl.textContent = accuracy + "%";
}

function updateWps() {
  if (!playing) return;
  const elapsed = (Date.now() - startTime) / 1000; // seconds
  const wps = elapsed > 0 ? (wordCount / elapsed).toFixed(2) : "0.00";
  wpsEl.textContent = wps;
}

function endGame() {
  playing = false;
  clearInterval(gameTimer);
  gameArea.style.display = "none";
  stats.style.display = "none";

  const finalAccuracy = totalLetters > 0 ? Math.round((totalCorrectLetters / totalLetters) * 100) : 100;
  const finalTime = (Date.now() - startTime) / 1000; // seconds
  const finalWps = finalTime > 0 ? (wordCount / finalTime).toFixed(2) : "0.00";

  gameOverScore.textContent = score;
  gameOverMistakes.textContent = mistakes;
  gameOverAccuracy.textContent = finalAccuracy + "%";
  gameOverWps.textContent = finalWps;

  // Display mistakes
  displayMistakes();

  gameOverModal.classList.add("show");
  gameOverModal.style.display = "flex";
}

function displayMistakes() {
  const mistakesSection = document.getElementById("mistakesSection");
  const mistakesList = document.getElementById("mistakesList");
  
  const incorrectAttempts = wordAttempts.filter(attempt => !attempt.correct);
  
  if (incorrectAttempts.length > 0) {
    mistakesList.innerHTML = "";
    incorrectAttempts.forEach((attempt, index) => {
      const mistakeDiv = document.createElement("div");
      mistakeDiv.className = "mistake-item";
      mistakeDiv.innerHTML = `
        <div class="mistake-sentence">Sentence: <strong>${attempt.sentence}</strong></div>
        <div class="mistake-target">Target word: <strong>${attempt.target}</strong></div>
        <div class="mistake-input">You typed: <strong>${attempt.userInput || "(empty)"}</strong></div>
        <div class="mistake-accuracy">Accuracy: ${attempt.letterAccuracy.toFixed(1)}%</div>
      `;
      mistakesList.appendChild(mistakeDiv);
    });
    mistakesSection.style.display = "block";
  } else {
    mistakesSection.style.display = "none";
  }
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

