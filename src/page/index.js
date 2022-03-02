import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js'

import { 
  initialCards,
  configs,
  addFormElement,
  editFormElement,
  editButton,
  addButton,
  nameInput,
  statusInput
} from '../utils/constants.js';

import './index.css';

//Создание валидаторов и их запуск
const validationAddForm = new FormValidator(configs, addFormElement.querySelector(configs.formSelector))
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(configs, editFormElement.querySelector(configs.formSelector))
validationEditForm.enableValidation();

// информация о пользователе
const userInfo = new UserInfo('.profile__name','.profile__status')

//отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item)=>{
    prependCard(item)
    console.log(item)
  }
}, '.elements')

cardList.renderItems();

 function prependCard(item) {
  const card = new Card(item, '#element', ()=> handleCardClick(item));
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
} 

//Создание попапа редактирования профиля
const editFormPopup = new PopupWithForm(
  "#edit-form", 
(data) =>{
  userInfo.setUserInfo(data)
}
  
)
editFormPopup.setEventListeners();
editButton.addEventListener('click', ()=> {
  editFormPopup.open();
  setInfoInInputs( userInfo.getUserInfo())
})

function setInfoInInputs({name,job}){
  nameInput.value = name;
  statusInput.value = job;
}


//Создание попапа добавления карточек
const addFormPopup = new PopupWithForm(
  '#add-place',
  (data)=>{
    handleAddFormSubmit(data)
  }
)
addFormPopup.setEventListeners();
addButton.addEventListener('click', ()=>{
  addFormPopup.open();
})

function handleAddFormSubmit(data) {
    prependCard(data);
    validationAddForm.disableSubmitButton()
} 
//Создание попапа с картинкой
const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

function handleCardClick(item){
  popupWithImage.open(item);
}