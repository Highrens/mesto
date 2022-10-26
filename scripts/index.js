
    // Настройка профиля
const popupProfileButton = document.querySelector(".profile__edit-button");     //Кнопка Открытия
const popupProfileForm = document.querySelector("[name=profile-edit-form]");  //Форма
const popupProfile = document.querySelector(".popup-profile-edit");        // Попап
const popupProfileClose = document.querySelector(".popup-profile-close");      //Закрытие
// Имя и описание профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newProfileName = document.querySelector(".popup__text_type_name");
const newProfileDescription = document.querySelector(".popup__text_type_about");

    // Добавление фотокарточки
const popupAddElementButton = document.querySelector(".profile__add-button");        // Кнопка открытия
const popupAddElementForm = document.querySelector("[name=add-element-form]");      //форма
const popupAddElement = document.querySelector(".popup-add-element");           //Попап
const popupAddElementClose = document.querySelector(".popup-add-element-close"); //Закрытие
const newElementName = document.querySelector(".popup__text_type_element-name"); //Имя для новой карточки
const newElementSrc = document.querySelector(".popup__text_type_element-src");  // Ссылка для новой карточки
// Место и шаблон для новых карточек
const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector(".elements");
    // Попап фотокарточки
const popupImage = document.querySelector(".popup-image"); //попап
const popupImageSrc =popupImage.querySelector(".popup__image"); //Изоображение попапа
const popupImageClose = document.querySelector(".popup-image-close"); //закрытие 

// Слушаем кнопки
//Открытие попапов
popupProfileButton.addEventListener('click', openEditProfilePopup);
popupAddElementButton.addEventListener('click', openAddElementPopup);
//Закрытие попапов
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
popupAddElementClose.addEventListener('click', ()=> closePopup(popupAddElement));
popupImageClose.addEventListener('click',  () => closePopup(popupImage));
// Сабмит попапов
popupProfileForm.addEventListener("submit", profileSubmit);
popupAddElementForm.addEventListener("submit", submitAddElementPopup);

  //Функции открытия и закрытия попапов
function openPopup(popup){

  popup.classList.add("popup_opened");
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
  //Сбрасываем возможные ошибки валидации
  popup.querySelectorAll('.popup__text_type_error').forEach((inputErrorClass) => {
    inputErrorClass.classList.remove('popup__text_type_error');
  });
  popup.querySelectorAll('.popup__text-error').forEach((errorElement) => {
    errorElement.textContent = '';
  });
  popup.querySelectorAll('.popup__submit-button').forEach((submitButton)=>{
    submitButton.classList.remove('popup__submit-button_anacvite'); 
  });

}

// Функции профиля
function openEditProfilePopup(){
    newProfileName.value            = profileName.textContent;
    newProfileDescription.value     = profileDescription.textContent;
    openPopup(popupProfile);
}

function profileSubmit(evt){
  evt.preventDefault();
  if (!popupProfileForm.querySelector('.popup__submit-button_anacvite'))
  {
    profileName.textContent          = newProfileName.value;
    profileDescription.textContent   = newProfileDescription.value;
    closePopup(popupProfile);
  }


}

//Функции добавляения карточки
function openAddElementPopup(){
  popupAddElementForm.reset();
    openPopup(popupAddElement);
}

// Функция обрабатывает имя и ссылку для новой карточки, закрывает попап
function submitAddElementPopup(evt){
    evt.preventDefault();
    if(!popupAddElementForm.querySelector('.popup__submit-button_anacvite'))
    {
      addElement(createElement({name: newElementName.value, link: newElementSrc.value}));
    
      closePopup(popupAddElement);
    }
   
}

// Фунция создает и возвращает новую карточку
function createElement(element) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const newElementImage = newElement.querySelector(".element__image");
  newElement.querySelector(".element__name").textContent = element.name;
  newElementImage.style = `background-image:url('${element.link}');`;
  newElementImage.addEventListener('click', function(evt){
    openPopup(popupImage);
    popupImageSrc.src = element.link;
    popupImageSrc.alt = element.name;
    popupImage.querySelector('.popup__image-name').textContent = element.name;
  })
  newElement.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  })
  newElement.querySelector('.element__delete').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  })
  return newElement;
}

//Функция добавляет новую карточку в DOM
function addElement (element){
  elements.prepend(element);
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
  for (let i = 0; i < array.length; i++) {
   const element = array[i];
   addElement(createElement(element));
  }
}

addStartCards(initialCards);

// Слушаем нажатие на оверлей и Esc
function closePopupListener(){
  
  popups = document.querySelectorAll('.popup');
  
  popups.forEach(popupElement => {
     popupElement.addEventListener('click', function (evt) {
         if (evt.target.classList.contains('popup')){
           closePopup(popupElement);
         }
     }); 
    popupElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27)
        {
          closePopup(popupElement);
        }
    }); 
  });
} 

closePopupListener();
