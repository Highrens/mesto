import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(...arguments)
        this.handleFormSubmit  = handleFormSubmit;
        this._element = this.popup.querySelector('.popup__form');
        this._inputList = this._element.querySelectorAll('.popup__text');
        this.submitButton = this.popup.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
      
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
      
        // возвращаем объект значений
        return this._formValues;
      } 

    setEventListeners(){
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
            this._element.reset();
        })
    }

    close(){
        super.close();
        this._element.reset();
    }
}