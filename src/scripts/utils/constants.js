export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_anacvite',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }; 

export const cardListSection = ".elements";
export const elementTemplateSelector = ".card-template";

export const popupProfileButton = document.querySelector(".profile__edit-button");    //Кнопка Открытия
export const popupProfileForm = document.querySelector("[name=profile-edit-form]");   //Форма

export const popupAddElementButton = document.querySelector(".profile__add-button");        // Кнопка открытия
export const popupAddElementForm = document.querySelector("[name=add-element-form]");       //форма