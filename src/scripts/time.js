// first - npm install moment
import moment from 'moment';

/**
 *the function processes the ntml fields of the page
  and displays the required number of minutes of the timer using  the buttons.
  After pressing the start button, the timer starts counting down. When you click stop,
  the timer stops and you can start over
 */
export default function timer() {
  const minus = document.getElementById('buttonMinus');
  const plus = document.getElementById('buttonPlus');
  const start = document.getElementById('buttonStart');
  let exitTimer;
  /**
 * function reads the number of minutes per page from the element with id='minuts'
 * @returns the number of minutes in number type
 */
  function getMinuts() {
    const view = document.getElementById('minuts');
    return +view.innerHTML;
  }
  /**
 * the function of displaying information on the page
 * @param {*} minuts timer data to display
 */
  function viewMinuts(minuts) {
    const view = document.getElementById('minuts');
    view.innerHTML = minuts;
  }

  function minusMinuts() {
    let minuts = getMinuts();
    if (minuts > 0) {
      minuts -= 1;
    }
    viewMinuts(minuts);
  }

  function plusMinuts() {
    let minuts = getMinuts();
    minuts += 1;
    viewMinuts(minuts);
  }

  function startTimer() {
    function stopTimer() {
      clearInterval(exitTimer);
      start.innerHTML = 'Start';
      viewMinuts('0');
      start.removeEventListener('click', stopTimer);
      start.addEventListener('click', startTimer);
    }

    const minuts = getMinuts();
    if (minuts !== 0) {
      start.innerHTML = 'Stop';
      start.removeEventListener('click', startTimer);
      start.addEventListener('click', stopTimer);

      let startTime = moment.duration(minuts, 'minutes');
      const oneSec = moment.duration(1, 'seconds');

      exitTimer = setInterval(() => {
        startTime = startTime.subtract(oneSec);
        const hour = startTime.hours();
        const min = startTime.minutes();
        let sec = startTime.seconds();
        if (sec.length < 2) { sec = `0${sec}`; }
        if (hour === 0) {
          viewMinuts(`${min}:${sec}`);
        } else {
          viewMinuts(`${hour}:${min}:${sec}`);
        }
        if (hour === 0 && min === 0 && sec === 0) {
          clearInterval(exitTimer);
        }
      }, 1000);
    }
  }

  minus.addEventListener('click', minusMinuts);
  plus.addEventListener('click', plusMinuts);
  start.addEventListener('click', startTimer);
}
