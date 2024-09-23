const imageModalWindow = document.querySelector(".modal__image");
const imageElement = document.querySelector(".modal__image-popup");
const imageCaption = document.querySelector(".modal__caption");

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

const isEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_opened");
    if (evt.key === "Escape") {
      action(activePopup);
    }
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopup);
};

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
        this._handleDeleteCard();
      });
    //.".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaption.textContent = cardTitleEl.textContent;
    openPopup(imageModal);
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
    this._cardElement.querySelector(
      ".card__image"
    ).style.background = `url(${this._link})`;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}

export default Card;
