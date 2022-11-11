    // Настройка профиля
const popupProfileButton = document.querySelector(".profile__edit-button");    //Кнопка Открытия
const popupProfileForm = document.querySelector("[name=profile-edit-form]");   //Форма
const popupProfile = document.querySelector(".popup-profile-edit");            // Попап
const popupProfileClose = document.querySelector(".popup-profile-close");      //Закрытие
// Имя и описание профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newProfileName = document.querySelector(".popup__text_type_name");
const newProfileDescription = document.querySelector(".popup__text_type_about");

    // Добавление фотокарточки
const popupAddElementButton = document.querySelector(".profile__add-button");        // Кнопка открытия
const popupAddElementForm = document.querySelector("[name=add-element-form]");       //форма
const popupAddElement = document.querySelector(".popup-add-element");                //Попап
const popupAddElementClose = document.querySelector(".popup-add-element-close");     //Закрытие
const newElementName = document.querySelector(".popup__text_type_element-name");     //Имя для новой карточки
const newElementSrc = document.querySelector(".popup__text_type_element-src");       // Ссылка для новой карточки

// Место и селектор заготовки для новых карточек
const elements = document.querySelector(".elements");
const elementTemplateSelector = ".card-template";
    // Попап фотокарточки
export const popupImage = document.querySelector(".popup-image");     //попап
const popupImageClose = document.querySelector(".popup-image-close"); //закрытие 

// Импорт классов 
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

// Настройки валидации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_anacvite',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}; 

//Классы валидации формы и их валидация
const popupProfileFormValidate = new FormValidator(settings, popupProfileForm);
popupProfileFormValidate.enableValidation();
const popupAddElementFormValidate = new FormValidator(settings, popupAddElementForm);
popupAddElementFormValidate.enableValidation();

//Открытие попапов
popupProfileButton.addEventListener('click', openEditProfilePopup);
popupAddElementButton.addEventListener('click', openAddElementPopup);
//Закрытие попапов
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
popupAddElementClose.addEventListener('click', ()=> closePopup(popupAddElement));
popupImageClose.addEventListener('click',  () => closePopup(popupImage));

// Слушаем нажатие на оверлей и Esc
function addCloseListeners (){
  document.addEventListener('click',  closePopupByOverlay);
  document.addEventListener('keydown',  closePopupByEscape);
}

function removeCloseListeners (){
  document.removeEventListener('click',  closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByOverlay (evt){
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}

function closePopupByEscape (evt){
  if (evt.key === "Escape"){
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Сабмит попапов
popupProfileForm.addEventListener("submit", submitProfile);
popupAddElementForm.addEventListener("submit", submitAddElementPopup);

  //Функции открытия и закрытия попапов
export function openPopup(popup){
  popup.classList.add("popup_opened");
  addCloseListeners();
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
  removeCloseListeners();
}

// Функции профиля
function openEditProfilePopup(){
    newProfileName.value            = profileName.textContent;
    newProfileDescription.value     = profileDescription.textContent;
    popupProfileFormValidate.clearPopupFormErrors();
    openPopup(popupProfile);
}

function submitProfile(evt){
  evt.preventDefault();
    profileName.textContent          = newProfileName.value;
    profileDescription.textContent   = newProfileDescription.value;
    closePopup(popupProfile);
}

//Функции добавляения карточки
function openAddElementPopup(){
  openPopup(popupAddElement);
}

// Функция обрабатывает имя и ссылку для новой карточки, закрывает попап
function submitAddElementPopup(evt){
    evt.preventDefault(); 
      addElement({name: newElementName.value, link: newElementSrc.value});
      closePopup(popupAddElement);
      popupAddElementForm.reset();  
      popupAddElementFormValidate.clearPopupFormErrors();
}

//Функция добавляет новую карточку в DOM
function addElement (element){
  const card = new Card(element, elementTemplateSelector, openImagePopup);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
}

//Функция открытия попапа изоображения (вызывается из класса Card)
function openImagePopup (){
  openPopup(popupImage);
  popupImage.querySelector(".popup__image").src = this.link;
  popupImage.querySelector(".popup__image").alt = this.name;      
  popupImage.querySelector('.popup__image-name').textContent = this.name;
}

const initialCards = [
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

// Добавим все 6 карточек выполняя функцию добавления карточки с каждым элементом массива
function addStartCards(array){
  array.forEach((element) => {
    addElement(element)
  });
}

addStartCards(initialCards);
