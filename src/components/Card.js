class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    deleteImageClick
  ) {
    // TODO asign _id to this object
    // TODO pass delete handler and assign to this object
    this._handleImageClick = handleImageClick;
    this._deleteImageClick = deleteImageClick;
    this._name = name;
    this._link = link;
    // this._id = data.id;
    this._cardSelector = cardSelector;
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        // TODO call the function passed in from index.js
        // pass it the this object as argument
        // this.removeCard();
        this._deleteImageClick(this);
      });
    //.".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    // get the card view
    // this._cardImageElement = this._cardElement.querySelector(".card__image");
    // this._cardImageElement.src = this._link;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}

export default Card;
