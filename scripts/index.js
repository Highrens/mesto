// Кнопки и попапы

const popupClose = document.querySelectorAll(".popup__close"); //Кнопка закрытия Всех попапов, раз они не открываются одновременно

    // Настройка профиля
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка Открытия
const editSubmit = document.querySelector("[name=profile-edit-form]"); //Форма
const profileEditPopup = document.querySelector(".popup-profile-edit"); // Попап

    // Добавление фотокарточки
const AddElementButton = document.querySelector(".profile__add-button")
const AddElemetSubmit = document.querySelector("[name=add-element-form]")
const addElementPopup = document.querySelector(".popup-add-element")

// Имя и описание профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Попап фотокарточки
const imagePopup = document.querySelector(".popup-image");
// Поля ввода 
    //
    const newProfileName = document.querySelector(".popup__text_type_name");
    const newProfileDescription = document.querySelector(".popup__text_type_about");
    //
    let newElementName = document.querySelector(".popup__text_type_element-name");
    let newElementSrc = document.querySelector(".popup__text_type_element-src");

//Функция ищет и закрывает открытый попап
function PopupClose(){
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup.classList.remove("popup_opened");
}


function profileEditPopupOpen(){
    newProfileName.value            = profileName.textContent;
    newProfileDescription.value     = profileDescription.textContent;

    profileEditPopup.classList.add("popup_opened");
}

function addElementPopupOpen(){
    addElementPopup.classList.add("popup_opened");
    newElementName.value = '';
    newElementSrc.value = '';
}

function profileSubmit(evt){
    evt.preventDefault();
    
    profileName.textContent          = newProfileName.value;
    profileDescription.textContent   = newProfileDescription.value;

    PopupClose();
}


// Слушаем кнопки
popupClose.forEach(function (Close){
    Close.addEventListener("click", PopupClose)
})


profileEditButton.addEventListener("click", profileEditPopupOpen); 
editSubmit.addEventListener("submit", profileSubmit);

AddElementButton.addEventListener("click", addElementPopupOpen);
AddElemetSubmit.addEventListener("submit", AddElement);


 // Функция обрабатывает имя и ссылку для новой карточки
function AddElement(evt){
    evt.preventDefault();
    NewCard(newElementName.value, newElementSrc.value)
    PopupClose();
}

 // Собираем вместе имя и ссылку для карточки
function NewCard (cardName, cardlink){
  let newCardArray = {
    name: cardName,
    link: cardlink
  }
  AddNewCard(newCardArray);
}

  

 // Создаем и добавляем новую карточку в DOM
function AddNewCard(element) {
  const ElementTemplate = document.querySelector('#element').content;

  const elements = document.querySelector(".elements");
  
const newElement = ElementTemplate.querySelector('.element').cloneNode(true);
  
  newElement.querySelector(".element__name").textContent = element.name;
  newElement.querySelector(".element__image").style = `background-image:url('${element.link}');`;
  newElement.querySelector(".element__image").addEventListener('click', function(evt){
      imagePopup.classList.add('popup_opened');
      imagePopup.querySelector(".popup__image").src = element.link;
      imagePopup.querySelector('.popup__image-name').textContent = element.name;
  })
  
  
  
  newElement.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  })
  newElement.querySelector('.element__delete').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  })
  elements.prepend(newElement);
}


// Первые 6 карточек 

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
function AddStartCards(array){
  for (let i = 0; i < array.length; i++) {
   const element = array[i];
   AddNewCard(element);
  }
}

AddStartCards(initialCards);
