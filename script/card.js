import { openPopup } from "./script.js";

const imageForm = document.querySelector("#image-popup"); 

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
const elementVisible = document.querySelector(".elements");

class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    
  }
  _getCard() {
    const elementTemplate = document.querySelector(this._selector).content;
    const cardElement = elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _createCard() {
    this._element = this._getCard();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementTrashButton = this._element.querySelector(".element__trash-button");
    this._elementLikeButton = this._element.querySelector(".element__like-button");
   
    

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {  
    this._elementTrashButton.addEventListener("click", this._deleteCard);

    this._elementLikeButton.addEventListener("click", () =>
      this._elementLikeButton.classList.toggle("element__like-button_active")
    );

    this._elementImage.addEventListener("click",  () => {
        this._setImagePopup();
        openPopup(imageForm);
      });

  }

  _setImagePopup(){
    
    this._imageSrc =  imageForm.querySelector(".popup__pic");
    this._imageTitle =  imageForm.querySelector(".popup__caption");

    this._imageSrc.src =this._link;
    this._imageSrc.alt = this._name;
    this._imageTitle.textContent = this._name;
  }

  _deleteCard(event) {
    event.target.closest(".element").remove();
  }

  prependCard(card) {
    const cardElement = card._createCard();
    elementVisible.prepend(cardElement);
  }
}
initialCards.forEach((item)=>{
   const card = new Card(item, '#element');
   card.prependCard(card);
  });

export {Card, imageForm};


