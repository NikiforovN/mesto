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
const getProfilePromise = new Promise(()=>{
  api.getProfile()
.then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res)
  userId = res._id;
})
.catch(console.log);
})

const getInitialCardsPromise = new Promise(()=>{
  api.getInitialCards()
.then((res) => {
  cardList.renderItems(res);
})
.catch(console.log);
})

const promises = [getInitialCardsPromise, getProfilePromise];

Promise.all(promises)
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
    renderer: (item) => {
      prependCard(item);
    },
  },
  ".elements"
);


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
        api.deleteCard(id)
        .then(() => {
          card.deleteCard();
        })
        .catch(res => console.log(`Ошибка: ${res.status}`));
      });
    },
    userId,
    //обработчик лайков
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
        .then((res) => {
          card.setLike(res.likes);
        })
        .catch(res => console.log(`Ошибка: ${res.status}`));
      } else {
        api.putLike(id)
        .then((res) => {
          card.setLike(res.likes);
        })
        .catch(res => console.log(`Ошибка: ${res.status}`));
      }
    }
  );
  const cardElement = card.createCard();
  cardList.prependItem(cardElement);
}

//Создание попапа редактирования профиля
const editFormPopup = new PopupWithForm("#edit-form", (data) => {
  editFormPopup.isLoading(true)
  api.editProfile(data)
  .then(() => {
    userInfo.setUserInfo(data)
    editFormPopup.close()
  })
  .catch(res => console.log(`Ошибка: ${res.status}`))
  .finally(()=>editFormPopup.isLoading(false));
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
  .then((res) => {
    prependCard(res);
    addFormPopup.close();
    validationAddForm.disableSubmitButton();
  })
  .catch(res => console.log(`Ошибка: ${res.status}`))
  .finally(()=>addFormPopup.isLoading(false));

  
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
    userInfo.setUserAvatar(res);
    avatarPopup.close()
    validationAvatarForm.disableSubmitButton()
  })
  .catch(res => console.log(`Ошибка: ${res.status}`))
  .finally(()=>avatarPopup.isLoading(false));
  
  
}

