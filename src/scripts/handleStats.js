function setStats(right, wrong, acc, wpm) {
  localStorage.setItem('right', right);
  localStorage.setItem('wrong', wrong);
  localStorage.setItem('acc', acc);
  localStorage.setItem('wpm', wpm);

  const best = localStorage.getItem('best');
  if (best === null && wpm > best) {
    localStorage.setItem('best', wpm);
  }
}

function calculateWpm(typed, time) {
  if (time === 0) {
    return 0;
  }
  const wpm = Math.round(typed / 5 / (time / 60));
  return wpm;
}

function calculateAcc(right, wrong) {
  const total = right + wrong;
  let acc = total > 0 ? Math.round((right * 100) / total) : 0;
  return acc;
}

export { calculateAcc, calculateWpm, setStats };
