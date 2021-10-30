import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[type = "email"]'),
  messageEl: document.querySelector('textarea[name = "message"]'),
};

function onFormSubmit(e) {
  e.preventDefault();
  if (formData.email == '' || formData.message == '') {
    alert('Заполните все поля!');
  } else {
    console.log('Успех!', formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

const formData = {
  email: '',
  message: '',
};

refs.formEl.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});
refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onTextareaInput, 500));
popularTextarea();

function onTextareaInput(e) {
  let message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

function popularTextarea() {
  let parsedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parsedMessage) {
    formData.message = parsedMessage.message;
    formData.email = parsedMessage.email;

    refs.messageEl.value = parsedMessage.message;
    refs.emailEl.value = parsedMessage.email;
  }
}
