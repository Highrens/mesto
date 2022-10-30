const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_anacvite',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }; 

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });

  });
};

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
} else {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
} 
};


const hasInvalidInput = (inputList) => {
 return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

enableValidation(settings);


const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
};

  //Сбрасываем возможные ошибки валидации
  function clearPopupFormErrors (popup) {

    popup.querySelectorAll('.popup__text_type_error').forEach((inputErrorClass) => {
     inputErrorClass.classList.remove('popup__text_type_error');
   });
   popup.querySelectorAll('.popup__text-error').forEach((errorElement) => {
     errorElement.textContent = '';
   });
   popup.querySelectorAll('.popup__submit-button').forEach((submitButton)=>{
     submitButton.classList.remove('popup__submit-button_anacvite'); 
   });
 
 }


