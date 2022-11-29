export default class Popup {
    constructor({popupSelector}){
        this.popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open (){
        this.popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close (){
        this.popup.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if (evt.key === "Escape"){
            this.close();
        }
    }
    _overlayClose (evt){   
        if (evt.target.classList.contains('popup')){
            this.close();
        }
    }

    setEventListeners() {
         this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
         document.addEventListener('click',  this._overlayClose.bind(this));
    }
}