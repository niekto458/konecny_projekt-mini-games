const target = document.getElementById("target");
const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const diff = document.getElementById("difficulty");

let score = 0;
let interval;

document.getElementById("start").onclick = () => {
  clearInterval(interval);
  score = 0;
  scoreEl.textContent = score;
  setup(diff.value);
};

target.onclick = () => {
  score++;
  scoreEl.textContent = score;
  moveTarget();
};

function setup(mode) {
  let size, speed;

  if (mode === "easy") {
    size = 70; speed = 0;
  } else if (mode === "medium") {
    size = 45; speed = 800;
  } else {
    size = 25; speed = 300;
  }

  target.style.width = size + "px";
  target.style.height = size + "px";

  moveTarget();

  if (speed > 0) {
    interval = setInterval(moveTarget, speed);
  }
}

function moveTarget() {
  const maxX = arena.clientWidth - target.clientWidth;
  const maxY = arena.clientHeight - target.clientHeight;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}
