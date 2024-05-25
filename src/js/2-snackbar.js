import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const section = document.querySelector('section');
section.classList.add('section');
const homeLink = document.querySelector('a');
homeLink.classList.add('to-home-link');

const form = document.querySelector('.form');

const delayLabel = form.querySelector('label');
delayLabel.classList.add('delay-label');
const delayInput = delayLabel.querySelector('input[name="delay"]');

const fieldset = form.querySelector('fieldset');
const fulfilledInput = fieldset.querySelector('input[value="fulfilled"]');
const rejectedInput = fieldset.querySelector('input[value="rejected"]');

const submitBtn = form.querySelector('button[type="submit"]');

// let delay = 0;
// delayInput.addEventListener('input', handleInput);
// function handleInput(event) {
//   delay = event.target.value;
// }

let radio = true;

fieldset.addEventListener('click', handleClick);
function handleClick(event) {
  if (event.target === fulfilledInput) {
    return (radio = true);
  } else {
    return (radio = false);
  }
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    const delay = delayInput.value;
    setTimeout(() => {
      if (radio) {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(SuccessMsg =>
      iziToast.success({
        position: 'topRight',
        icon: '',
        title: '✅',
        message: SuccessMsg,
        // progressBar: false,
      })
    )
    .catch(ErrorDescription =>
      iziToast.error({
        position: 'topRight',
        icon: '',
        title: '❌',
        message: ErrorDescription,
        // progressBar: false,
      })
    );
}