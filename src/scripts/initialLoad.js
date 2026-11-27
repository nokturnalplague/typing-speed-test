import { changeMain } from './changeMain.js';

let best, wpm, acc;

const mainHome = document.querySelector('.main-home');
const bestEl = document.querySelector('#best');
bestEl.innerText = best ? `${best} WPM` : '-- WPM';

/* TEXT */

async function getData() {
  try {
    const response = await fetch(new URL('../data/data.json', import.meta.url));

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const data = await getData();

if (data) {
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
        timeEl.innerText = '0:60';
        break;
      case 'pass':
        timeEl.innerText = '0:00';
        break;
      default:
        timeEl.innerText = '0:00';
    }
  }

  /* SETTINGS */

  const difficulties = document.querySelectorAll('.difficulty ul li');
  const modes = document.querySelectorAll('.mode ul li');

  function settingsActive(setting, callback) {
    if (setting.length) {
      const initial = setting[0].querySelector('input');
      initial.checked = true;
      callback(initial.id);

      setting.forEach((item) => {
        item.querySelector('input').addEventListener('change', (e) => {
          callback(e.currentTarget.id);
        });
      });
    }
  }

  settingsActive(difficulties, updateText);
  settingsActive(modes, updateTime);
} else {
  changeMain('err');
}
