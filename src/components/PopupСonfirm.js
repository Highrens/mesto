import Popup from "./popup.js";

export default class PopupConfirm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(...arguments)   
        this.handleFormSubmit  = handleFormSubmit;
        this.cardToDeleteId;
        this.cardToDelete;
        this.submitButton = this.popup.querySelector('.popup__submit-button');
    }

    open(cardId, card){
        super.open();
        this.cardToDeleteId = cardId;
        this.cardToDelete = card;
    }

    setEventListeners(){
        super.setEventListeners();
        this.submitButton.addEventListener('click', () => {
            this.handleFormSubmit(this.cardToDeleteId,  this.cardToDelete);
        })
    }
}