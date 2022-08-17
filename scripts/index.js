
// Кнопки
let profileEditButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let editSubmit = document.querySelector(".popup__form");
let profileEditPopup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function profilePopupChange(){
    profileEditPopup.classList.toggle("popup_opened");
}

function profileSubmit(evt){
    evt.preventDefault();

    let newProfileName = document.querySelector(".popup__text_type_name");
    let newProfileDescription = document.querySelector(".popup__text_type_about");

    profileName.innerHTML = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    profilePopupChange();

}

profileEditButton.addEventListener("click", profilePopupChange); 
popupClose.addEventListener("click", profilePopupChange); 
editSubmit.addEventListener("submit", profileSubmit);
