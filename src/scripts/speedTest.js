import { calculateAcc, calculateWpm, setStats } from './handleStats.js';

function speedTest() {
  const home = document.querySelector('.home');
  const startBtn = document.querySelector('#start');
  const settings = document.querySelectorAll('.settings input[type="radio"]');
  const input = document.querySelector('#value');

  const wpmEL = document.querySelector('#wpm');
  const accEl = document.querySelector('#acc');
  const timeEl = document.querySelector('#time');

  let activeMode;

  const textEl = document.querySelector('#text');
  let text, textArray, textLen;

  let started, interval;

  function finishTest(inputArray) {
    input.disabled = true;
    input.removeEventListener('input', changeColor);
    input.removeEventListener('selectionchange', changeColor);

    clearInterval(interval);
  }

  function timer() {
    started = performance.now();

    interval = setInterval(() => {
      const time = (performance.now() - started) / 1000;

      let timeValue;

      if (activeMode === '60s') {
        timeValue = Math.max(0, Math.ceil(60 - time));
      } else if (activeMode === '120s') {
        timeValue = Math.max(0, Math.ceil(120 - time));
      } else {
        timeValue = Math.floor(time);
      }

      const minutes = Math.floor(timeValue / 60);
      const seconds = String(timeValue % 60).padStart(2, '0');

      timeEl.innerText = `${minutes}:${seconds}`;

      if (activeMode === '60s' && time >= 60) {
        finishTest(Array.from(input.value));
      } else if (activeMode === '120s' && time >= 120) {
        finishTest(Array.from(input.value));
      }
    }, 100);
  }

  function changeColor() {
    const inputValue = input.value;
    const inputArray = Array.from(inputValue);

    const time = (performance.now() - started) / 1000;

    // const { right, wrong, acc } = calculateAcc(inputArray, textArray);

    const coloredText = textArray.map((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;

      const caretPosition = input.selectionStart;
      if (i === caretPosition) {
        span.classList.add('caret');
      }

      if (i >= inputArray.length) {
        return span;
      }

      if (char === ' ') {
        span.classList.add('space');
      }

      if (char === inputArray[i]) {
        span.style.color = 'var(--grn)';
      } else {
        span.style = 'color: var(--red); border-bottom: 2px solid var(--red);';
      }

      return span;
    });

    textEl.replaceChildren(...coloredText);
    if (inputArray.length >= textLen) {
      finishTest(inputArray);
    }
  }

  function beginTest() {
    if (!home.classList.contains('pending')) {
      return;
    }

    home.classList.remove('pending');
    settings.forEach((setting) => {
      setting.disabled = true;
    });

    text = textEl.textContent;
    textArray = Array.from(text);
    textLen = textArray.length;

    activeMode = document.querySelector('.mode input:checked').id;

    input.focus();
    input.addEventListener('input', changeColor);
    input.addEventListener('selectionchange', changeColor);
    timer();
    changeColor();
  }

  home.addEventListener('click', beginTest);
  startBtn.addEventListener('click', beginTest);
}

export { speedTest };
