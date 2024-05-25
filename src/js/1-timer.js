import iziToast from 'izitoast';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const datetimePicker = document.querySelector('#datetime-picker');

startBtn.disabled = true;
let selectedDate;
const currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  const interval = setInterval(() => {
    const currentDate = new Date();

    const msDiff = selectedDate - currentDate;
    if (msDiff <= 0) {
      clearInterval(interval);
      startBtn.disabled = false;

      return;
    }
    const { days, hours, minutes, seconds } = convertMs(msDiff);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
});

function addLeadingZero(element) {
  if (element < 10) {
    return '0' + element;
  } else {
    return element;
  }}