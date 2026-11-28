import { changeMain } from './changeMain.js';

async function getData() {
  try {
    const response = await fetch(new URL('../data/data.json', import.meta.url));

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function initialLoad() {
  const data = await getData();

  if (!data) {
    changeMain('err');
    return false;
  }

  let best, wpm, acc;

  const bestEl = document.querySelector('#best');
  bestEl.innerText = best ? `${best} WPM` : '-- WPM';

  /* TEXT */

  const textEl = document.querySelector('#text');

  function updateText(id) {
    const passages = data[id];
    const len = passages.length;
    const number = Math.floor(Math.random() * len);

    const text = passages[number].text;
    textEl.innerText = text;
  }

  /* STATS */

  const wpmEl = document.querySelector('#wpm');
  wpmEl.innerText = wpm ? wpm : '0';

  const accEl = document.querySelector('#acc');
  accEl.innerText = acc ? `${acc}%` : '0%';

  const timeEl = document.querySelector('#time');

  function updateTime(id) {
    switch (id) {
      case '60s':
        timeEl.innerText = '1:00';
        break;
      case '120s':
        timeEl.innerText = '2:00';
        break;
      default:
        timeEl.innerText = '0:00';
    }
  }

  /* SETTINGS */

  const difficulties = document.querySelectorAll(
    '.difficulty input[type="radio"]',
  );
  const modes = document.querySelectorAll('.mode input[type="radio"]');

  function settingsActive(setting, callback) {
    if (setting.length) {
      const initial = setting[0];
      initial.checked = true;
      callback(initial.id);

      setting.forEach((item) => {
        item.addEventListener('change', (e) => {
          callback(e.currentTarget.id);
        });
      });
    }
  }

  settingsActive(difficulties, updateText);
  settingsActive(modes, updateTime);

  return true;
}

export { initialLoad };
