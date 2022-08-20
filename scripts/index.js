
// Кнопки
let profileEditButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let editSubmit = document.querySelector(".popup__form");
let profileEditPopup = document.querySelector(".popup");

// Имя и описание профиля
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

// Поля ввода 
let newProfileName = document.querySelector(".popup__text_type_name");
let newProfileDescription = document.querySelector(".popup__text_type_about");

function profilePopupClose(){
    profileEditPopup.classList.remove("popup_opened");
}

function profileSubmit(evt){
    evt.preventDefault();
    
    profileName.textContent          = newProfileName.value;
    profileDescription.textContent   = newProfileDescription.value;

    profilePopupClose();

}


function popupOpen(){
    newProfileName.value            = profileName.textContent;
    newProfileDescription.value     = profileDescription.textContent;

    profileEditPopup.classList.add("popup_opened");
}

profileEditButton.addEventListener("click", popupOpen); 
popupClose.addEventListener("click", profilePopupClose); 
editSubmit.addEventListener("submit", profileSubmit);
