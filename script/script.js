import {Card, imageForm} from './card.js'
import {FormValidator, configs} from './validate.js';
// исходные карточки на странице




// формы
const editForm = document.querySelector("#edit-form");
const addForm = document.querySelector("#add-place");
const editFormElement = editForm.querySelector(".popup__rectangle");
const addFormElement = addForm.querySelector(".popup__rectangle");


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

//добавление новых карточек
 function handleAddFormSubmit(event) {
    
    event.preventDefault();
    const card = new Card({
        name: titleInput.value,
        link: linkInput.value,
      }, '#element');
      card.prependCard(card);
      const validationForm = new FormValidator(configs, addForm.querySelector(configs.formSelector))
      validationForm._disableSubmitButton(addForm.querySelector(configs.submitButtonSelector))
    linkInput.value = "";
    titleInput.value = "";
    closePopup(addForm);
  } 
addFormElement.addEventListener("submit", handleAddFormSubmit); 



export {openPopup}