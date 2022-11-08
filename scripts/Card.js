
import { openPopup, popupImage } from './index.js'

export class Card {
    constructor(element, templateSelector){
      this.name = element.name;
      this.link = element.link;
      this.templateSelector = templateSelector;
    }
    
    _getTemplate () {
      const cardElement = document
      .querySelector(this.templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
    }

    generateCard(){
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector(".element__name").textContent = this.name;
      this._element.querySelector(".element__image").style = `background-image:url('${this.link}');`;

      return this._element;
    }

    _setEventListeners () {
      this._element.querySelector(".element__image").addEventListener('click', () => {
        this._openImagePopup(); 
      })

      this._element.querySelector('.element__like').addEventListener('click', () => {
        this._like();
      })
      
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._delete();      
      })
    }

    _openImagePopup (){
      openPopup(popupImage);
      popupImage.querySelector(".popup__image").src = this.link;
      popupImage.querySelector(".popup__image").alt = this.name;      
      popupImage.querySelector('.popup__image-name').textContent = this.name;
    }

    _like (){
       this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _delete (){
      this._element.querySelector('.element__delete').parentElement.remove();
    }
}