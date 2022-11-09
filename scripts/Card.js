export class Card {
    constructor(element, templateSelector, openImagePopup){
      this.name = element.name;
      this.link = element.link;
      this.templateSelector = templateSelector;
      this.openImagePopup = openImagePopup;
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
      this.image = this._element.querySelector(".element__image")
      this.like = this._element.querySelector('.element__like');

      this._setEventListeners();

      this._element.querySelector(".element__name").textContent = this.name;
      this.image.style = `background-image:url('${this.link}');`;

      return this._element;
    }

    _setEventListeners () {
      this.image.addEventListener('click', () => {
        this.openImagePopup();
      })

      this.like.addEventListener('click', () => {
        this._like();
      })
      
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._delete();      
      })
    }

    _like (){
      this.like.classList.toggle('element__like_active');
    }

    _delete (){
      this._element.remove();
    }
}