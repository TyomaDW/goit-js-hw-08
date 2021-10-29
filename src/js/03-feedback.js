import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input[name="email"]');
const messageRef = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInputMessage, 500));

checkSavedImputs();

function onInputMessage(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
function checkSavedImputs() {
  const saveInputs = localStorage.getItem(LOCALSTORAGE_KEY);

  if (saveInputs) {
    const { email, message } = JSON.parse(saveInputs);
    messageRef.value = message;
    emailRef.value = email;
  }
}
