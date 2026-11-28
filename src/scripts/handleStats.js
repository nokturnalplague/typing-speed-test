function setStats() {}

function calculateWpm(inputArray, time) {
  const len = inputArray.length;

  /* WPM */

  const [minutes, seconds] = time.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const wpm = len / 5 / (totalSeconds / 60);

  return wpm;
}

function getStats() {}

function calculateAcc(inputArray, textArray) {
  /* MUDAR CÁLCULO ACC PARA CONSIDERAR APAGADOS */

  const len = inputArray.length;

  /* RIGHT & WRONG */

  let right = 0;
  let wrong = 0;
  for (var i = 0; i < len; i++) {
    if (inputArray[i] === textArray[i]) {
      right++;
    } else {
      wrong++;
    }
  }

  /* ACC */
  let acc = len > 0 ? Math.round((right * 100) / len) : 0;

  return { right, wrong, acc };
}

export { calculateAcc, calculateWpm, getStats, setStats };
