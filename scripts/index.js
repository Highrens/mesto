// Кнопки и попапы

let popupClose = document.querySelectorAll(".popup__close"); //Кнопка закрытия Всех попапов, раз они не открываются одновременно

    // Настройка профиля
let profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка Открытия
let editSubmit = document.querySelector("[name=profile-edit-form]"); //Форма
let profileEditPopup = document.querySelector(".popup-profile-edit"); // Попап

    // Добавление фотокарточки
let AddElementButton = document.querySelector(".profile__add-button")
let AddElemetSubmit = document.querySelector("[name=add-element-form]")
let AddElementPopup = document.querySelector(".popup-add-element")

// Имя и описание профиля
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

// Попап фотокарточки
let ImagePopup = document.querySelector(".popup-image");
// Поля ввода 
    //
    let newProfileName = document.querySelector(".popup__text_type_name");
    let newProfileDescription = document.querySelector(".popup__text_type_about");
    //
    let NewElementName = document.querySelector(".popup__text_type_element_name");
    let NewElementSrc = document.querySelector(".popup__text_type_element_src");

//Функция ищет и закрывает открытый попап
function PopupClose(){
    let openedPopup = document.querySelector(".popup_opened");
    openedPopup.classList.remove("popup_opened");
}


function profileEditPopupOpen(){
    newProfileName.value            = profileName.textContent;
    newProfileDescription.value     = profileDescription.textContent;

    profileEditPopup.classList.add("popup_opened");
}

function AddElementPopupOpen(){
    AddElementPopup.classList.add("popup_opened");
    NewElementName.value = '';
    NewElementSrc.value = '';
}

function profileSubmit(evt){
    evt.preventDefault();
    
    profileName.textContent          = newProfileName.value;
    profileDescription.textContent   = newProfileDescription.value;

    PopupClose();
}


function AddElement(evt){
    evt.preventDefault();

    const ElementTemplate = document.querySelector('#element').content;
    let Elements = document.querySelector(".elements");
    let NewElement = ElementTemplate.querySelector('.element').cloneNode(true);

    NewElement.querySelector(".element__name").textContent = NewElementName.value;
    NewElement.querySelector(".element__image").style = `background-image:url('${NewElementSrc.value}');`; 
    NewElement.querySelector(".element__image").addEventListener('click', function(evt){

      ImagePopup.classList.add('popup_opened');
      ImagePopup.querySelector(".popup__image").src = NewElementSrc.value;
      ImagePopup.querySelector('.popup__image-name').textContent = NewElementName.value;
    })


    NewElement.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
      })

    NewElement.querySelector('.element__delete').addEventListener('click', function(evt){
        evt.target.parentElement.remove();
      })

    Elements.prepend(NewElement);

    PopupClose();
}

// Слушаем кнопки
popupClose.forEach(function (Close){
    Close.addEventListener("click", PopupClose)
})


profileEditButton.addEventListener("click", profileEditPopupOpen); 
editSubmit.addEventListener("submit", profileSubmit);

AddElementButton.addEventListener("click", AddElementPopupOpen);
AddElemetSubmit.addEventListener("submit", AddElement);


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

function AddStartCards (CardsArray){

    const ElementTemplate = document.querySelector('#element').content;

    let Elements = document.querySelector(".elements");

    CardsArray.forEach(element => {
        let NewElement = ElementTemplate.querySelector('.element').cloneNode(true);

    NewElement.querySelector(".element__name").textContent = element.name;
    NewElement.querySelector(".element__image").style = `background-image:url('${element.link}');`;


    NewElement.querySelector(".element__image").addEventListener('click', function(evt){

      ImagePopup.classList.add('popup_opened');
      ImagePopup.querySelector(".popup__image").src = element.link;
      ImagePopup.querySelector('.popup__image-name').textContent = element.name;
    })



    NewElement.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
      })
    NewElement.querySelector('.element__delete').addEventListener('click', function(evt){
        evt.target.parentElement.remove();
      })
    Elements.prepend(NewElement);
    });
    
}
AddStartCards(initialCards);