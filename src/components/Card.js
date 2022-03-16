
export default class Card {
  constructor(data, selector, handleCardClick, handleCardDeleteClick, userId, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id
    this._userId = userId;
    this._ownerId = data.owner._id
    

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCount = this._element.querySelector('.element__like-number');
    

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    this.setLike(this._likes);

    if (this._userId !== this._ownerId){
      this._elementTrashButton.style.display = 'none'
    }

  

    return this._element;
  }

  isLiked(){
    const hasLike = this._likes.find(user => user._id === this._userId)
     return hasLike
  }

  setLike(newLikesCount){
    this._likes = newLikesCount
    
    this._likeCount.textContent = this._likes.length
    if (this.isLiked()){
      this._elementLikeButton.classList.add("element__like-button_active")
    } else {
      this._elementLikeButton.classList.remove("element__like-button_active")
    }
  }

  _setEventListeners() {  
    this._elementTrashButton.addEventListener("click", ()=> this._handleCardDeleteClick(this._id));

    this._elementLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id)
      
    });

    this._elementImage.addEventListener("click",  () => {
        this._handleCardClick();
      });

  }



  deleteCard() {
    this._element.remove();
  }

  
}

