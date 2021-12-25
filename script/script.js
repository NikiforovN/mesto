// исходные карточки на странице
const initialCards = [
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


// формы
const editForm = document.querySelector("#edit-form");
const addForm = document.querySelector("#add-place");
let editFormElement = editForm.querySelector(".popup__rectangle");
let addFormElement = addForm.querySelector(".popup__rectangle");
const imageForm = document.querySelector("#image-popup");


// кнопки
const editButton = document.querySelector(".profile__edit-button");
const editFormCloseButton = editForm.querySelector(".close-icon");
const addButton = document.querySelector(".profile__add-button");
const addFormCloseButton = addForm.querySelector(".close-icon");
const imageFormCloseButton = imageForm.querySelector(".close-icon");


// данные для формы редактирования
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");


// инпуты формы редактирования профиля
let nameInput = editFormElement.querySelector("#name");
let statusInput = editFormElement.querySelector("#status");


//переменные для формы добавления карточек
let titleInput = addFormElement.querySelector("#title");
let linkInput = addFormElement.querySelector("#link");


//функция открытия и закрытия форм
function popupToggle(popup){
  popup.classList.toggle('popup_opened')
}


//Открытие формы редактирования профиля
editButton.addEventListener("click", () => {
  popupToggle(editForm);
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
});


//Закрытие формы редактирования профиля
editFormCloseButton.addEventListener("click", () => popupToggle(editForm));


//Открытие формы добавления карточек
addButton.addEventListener("click", () => popupToggle(addForm));


//Закрытие формы добавления карточек
addFormCloseButton.addEventListener("click", () => popupToggle(addForm));


//Закрытие формы с картинкой
imageFormCloseButton.addEventListener('click', () => popupToggle(imageForm));


// редактирование профиля
function formSubmitHandlerEditForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  popupToggle(editForm);
}
editFormElement.addEventListener("submit", formSubmitHandlerEditForm);


//функция получения src картинки карточки
function getPopupImageSrc(event) {
  return event.target.closest('.element__image').src;
}


//функция получения названия карточки
function getPopupImageTitle(event) {
  return event.target.closest('.element').querySelector('.element__title').textContent;
}


//функция удаления карточки
function deleteCard(event){
  event.target.closest('.element').remove();
}


//рендерим исходные карточки на странице
const elementTemplate = document.querySelector("#element").content;
const elementVisible = document.querySelector(".elements");

function createCard(item) {
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = elementCard.querySelector(".element__image");
  const elementTitle = elementCard.querySelector(".element__title");
  const elementTrashButton = elementCard.querySelector(".element__trash-button");
  const elementLikeButton = elementCard.querySelector(".element__like-button");

  elementImage.src = item.link;
  elementTitle.textContent = item.name;
  
  elementTrashButton.addEventListener('click', deleteCard);
  elementLikeButton.addEventListener('click', ()=> elementLikeButton.classList.toggle('element__like-button_active'));
  elementImage.addEventListener('click', function(event){
    const imageSrc = imageForm.querySelector('.popup__pic');
    const imageTitle = imageForm.querySelector('.popup__caption');
    imageSrc.src = getPopupImageSrc(event);
    imageTitle.textContent = getPopupImageTitle(event);
    popupToggle(imageForm);
  });

  elementVisible.prepend(elementCard);
}
initialCards.forEach(createCard);


//добавление новых карточек
function formSubmitHandlerAddForm(event) {
  event.preventDefault();

  createCard({
    name: titleInput.value,
    link: linkInput.value
  });
  linkInput.value = "";
  titleInput.value = "";

  popupToggle(addForm)
}
addFormElement.addEventListener("submit", formSubmitHandlerAddForm);


