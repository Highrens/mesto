export class Card {
    constructor({element, elementTemplateSelector, handleCardClick}){
      this.name = element.name;
      this.link = element.link;
      this.elementTemplateSelector = elementTemplateSelector;
      this.handleCardClick = handleCardClick;
    }
    
    _getTemplate () {
      const cardElement = document
      .querySelector(this.elementTemplateSelector)
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
        this.handleCardClick({name: this.name, link: this.link});
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