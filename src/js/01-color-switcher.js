const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', changeBgColor);
stopButton.addEventListener('click', stopChangeBgColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

function changeBgColor() {
  timerId = setInterval(() => {
  document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', 'disabled');
  stopButton.removeAttribute('disabled');
}

function stopChangeBgColor() {
  clearInterval(timerId);
  stopButton.setAttribute('disabled', 'disabled');
  startButton.removeAttribute('disabled');
}
