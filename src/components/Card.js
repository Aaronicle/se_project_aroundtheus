class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    deleteImageClick,
    handleLikeClick
  ) {
    // TODO asign _id to this object
    // TODO pass delete handler and assign to this object
    this._handleImageClick = handleImageClick;
    this._deleteImageClick = deleteImageClick;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = isLiked;
  }

  getId() {
    return this._id;
  }

  getLikeStatus() {
    return this._isLiked;
  }

  _setEventListeners() {
    //".card__like-button"

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
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

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  updateLikeBtn() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this.updateLikeBtn();
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}

export default Card;
