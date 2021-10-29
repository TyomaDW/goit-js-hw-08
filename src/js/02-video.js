const throttle = require('lodash.throttle');
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

if (localStorage.getItem(TIME_KEY)) {
  player.setCurrentTime(localStorage.getItem(TIME_KEY));
}

const onPlay = e => {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(TIME_KEY, seconds);
    })
    .catch(function (error) {
      console.log(error.name);
      console.log(error.message);
    });
};

const lodashThrottle = throttle(onPlay, 1000);

player.on('play', lodashThrottle);
