// Импорт классов 
import {Card} from './scripts/components/Card.js'
import {FormValidator} from './scripts/components/FormValidator.js'
import Section  from './scripts/components/Section.js';
import {initialCards,
        cardListSection,
        settings,
        elementTemplateSelector,
        popupProfileButton,
        popupProfileForm,
        popupAddElementButton,
        popupAddElementForm
  } from './scripts/utils/constants.js'

import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import './index.css'
//Классы валидации формы и их валидация
const popupProfileFormValidate = new FormValidator(settings, popupProfileForm);
  popupProfileFormValidate.enableValidation();
const popupAddElementFormValidate = new FormValidator(settings, popupAddElementForm);
  popupAddElementFormValidate.enableValidation();


//Попап Изоображения
const imagePopup = new PopupWithImage({popupSelector: '.popup-image'});
imagePopup.setEventListeners();

//Попап добавления карточки
const addElementPopup = new PopupWithForm( {popupSelector:  '.popup-add-element', 
    handleFormSubmit: (formValues) => {
      const card = new Card({element: formValues, elementTemplateSelector, handleCardClick: (CardData) => {
      imagePopup.open(CardData)
    }});
      const cardElement = card.generateCard();
  
      cardsList.addItem(cardElement);
      addElementPopup.close();
      popupAddElementFormValidate.clearPopupFormErrors();
}} );

popupAddElementButton.addEventListener('click',() => { addElementPopup.open()})
addElementPopup.setEventListeners();

//Попап профиля 

const UserProfile = new UserInfo({profileNameSelector: '.profile__name', descriptionSelector: '.profile__description'})

const editProfilePopup = new PopupWithForm ({popupSelector:  '.popup-profile-edit', 
    handleFormSubmit: (formValues) => { 

      UserProfile.setUserInfo(formValues.name, formValues.about);

      document.querySelector('.popup__text_type_name').setAttribute('value', formValues.name);
      document.querySelector('.popup__text_type_about').setAttribute('value', formValues.about);

      editProfilePopup.close();
}} );

popupProfileButton.addEventListener('click',() => { 

  document.querySelector('.popup__text_type_name').value = UserProfile.getUserInfo().name;
  document.querySelector('.popup__text_type_about').value = UserProfile.getUserInfo().description;

  editProfilePopup.open();
})
editProfilePopup.setEventListeners();

// Секция карточек
const cardsList = new Section({
  data: initialCards,
  renderer: (element) => {
    const card = new Card({element, elementTemplateSelector, 
      handleCardClick: (CardData) => {
      imagePopup.open(CardData)
    }});
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
},
cardListSection
);

cardsList.renderItems(); 
