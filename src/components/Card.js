import Api from "./api";

export class Card {
    constructor({element, elementTemplateSelector, handleCardClick, getUserId ,deleteWarning, likeFunc}){
      this.name = element.name;
      this.link = element.link;
      this.likes = element.likes;
      this.cardId = element._id;
      this.ownerId = element.owner._id;
      //Селеткор
      this.elementTemplateSelector = elementTemplateSelector; 
      //Внешние функции
      this.handleCardClick = handleCardClick;
      this.getUserId = getUserId;
      this.deleteWarning = deleteWarning;
      this.likeFunc = likeFunc;
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
      this.deleteButton = this._element.querySelector('.element__delete');

      if (this.getUserId() != this.ownerId) {
        this.deleteButton.classList.add('element__delete_hide');
        this.deleteButton.setAttribute("disabled", "");
      } 
      
      this._element.querySelector(".element__name").textContent = this.name;
      
      this.like = this._element.querySelector('.element__like');
      this.likesCount = this._element.querySelector('.likes-count');

      this.image.style = `background-image:url('${this.link}');`;
      this.likesCount.textContent = this.likes.length;
      this._like(this.getUserId());
      this._setEventListeners();
      return this._element;
    }

    _setEventListeners () {
      this.image.addEventListener('click', () => {
        this.handleCardClick({name: this.name, link: this.link});
      })

      this.like.addEventListener('click', () => {
        this.likeFunc();
      })
      
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this.deleteWarning(this.cardId);
      })
    }
    
    _like (userId){
      this.likesCount.textContent =  this.likes.length;
      this.likes.some(likeOwenId => likeOwenId._id == userId) 
        ? this.like.classList.add('element__like_active') 
        : this.like.classList.remove('element__like_active');
    }

    _delete (){
      this._element.remove();
    }
}