import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  starButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.starButton.addEventListener('click', startOnClick);
refs.starButton.setAttribute('disabled', true);

Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '10px',
});

let timer = null;
let timeData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  altInput: true,
  altFormat: "H:i F j, Y",
  dateFormat: "Y-m-d",
    
  onOpen() {
    clearInterval(timer);
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
  },
   
  onClose(selectedDates) {
    timeData = selectedDates[0].getTime();
    if (timeData < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.starButton.setAttribute('disabled', true);
      return;
    }
    refs.starButton.removeAttribute('disabled');
  },
};

const inputPicker = flatpickr(refs.datetimePicker, options);

function startOnClick() {
  timer = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();

    if (deltaTime <= 0) {
      clearInterval(timer);
      return;
    }
    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);

  refs.starButton.setAttribute('disabled', true);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockInfo({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}