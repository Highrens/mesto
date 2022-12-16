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
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally((res) => {
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
    editAvatarPopup.close();
    userProfile.setUserAvatar(data.avatar);
    })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally((res) => {
    editAvatarPopup.submitButton.textContent = 'Сохранить'
});

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
        popupConfirm.close();
        card.delete();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(res => {

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
          card.like(userId);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      } else {
        api.setLike(card.cardId)
        .then((newData) => {
          card.likes = newData.likes;
          card.like(userId);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
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

//Получаем с сервера карточки и информацию о пользователе и отображаем
Promise.all([api.getInitialCards() , api.getUserInfo()])
  .then((data) => {
  //Карточки с сервера и их секция
  cardsList = new Section({
    data: data[0],
    renderer: (element) => {
      cardsList.addItem(createCard(element, data[1]._id));
    }
  },
  cardListSection
  );
  cardsList.renderItems(); 
  //Ставим установки пользователя
  userId = data[1]._id;
  userProfile.setUserInfo(data[1].name, data[1].about);
  userProfile.setUserAvatar(data[1].avatar);

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
          cardsList.container.prepend(createCard(data, userId));
          popupAddElementFormValidate.clearPopupFormErrors();
          addElementPopup.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }).finally((res) => {
          addElementPopup.submitButton.textContent = 'Сохранить'
        });  
}} );

popupAddElementButton.addEventListener('click',() => {
  popupAddElementFormValidate.clearPopupFormErrors();
  addElementPopup.open()
});
addElementPopup.setEventListeners();


