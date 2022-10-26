const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_anactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });

  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__submit-button_anacvite');

} else {
  buttonElement.classList.remove('popup__submit-button_anacvite');
} 
};


const hasInvalidInput = (inputList) => {
 return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

enableValidation();


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};




