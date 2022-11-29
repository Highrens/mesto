// Импорт классов 
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section  from '../components/Section.js';
import {initialCards,
        cardListSection,
        settings,
        elementTemplateSelector,
        popupProfileButton,
        popupProfileForm,
        popupAddElementButton,
        popupAddElementForm,
        popupNameInput,
        popupAboutInput
  } from '../utils/constants.js'

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
//Классы валидации формы и их валидация
const popupProfileFormValidate = new FormValidator(settings, popupProfileForm);
  popupProfileFormValidate.enableValidation();
const popupAddElementFormValidate = new FormValidator(settings, popupAddElementForm);
  popupAddElementFormValidate.enableValidation();


//Попап Изоображения
const imagePopup = new PopupWithImage({popupSelector: '.popup-image'});
imagePopup.setEventListeners();

//Попап профиля 
const userProfile = new UserInfo({profileNameSelector: '.profile__name', descriptionSelector: '.profile__description'})

const editProfilePopup = new PopupWithForm ({popupSelector:  '.popup-profile-edit', 
    handleFormSubmit: (formValues) => { 

      userProfile.setUserInfo(formValues.name, formValues.about);

      popupNameInput.setAttribute('value', formValues.name);
      popupAboutInput.setAttribute('value', formValues.about);

      editProfilePopup.close();
}} );

popupProfileButton.addEventListener('click',() => { 
 const userInfo = userProfile.getUserInfo();
  popupNameInput.value = userInfo.name;
  popupAboutInput.value = userInfo.description;

  popupProfileFormValidate.clearPopupFormErrors();
  editProfilePopup.open();
})
editProfilePopup.setEventListeners();

// Создание карточки
function createCard(item) {
  const card = new Card({element: item, elementTemplateSelector, handleCardClick: (cardData) => {
 imagePopup.open(cardData)
}});
 const cardElement = card.generateCard();
 return cardElement
}

//Попап добавления карточки
const addElementPopup = new PopupWithForm( {popupSelector:  '.popup-add-element', 
    handleFormSubmit: (formValues) => {
      cardsList.addItem(createCard(formValues));
      addElementPopup.close();
      popupAddElementFormValidate.clearPopupFormErrors();
}} );

popupAddElementButton.addEventListener('click',() => {
  popupAddElementFormValidate.clearPopupFormErrors();
  addElementPopup.open()
});
addElementPopup.setEventListeners();

// Секция карточек
const cardsList = new Section({
  data: initialCards,
  renderer: (element) => {
    cardsList.addItem(createCard(element));
  }
},
cardListSection
);

cardsList.renderItems(); 
