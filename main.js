(function() {
  const timeInput = document.getElementById('start-time');
  const timeForm = document.getElementById('time-form');
  const timeEl = document.getElementById('countdown-time');
  const timeSpans = timeEl.getElementsByTagName('span');

  const toggleButton = document.getElementById('toggle-button');

  const msInSecond = 1000;
  const msInMinute = 60 * msInSecond;
  const msInHour = 60 * msInMinute;

  let startTime;

  function setTime() {
    const today = new Date();
    startTime = new Date(`${today.toDateString()}, ${timeInput.value}`);
    timeEl.setAttribute('datetime', startTime.toISOString());
  }

  function formatTime(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  function tick() {
    const now = Date.now();
    const msToStart = startTime - now;
    const hoursToStart = Math.floor(msToStart / msInHour);
    const minutesToStart = Math.floor((msToStart % msInHour) / msInMinute);
    const secondsToStart = Math.floor((msToStart % msInMinute) / msInSecond);
    const string = `${formatTime(hoursToStart)}:${formatTime(minutesToStart)}:${formatTime(secondsToStart)}`;
    string.split('').forEach((char, i) => {
      timeSpans[i].textContent = char;
    });
  }

  function startCountdown() {
    tick();
    setInterval(tick, msInSecond);
  }

  function toggleSettings() {
    timeForm.classList.toggle('is-hidden')
  }

  function bindEvents() {
    timeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      setTime();
      tick();
      toggleSettings();
    });

    toggleButton.addEventListener('click', () => {
      toggleSettings();
    });
  }

  function init() {
    setTime();
    startCountdown();
    bindEvents();
  }

  init();
}());
