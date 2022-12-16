import Popup from "./popup.js";

export default class PopupConfirm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(...arguments)   
        this.handleFormSubmit  = handleFormSubmit;
        this.itemToConfirmId;
        this.itemToConfirm;
        this.submitButton = this.popup.querySelector('.popup__submit-button');
    }

    open(itemId, item){
        super.open();
        this.itemToConfirmId = itemId;
        this.itemToConfirm = item;
    }

    setEventListeners(){
        super.setEventListeners();
        this.submitButton.addEventListener('click', () => {
            this.handleFormSubmit(this.itemToConfirmId,  this.itemToConfirm);
        })
    }
}