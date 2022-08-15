
// Кнопки
let profileEditButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");

profileEditButton.addEventListener("click", profilePopupChange); 
popupClose.addEventListener("click", profilePopupChange); 


let editSubmit = document.querySelector(".popup__form");

editSubmit.addEventListener("submit", profileSubmit);


//Окно ПопАп-а
let profileEditPopup = document.querySelector(".popup");

//Имя и описание профиля

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