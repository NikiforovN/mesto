import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { api } from "../components/Api.js";

import {
  configs,
  addFormElement,
  editFormElement,
  changeFormElement,
  editButton,
  addButton,
  nameInput,
  statusInput,
  avatarPopupButton,
} from "../utils/constants.js";

import "./index.css";

let userId;

//Подключаем апишки
api.getProfile().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res)
  userId = res._id;
});

api.getInitialCards().then((res) => {
  res.forEach((item) => prependCard(item));
});

//Создание валидаторов и их запуск
const validationAddForm = new FormValidator(
  configs,
  addFormElement.querySelector(configs.formSelector)
);
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(
  configs,
  editFormElement.querySelector(configs.formSelector)
);
validationEditForm.enableValidation();
const validationAvatarForm = new FormValidator(
  configs,
  changeFormElement.querySelector(configs.formSelector)
);
validationAvatarForm.enableValidation();
// информация о пользователе
const userInfo = new UserInfo(".profile__name", ".profile__status", ".profile__pic");

//отрисовка карточек
const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      prependCard(item);
      console.log(item);
    },
  },
  ".elements"
);

cardList.renderItems();

function prependCard(item) {
  const card = new Card(
    item,
    "#element",
    //обработчик клика по карточке
    () => handleCardClick(item),
    //обработчик удаления карточки
    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id).then(() => {
          card.deleteCard();
        });
      });
    },
    userId,
    //обработчик лайков
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((res) => {
          card.setLike(res.likes);
        });
      } else {
        api.putLike(id).then((res) => {
          card.setLike(res.likes);
        });
      }
    }
  );
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

//Создание попапа редактирования профиля
const editFormPopup = new PopupWithForm("#edit-form", (data) => {
  editFormPopup.isLoading(true)
  api.editProfile(data)
  .then(() => userInfo.setUserInfo(data))
  .finally(editFormPopup.isLoading(false));
});
editFormPopup.setEventListeners();
editButton.addEventListener("click", () => {
  editFormPopup.open();
  setInfoInInputs(userInfo.getUserInfo());
});

function setInfoInInputs({ name, about }) {
  nameInput.value = name;
  statusInput.value = about;
}

//Создание попапа добавления карточек
const addFormPopup = new PopupWithForm("#add-place", (data) => {
  handleAddFormSubmit(data);
});
addFormPopup.setEventListeners();
addButton.addEventListener("click", () => {
  addFormPopup.open();
});

function handleAddFormSubmit(data) {
  addFormPopup.isLoading(true)
  api.addCard(data)
  .then((res) => prependCard(res))
  .finally(addFormPopup.isLoading(false));

  validationAddForm.disableSubmitButton();
}
//Создание попапа с картинкой
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

function handleCardClick(item) {
  popupWithImage.open(item);
}

//Создание попапа подтверждения удаления
const confirmPopup = new PopupWithForm(".popup-confirm");
confirmPopup.setEventListeners();

//Создание попапа изменения аватарки
const avatarPopup = new PopupWithForm("#change-avatar", (data) => {
  handleAvatarFormSubmit(data)
});
avatarPopup.setEventListeners();
avatarPopupButton.addEventListener("click", () => {
  avatarPopup.open();
});

function handleAvatarFormSubmit(data) {
  avatarPopup.isLoading(true)
  api.editAvatar(data)
  .then((res)=> {
    userInfo.setUserAvatar(res)
  })
  .finally(avatarPopup.isLoading(false));
  
  validationAvatarForm.disableSubmitButton()
}

