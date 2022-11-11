export class FormValidator {
  constructor(settings, formElement){
    this.settings = settings;
    this.formElement = formElement;
    this._inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    this._buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
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
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this.settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this.settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
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

  //Сбрасываем возможные ошибки валидации
   clearPopupFormErrors () {
    this.formElement.querySelectorAll(`.${this.settings.inputErrorClass}`).forEach((inputError) => {
     inputError.classList.remove(this.settings.inputErrorClass);
   });
     this.formElement.querySelectorAll(`${this.settings.inputSelector}-error`).forEach((errorElement) => {
     errorElement.textContent = '';
   });
    this._toggleButtonState();
 }
}
