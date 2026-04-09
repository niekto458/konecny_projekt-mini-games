const container = document.getElementById("game");
const btn = document.getElementById("btn");
const message = document.getElementById("message");
const result = document.getElementById("result");

let startTime;
let waiting = false;
let timeout;

btn.onclick = () => {
  if (!waiting) {
    startGame();
  } else {
    recordReaction();
  }
};

function startGame() {
  result.textContent = "";
  message.textContent = "Wait for green...";
  btn.textContent = "WAIT";
  btn.disabled = true;
  container.style.background = "rgba(255,255,255,0.05)";

  const delay = Math.random() * 3000 + 2000;

  timeout = setTimeout(() => {
    container.style.background = "#00ff88";
    message.textContent = "CLICK!";
    btn.textContent = "CLICK";
    btn.disabled = false;
    waiting = true;
    startTime = Date.now();
  }, delay);
}

function recordReaction() {
  const reactionTime = Date.now() - startTime;
  result.textContent = `Your reaction time: ${reactionTime} ms`;
  resetGame();
}

function resetGame() {
  clearTimeout(timeout);
  waiting = false;
  btn.textContent = "START";
  message.textContent = "Click START and wait for green";
  container.style.background = "rgba(255,255,255,0.05)";
}
