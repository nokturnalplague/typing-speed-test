export function speedTest() {
  const home = document.querySelector('.home');
  const startBtn = document.querySelector('#start');
  const settings = document.querySelectorAll('.settings input[type="radio"]');
  const input = document.querySelector('#value');

  const textEl = document.querySelector('#text');
  const text = textEl.innerText;
  const textArray = Array.from(text);
  const textLen = textArray.length;

  function finishTest(inputArray) {
    input.removeEventListener('input', changeColor);
    input.disabled = true;

    // !!
    let time = '0:60';

    handleStats(inputArray, time);
  }

  function handleStats(inputArray, time) {
    //WPM
    const len = parseInt(inputArray.length, 10);
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const wpm = len / 5 / (totalSeconds / 60);

    // wpm, acc, best, right, wrong
    // textArray
  }

  function timer() {
    //
  }

  function changeColor() {
    const inputValue = input.value;
    const inputArray = Array.from(inputValue);

    const coloredText = textArray.map((char, i, text) => {
      const span = document.createElement('span');
      span.innerText = char;

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
    home.classList.remove('pending');
    settings.forEach((setting) => {
      setting.disabled = true;
    });

    input.focus();
    input.addEventListener('input', changeColor);
    input.addEventListener('keydown', timer, { once: true });
  }

  home.addEventListener('click', beginTest);
  startBtn.addEventListener('click', beginTest);
}
