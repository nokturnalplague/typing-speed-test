import { changeMain } from './changeMain.js';
import { calculateAcc, calculateWpm, setStats } from './handleStats.js';

function speedTest() {
  const home = document.querySelector('.home');
  const startBtn = document.querySelector('#start');
  const settings = document.querySelectorAll('.settings input[type="radio"]');
  const input = document.querySelector('#value');

  const wpmEl = document.querySelector('#wpm');
  const accEl = document.querySelector('#acc');
  const timeEl = document.querySelector('#time');

  let activeMode;

  const textEl = document.querySelector('#text');
  let text, textArray, textLen;

  let started, interval;
  let right, wrong, typed;

  function finishTest() {
    input.disabled = true;
    input.removeEventListener('input', countAttempts);
    input.removeEventListener('input', changeColor);
    input.removeEventListener('selectionchange', changeColor);

    const time = (performance.now() - started) / 1000;
    const acc = calculateAcc(right, wrong);
    const wpm = calculateWpm(typed, time);
    const best = localStorage.getItem('best');

    let page;
    if (best === null) {
      page = 'frst';
    } else if (wpm > best) {
      page = 'nwpb';
    } else {
      page = 'rslt';
    }

    setStats(right, wrong, acc, wpm);
    changeMain(page);
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

      const wpm = calculateWpm(typed, time);
      wpmEl.innerText = wpm;

      const minutes = Math.floor(timeValue / 60);
      const seconds = String(timeValue % 60).padStart(2, '0');

      timeEl.innerText = `${minutes}:${seconds}`;

      if (!(activeMode === 'pass')) {
        timeEl.style.color = 'var(--yel)';
        if (timeValue <= 10) {
          timeEl.style.color = 'var(--red)';
        }
      }

      if (activeMode === '60s' && time >= 60) {
        finishTest();
      } else if (activeMode === '120s' && time >= 120) {
        finishTest();
      }
    }, 1000);
  }

  function countAttempts(e) {
    if (e.data === null) return;

    const position = input.selectionStart - 1;

    if (e.data === textArray[position]) {
      right++;
    } else {
      wrong++;
    }

    typed = right + wrong;
  }

  function changeColor() {
    const inputValue = input.value;
    const inputArray = Array.from(inputValue);
    const inputLen = inputArray.length;

    const time = (performance.now() - started) / 1000;

    const acc = calculateAcc(right, wrong);
    accEl.innerText = `${acc}%`;
    if (acc === 100) {
      accEl.style.color = 'var(--grn)';
    } else if (acc < 50) {
      accEl.style.color = 'var(--red)';
    } else {
      accEl.style.color = 'var(--yel)';
    }

    const coloredText = textArray.map((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;

      const caretPosition = input.selectionStart;
      if (i === caretPosition) {
        span.classList.add('caret');
      }

      if (i >= inputLen) {
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
    if (inputLen >= textLen) {
      finishTest();
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

    right = 0;
    wrong = 0;
    typed = 0;

    input.focus();
    input.addEventListener('input', countAttempts);
    input.addEventListener('input', changeColor);
    input.addEventListener('selectionchange', changeColor);
    timer();
    changeColor();
  }

  home.addEventListener('click', beginTest);
  startBtn.addEventListener('click', beginTest);
}

export { speedTest };
