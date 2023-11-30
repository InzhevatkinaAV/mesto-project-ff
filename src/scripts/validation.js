export const enableValidation = (validationConfig) => {
  const formArray = Array.from(document.querySelectorAll(validationConfig.formSelector));

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
    hideInputError(form, input, validationConfig.inputErrorClass, validationConfig.errorClass);
  })
  
  disableSubmitButton(submitButton, validationConfig.inactiveButtonClass);
} 

const disableSubmitButton = (button, inactiveButtonClass) => {
  button.disabled = true; 
  button.classList.add(inactiveButtonClass);
}

//Проверка валидности инпута
function toggleInputErrorState(formElement, inputElement, inputErrorClass, errorClass) {
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
      toggleInputErrorState(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputArray, submitButton, inactiveButtonClass);
    });
  });

  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputArray, submitButton, inactiveButtonClass);
}; 

//Переключение стилей кнопки "Сохранить"
function toggleButtonState(inputArray, submitButton, inactiveButtonClass) {
  const allInputsAreValid = inputArray.every(input => input.validity.valid);

  if (!allInputsAreValid) {
    disableSubmitButton(submitButton, inactiveButtonClass);
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