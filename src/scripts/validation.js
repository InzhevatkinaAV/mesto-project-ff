export const enableValidation = (validationConfig) => {
  const formArray = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));

  formArray.forEach((formElement) => {
    setEventListeners(formElement, 
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass, 
      validationConfig.inputErrorClass, 
      validationConfig.errorClass);
  });
};

//Очистка ошибок валидации формы, кнопка "Сохранить" переходит в неактивное состояние
export function clearValidation(form, validationConfig) {
  const inputArray = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  inputArray.forEach(input => {
    const inputError = form.querySelector(`.${input.id}_error`);

    input.classList.remove(validationConfig.inputErrorClass);
    inputError.classList.remove(validationConfig.errorClass);
  })
  
  submitButton.classList.add(validationConfig.inactiveButtonClass);
} 

//Проверка валидности инпута
export function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else
    inputElement.setCustomValidity('');

  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  else
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}

//Установка слушателя события на все инпуты в форме на предмет проверки правильности ввода значения
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputArray = Array.from(formElement.querySelectorAll(inputSelector));

  inputArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputArray, submitButton, inactiveButtonClass);
    });
  });

  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputArray, submitButton, inactiveButtonClass);
}; 

//Переключение стилей кнопки "Сохранить"
function toggleButtonState(inputArray, submitButton, inactiveButtonClass) {
  let allInputsAreValid = true;
  
  for (let i = 0; i < inputArray.length; i++) {
    if (!inputArray[i].validity.valid) {
      allInputsAreValid = false;
      break;
    }
  }

  if (!allInputsAreValid) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass); //inactiveButtonClass = .popup__button_disabled
  } else {
   submitButton.disabled = false;
   submitButton.classList.remove(inactiveButtonClass); 
  }
}

//Добавление классов ошибок
const showInputError = (formElement, inputElement, helpMessage, inputErrorClass, errorClass) => {
  const spanForError = formElement.querySelector(`.${inputElement.id}_error`);

  spanForError.textContent = helpMessage;
  spanForError.classList.add(errorClass);

  inputElement.classList.add(inputErrorClass);
};

//Удаление классов ошибок
const hideInputError = (formElement, inputElement,inputErrorClass, errorClass) => {
  const spanForError = formElement.querySelector(`.${inputElement.id}_error`);

  spanForError.textContent = '';
  spanForError.classList.remove(errorClass);

  inputElement.classList.remove(inputErrorClass);
};