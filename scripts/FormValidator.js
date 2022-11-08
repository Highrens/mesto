export class FormValidator {
  constructor(settings, formElement){
    this.settings = settings;
    this.formElement = formElement;
    this._inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
  }


  enableValidation () {
    this._setEventListeners();
   };

  _setEventListeners () {
    
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
       });
     });
  };

  _toggleButtonState() {
    const _buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
    if (this._hasInvalidInput()) {
      _buttonElement.classList.add(this.settings.inactiveButtonClass);
      _buttonElement.setAttribute("disabled", "");
    } else {
      _buttonElement.classList.remove(this.settings.inactiveButtonClass);
      _buttonElement.removeAttribute("disabled");
    } 
  };

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
        
      }); 
    };

    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _showInputError (inputElement, errorMessage) {
      const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this.settings.inputErrorClass);
      errorElement.textContent = errorMessage;
    };

    _hideInputError (inputElement) {
      const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this.settings.inputErrorClass);
      errorElement.textContent = '';
    };
}
  //Сбрасываем возможные ошибки валидации
 export function clearPopupFormErrors (popup, settings) {
    popup.querySelectorAll(`.${settings.inputErrorClass}`).forEach((inputError) => {
     inputError.classList.remove(settings.inputErrorClass);
   });
   popup.querySelectorAll(`${settings.inputSelector}-error`).forEach((errorElement) => {
     errorElement.textContent = '';
   });
   popup.querySelectorAll(settings.submitButtonSelector).forEach((submitButton)=>{
     submitButton.classList.remove(settings.inactiveButtonClass); 
   });
 
 }




