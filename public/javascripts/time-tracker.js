// -- HTML elements -- //
const timerLabel = document.getElementById("timerLabel");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

// -- HTML event listeners -- //
startButton.addEventListener("click", (event) => {
  event.preventDefault();
  startTimer();
});

stopButton.addEventListener("click", (event) => {
  event.preventDefault();
  stopTimer();
});

resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  resetTimer();
});

// -- Functions that actually do stuff -- //
let minutes = 0;
let seconds = 0;

// This will store the timer interval we use
let interval;

function startTimer() {
  interval = setInterval(function () {
    if (seconds === 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }

    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

    const timeText = `${formattedMinutes} : ${formattedSeconds}`;

    timerLabel.innerText = timeText;
  }, 1000);
}

function stopTimer() {
  if (interval) {
    clearInterval(interval);
  }
}

function resetTimer() {
  seconds = 0;
  minutes = 0;
  timerLabel.innerText = "00 : 00";
}
