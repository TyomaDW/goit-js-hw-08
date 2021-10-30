import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const TIME_KEY = 'videoplayer-current-time';
const player = new Player('vimeo-player');

function onVideoPlay() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(TIME_KEY, seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}

player.on('timeupdate', throttle(onVideoPlay, 1000));

const currentTime = localStorage.getItem(TIME_KEY);

player.setCurrentTime(currentTime).catch(function (error) {
  console.log(error);
});
