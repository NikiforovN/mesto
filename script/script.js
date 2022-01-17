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
const editFormElement = editForm.querySelector(".popup__rectangle");
const addFormElement = addForm.querySelector(".popup__rectangle");
const imageForm = document.querySelector("#image-popup");

// Переменные для попапа с картинкой
const imageSrc = imageForm.querySelector(".popup__pic");
const imageTitle = imageForm.querySelector(".popup__caption");

// кнопки
const editButton = document.querySelector(".profile__edit-button");
const editFormCloseButton = editForm.querySelector(".close-icon");
const addButton = document.querySelector(".profile__add-button");
const addFormCloseButton = addForm.querySelector(".close-icon");
const imageFormCloseButton = imageForm.querySelector(".close-icon");

// данные для формы редактирования
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

// инпуты формы редактирования профиля
const nameInput = editFormElement.querySelector("#name");
const statusInput = editFormElement.querySelector("#status");

//переменные для формы добавления карточек
const titleInput = addFormElement.querySelector("#title");
const linkInput = addFormElement.querySelector("#link");


//функции открытия и закрытия форм
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown',closePopupByEsc);
  enableValidation();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown',closePopupByEsc);
}

function closePopupByClickOnOverlay(evt){
  if (evt.target === evt.currentTarget)
  closePopup(evt.target);
}

function closePopupByEsc(evt){
  if (evt.key === 'Escape')
  closePopup(evt.currentTarget.querySelector('.popup_opened'));
}
//Открытие формы редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(editForm);
});


//Закрытие формы редактирования профиля
editFormCloseButton.addEventListener("click", () => closePopup(editForm));
editForm.addEventListener('click',closePopupByClickOnOverlay);



//Открытие формы добавления карточек
addButton.addEventListener("click", () => openPopup(addForm));


//Закрытие формы добавления карточек
addFormCloseButton.addEventListener("click", () => closePopup(addForm));
addForm.addEventListener('click',closePopupByClickOnOverlay);

//Закрытие формы с картинкой
imageFormCloseButton.addEventListener("click", () => closePopup(imageForm));
imageForm.addEventListener('click',closePopupByClickOnOverlay);

// редактирование профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(editForm);
}
editFormElement.addEventListener("submit", handleProfileFormSubmit);


//функция удаления карточки
function deleteCard(event) {
  event.target.closest(".element").remove();
}


//рендерим исходные карточки на странице
const elementTemplate = document.querySelector("#element").content;
const elementVisible = document.querySelector(".elements");

function createCard(item) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const elementTitle = cardElement.querySelector(".element__title");
  const elementTrashButton = cardElement.querySelector(".element__trash-button");
  const elementLikeButton = cardElement.querySelector(".element__like-button");

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;
    
  elementTrashButton.addEventListener("click", deleteCard);
  elementLikeButton.addEventListener("click", () => elementLikeButton.classList.toggle("element__like-button_active"));
  elementImage.addEventListener("click", function () {
    imageSrc.src = item.link;
    imageSrc.alt = item.name;
    imageTitle.textContent = item.name;
    openPopup(imageForm);
  });

  return cardElement;
}

function prependCard(item) {
  const cardElement = createCard(item)
  elementVisible.prepend(cardElement);
}

initialCards.forEach(prependCard);


//добавление новых карточек
function handleAddFormSubmit(event) {
  event.preventDefault();

  prependCard({
    name: titleInput.value,
    link: linkInput.value,
  });
  linkInput.value = "";
  titleInput.value = "";
  closePopup(addForm);
}
addFormElement.addEventListener("submit", handleAddFormSubmit);






