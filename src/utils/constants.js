// конфиг исходных карточек
 export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

//данные пользователя


// конфиг настроек валидатора
export const configs = {
    formSelector: ".popup__container",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__input-error_active",
  };

// попапы
export const editForm = document.querySelector("#edit-form");
export const addForm = document.querySelector("#add-place");
export const imageForm = document.querySelector("#image-popup");
export const changeForm = document.querySelector('#change-avatar') 

// формы
export const editFormElement = editForm.querySelector(".popup__rectangle");
export const addFormElement = addForm.querySelector(".popup__rectangle");
export const changeFormElement = changeForm.querySelector('.popup__rectangle')

// кнопки
export const editButton = document.querySelector(".profile__edit-button");
export const editFormCloseButton = editForm.querySelector(".close-icon");
export const addButton = document.querySelector(".profile__add-button");
export const addFormCloseButton = addForm.querySelector(".close-icon");
export const imageFormCloseButton = imageForm.querySelector(".close-icon");
export const avatarPopupButton = document.querySelector('.profile__avatar')

// данные для формы редактирования
export const profileName = document.querySelector(".profile__name");
export const profileStatus = document.querySelector(".profile__status");

// инпуты формы редактирования профиля
export const nameInput = editFormElement.querySelector("#name");
export const statusInput = editFormElement.querySelector("#status");

//переменные для формы добавления карточек
export const titleInput = addFormElement.querySelector("#title");
export const linkInput = addFormElement.querySelector("#link");
export const elementVisible = document.querySelector(".elements");
