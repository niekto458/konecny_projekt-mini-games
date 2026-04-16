const target = document.getElementById("target");
const area = document.getElementById("area");
const scoreEl = document.getElementById("score");
const diffSelect = document.getElementById("difficulty");

let score = 0;
let moveInterval;

document.getElementById("start").onclick = () => {
  score = 0;
  scoreEl.textContent = score;
  startDifficulty(diffSelect.value);
};

target.onclick = () => {
  score++;
  scoreEl.textContent = score;
  moveTarget();
};

function startDifficulty(diff) {
  clearInterval(moveInterval);

  let size, speed;

  if (diff === "easy") {
    size = 60; speed = 0;
  } else if (diff === "medium") {
    size = 40; speed = 800;
  } else {
    size = 25; speed = 300;
  }

  target.style.width = size + "px";
  target.style.height = size + "px";

  moveTarget();

  if (speed > 0) {
    moveInterval = setInterval(moveTarget, speed);
  }
}

function moveTarget() {
  const maxX = area.clientWidth - target.clientWidth;
  const maxY = area.clientHeight - target.clientHeight;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}
