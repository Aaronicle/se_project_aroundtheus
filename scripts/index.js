const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#profile-close-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardCloseBtn = document.querySelector("#card-close-btn");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardTitleInput = document.querySelector("#card-title");
const addImageUrlValue = document.querySelector("#card-link");
const imageModal = document.querySelector("#image-popup");
const imageCloseButton = document.querySelector("#img-close-btn");
const modalCaption = document.querySelector(".modal__caption");
const modalImageElement = document.querySelector(".modal__image-popup");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//FUNCTIONS//

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  //cardElement.remove()

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaption.textContent = cardTitleEl.textContent;
    openPopup(imageModal);
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    action(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopup);
};

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddFormSubmit(e) {
  e.preventDefault();
  const card = {
    name: cardTitleInput.value,
    link: addImageUrlValue.value,
  };

  const cardElement = getCardElement(card);

  cardListEl.prepend(cardElement);
  closePopup(cardAddModal);
  cardAddForm.reset();
}

//EVENT LISTENERS//

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

profileCloseBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});
cardCloseBtn.addEventListener("click", () => {
  closePopup(cardAddModal);
});
imageCloseButton.addEventListener("click", (evt) => {
  // evt.target
  // evt.target.closest(".modal")
  closePopup(imageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddFormSubmit);

profileEditModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(profileEditModal);
  }
});

cardAddModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(cardAddModal);
  }
});

imageModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(imageModal);
  }
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
