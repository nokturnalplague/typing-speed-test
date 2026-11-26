/*
err = erro
frst = first test
nwpb = new personal best
rslt = result
*/

let wpm, acc, right, wrong;

export function changeMain(page) {
  const bestEl = document.querySelector('#best');
  bestEl.innerText = wpm ? `${best} WPM` : '-- WPM';

  const main = document.querySelector('main');
  main.classList.add('container', 'result');

  /* CONTENT */

  const resultContent = document.createElement('div');
  resultContent.classList.add('result-content');

  /* ICON */

  const icon = document.createElement('img');

  icon.addEventListener('load', () => {
    icon.width = icon.naturalWidth;
    icon.height = icon.naturalHeight;
  });

  /* TEXT */

  const text = document.createElement('div');
  text.classList.add('text');

  const textTitle = document.createElement('h1');
  textTitle.classList.add('bold', 'xl', 'n0');
  text.appendChild(textTitle);

  const textQuote = document.createElement('p');
  textQuote.classList.add('regular', 'm', 'n1');
  text.appendChild(textQuote);

  /* STATS */

  const stats = document.createElement('div');
  stats.classList.add('stats');

  const statsUl = document.createElement('ul');
  stats.appendChild(statsUl);

  const statsLi = document.createElement('li');
  statsLi.classList.add('regular', 'm', 'n1');
  const liSpan = document.createElement('span');
  liSpan.classList.add('medium', 'l', 'n0');

  const wpmLi = statsLi.cloneNode();
  const wpmEl = liSpan.cloneNode();
  wpmEl.id = 'wpm';
  wpmEl.innerText = wpm ? `${wpm}` : '0';
  wpmLi.append('WPM: ', wpmEl);

  const accLi = statsLi.cloneNode();
  const accEl = liSpan.cloneNode();
  accEl.id = 'acc';
  accEl.innerText = acc ? `${acc}%` : '0%';
  accLi.append('Accuracy: ', accEl);

  const charLi = statsLi.cloneNode();
  const charEl = liSpan.cloneNode();
  const charRgtEl = document.createElement('span');
  charRgtEl.id = 'right';
  charRgtEl.classList.add('grn');
  charRgtEl.innerText = right ? right : '0';
  const charLftEl = document.createElement('span');
  charLftEl.id = 'wrong';
  charLftEl.classList.add('red');
  charLftEl.innerText = wrong ? wrong : '0';
  charEl.append(charRgtEl, '/', charLftEl);
  charLi.append('Characters: ', charEl);

  statsUl.append(wpmLi, accLi, charLi);

  /* BUTTON */

  const button = document.createElement('button');
  button.classList.add('button-2', 'medium', 'm', 'n4');
  button.tabIndex = 0;

  const buttonImg = document.createElement('img');
  buttonImg.src = './src/pictures/icon-restart.svg';

  if (page === 'err' || page === 'rslt') {
    button.append('Try Again', buttonImg);
  } else {
    button.append('Beat This Score', buttonImg);
  }

  button.addEventListener('click', () => {
    window.location.reload();
  });

  /* LAST DIV */

  const lastDiv = document.createElement('div');

  /* CHANGES */

  switch (page) {
    case 'err':
      icon.src = './src/pictures/icon-error.svg';
      textTitle.innerText = 'Something Went Wrong!';
      textQuote.innerText =
        "We couldn't load your typing challenge. Give it another try!";
      resultContent.append(icon, text, button);
      break;
    case 'frst':
      main.classList.add('stars');
      icon.src = './src/pictures/icon-completed.svg';
      textTitle.innerText = 'Baseline Established!';
      textQuote.innerText =
        "You've set the bar. Now the real challenge begins — time to beat it.";
      resultContent.append(icon, text, stats, button);
      break;
    case 'nwpb':
      main.classList.add('confetti');
      icon.src = './src/pictures/icon-new-pb.svg';
      textTitle.innerText = 'High Score Smashed!';
      textQuote.innerText =
        "You're getting faster. That was incredible typing.";
      resultContent.append(icon, text, stats, button);
      break;
    case 'rslt':
      main.classList.add('stars');
      icon.src = './src/pictures/icon-completed.svg';
      textTitle.innerText = 'Test Complete!';
      textQuote.innerText = 'Solid run. Keep pushing to beat your high score.';
      resultContent.append(icon, text, stats, button);
      break;
  }

  main.replaceChildren(resultContent, lastDiv);
}
