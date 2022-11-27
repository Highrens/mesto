import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(){
        super(...arguments);
        this.popupImage = this.popup.querySelector(".popup__image");
    }
    open ({name, link}){
        super.open();
   
        this.popup.querySelector('.popup__image-name')
               .textContent =  name;
        this.popupImage.src =  link;
        this.popupImage.alt =  name;   
    }
}