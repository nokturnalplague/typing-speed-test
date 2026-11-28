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

function calculateAcc() {
  /* RIGHT, WRONG & ACC (CONSIDERA APAGADOS) */
}

export { calculateAcc, calculateWpm, getStats, setStats };
