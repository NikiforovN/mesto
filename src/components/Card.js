
export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }
  _getCard() {
    const elementTemplate = document.querySelector(this._selector).content;
    const cardElement = elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  createCard() {
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
        this._handleCardClick();
      });

  }



  _deleteCard(event) {
    event.target.closest(".element").remove();
  }

  
}

