// Импорт классов 
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section  from '../components/Section.js';
import {cardListSection,
        settings,
        elementTemplateSelector,
        popupProfileButton,
        popupProfileForm,
        popupAddElementButton,
        popupAddElementForm,
        popupNameInput,
        popupAboutInput,
        popupAvatarButton,
        popupAvatarForm
  } from '../utils/constants.js'

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupСonfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/api.js';

import './index.css';

//Классы валидации формы и их валидация
const popupProfileFormValidate = new FormValidator(settings, popupProfileForm);
  popupProfileFormValidate.enableValidation();
const popupAddElementFormValidate = new FormValidator(settings, popupAddElementForm);
  popupAddElementFormValidate.enableValidation();
const popupAvatarFormValidate = new FormValidator(settings, popupAvatarForm)
  popupAvatarFormValidate.enableValidation();

let cardsList;
let userId;

//Попап Изоображения
const imagePopup = new PopupWithImage({popupSelector: '.popup-image'});
imagePopup.setEventListeners();

//Попап профиля 
const userProfile = new UserInfo({profileNameSelector: '.profile__name', 
                                  descriptionSelector: '.profile__description', 
                                  avatarSelector: '.profile__image'});

                           
const editProfilePopup = new PopupWithForm ({popupSelector:  '.popup-profile-edit', 
    handleFormSubmit: (formValues) => { 
      editProfilePopup.submitButton.textContent = 'Сохранение...'
      api.updateUserInfo(formValues.name, formValues.about)
      .then((data) =>  {
        popupNameInput.setAttribute('value', formValues.name);
        popupAboutInput.setAttribute('value', formValues.about);
        userProfile.setUserInfo(data.name, data.about);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally((res) => {
      editProfilePopup.close();
      editProfilePopup.submitButton.textContent = 'Сохранить'
    });   
}} );

popupProfileButton.addEventListener('click',() => { 
 const userInfo = userProfile.getUserInfo();

  popupNameInput.value = userInfo.name;
  popupAboutInput.value = userInfo.description;

  popupProfileFormValidate.clearPopupFormErrors();
  editProfilePopup.open();
})
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({popupSelector:  '.popup-new-profile-image', 
handleFormSubmit: (link) => { 
  editAvatarPopup.submitButton.textContent = 'Сохранение...'
  api.updateUserAvatar(link)
  .then((data) =>  {
    console.log(data);
    userProfile.setUserAvatar(data.avatar);
    })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally((res) => {
    editAvatarPopup.close();
    editAvatarPopup.submitButton.textContent = 'Сохранить'
});

  editAvatarPopup.close();
}} );

editAvatarPopup.setEventListeners();
popupAvatarButton.addEventListener('click', ()=>{
  editAvatarPopup.open();
})

//Подтвердить удаление

const popupConfirm = new PopupConfirm({popupSelector:  '.popup-are-you-sure', 
  handleFormSubmit: (cardId, card) => { 
    popupConfirm.submitButton.textContent = 'Удаление..'
    api.deleteCard(cardId)
      .then((data) => {
        card._delete();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(res => {
        popupConfirm.close();
        popupConfirm.submitButton.textContent = 'Да'
      })
}});
popupConfirm.setEventListeners();

// Создание карточки
function createCard(item, userId) {
  const card = new Card({element: item, elementTemplateSelector, 
    handleCardClick: (cardData) => {
      imagePopup.open(cardData)
    },
    getUserId: () => {
     return userId;
    },
    deleteWarning: () => {
      popupConfirm.open(item._id, card);
    },
    likeFunc: () => {
      if(card.likes.some(likeOwenId => likeOwenId._id == userId)){
        api.takeLike(card.cardId)
        .then((newData) => {
          card.likes = newData.likes;
          card._like(userId);
        });
      } else {
        api.setLike(card.cardId)
        .then((newData) => {
          card.likes = newData.likes;
          card._like(userId);
        });
      }
      
    }
  });
 const cardElement = card.generateCard();
 return cardElement
}

//Общение с Сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55/',
  headers: {
    authorization: '02f5ff8b-a10a-4ea8-87ee-4eeed01dea15'
  }
});
       

  // Секция карточек
api.getInitialCards()
  .then((data) => {
    console.log(data);
    cardsList = new Section({
      data: data,
      renderer: (element) => {
        cardsList.addItem(createCard(element, userId));
      }
    },
    cardListSection
    );
    cardsList.renderItems(); 
})

api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userProfile.setUserInfo(data.name, data.about);
    userProfile.setUserAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Попап добавления карточки
const addElementPopup = new PopupWithForm( {popupSelector:  '.popup-add-element', 
    handleFormSubmit: (formValues) => {
      addElementPopup.submitButton.textContent = 'Сохранение...'
      api.postNewCard(formValues)
        .then((data) => {
          console.log(data);
          cardsList.addItem(createCard(data, userId));
          popupAddElementFormValidate.clearPopupFormErrors();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }).finally((res) => {
          addElementPopup.close();
          addElementPopup.submitButton.textContent = 'Сохранить'
        });  
}} );

popupAddElementButton.addEventListener('click',() => {
  popupAddElementFormValidate.clearPopupFormErrors();
  addElementPopup.open()
});
addElementPopup.setEventListeners();


