import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDelay = document.querySelector('input[name="delay"]');
const radioFulfilled = document.querySelector(
  'input[name="state"][value="fulfilled"]'
);
const btn = document.querySelector('button');
const radioReject = document.querySelector(
  'input[name="state"][value="rejected"]'
);
const form = document.querySelector('.form');

const makePromise = ({ value, delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputData = inputDelay.value;
  const delay = parseInt(inputData);
  if (radioFulfilled.checked) {
    makePromise({ delay }).then(delay =>
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${inputData} ms`,
        position: 'topRight',
      })
    );
  } else if (radioReject.checked) {
    makePromise({ delay, shouldResolve: false }).catch(delay =>
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${inputData} ms`,
        position: 'topRight',
      })
    );
  }
});