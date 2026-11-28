function setStats() {}

function calculateWpm(typed, time) {
  if (time === 0) {
    return 0;
  }
  const wpm = Math.round(typed / 5 / (time / 60));
  return wpm;
}

function getStats() {}

function calculateAcc(right, wrong) {
  const total = right + wrong;
  let acc = total > 0 ? Math.round((right * 100) / total) : 0;
  return acc;
}

export { calculateAcc, calculateWpm, getStats, setStats };
