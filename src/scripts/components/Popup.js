export default class Popup {
    constructor({popupSelector}){
        this.popup = document.querySelector(popupSelector);
    }

    open (){
        this.popup.classList.add("popup_opened");
    }

    close (){
        this.popup.classList.remove("popup_opened");
    }

    _handleEscClose(evt){
        if (evt.key === "Escape"){
            this.close();
        }
    }
    _OverlayClose (evt){   
        if (evt.target.classList.contains('popup')){
            this.close();
        }
    }

    setEventListeners() {
         this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
         document.addEventListener('click',  this._OverlayClose.bind(this));
         document.addEventListener('keydown',  this._handleEscClose.bind(this));
    }
}