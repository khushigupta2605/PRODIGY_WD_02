let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startPauseBtn = document.getElementById('startPauseBtn');

function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);

  display.textContent =
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}

function toggleStartPause() {
  if (isRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
  isRunning = true;
  startPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
}

function pauseStopwatch() {
  clearInterval(timer);
  isRunning = false;
  startPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  startPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
  laps.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = `Lap ${laps.children.length + 1} — ${display.textContent}`;
  laps.appendChild(li);
}

function clearLaps() {
  laps.innerHTML = '';
}
