import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImages from "../components/PopupWithImages.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { renderLoading } from "../utils/utils.js";

//Constants
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0bf64e41-5628-4dd5-aa86-0207ee40e68a",
    "Content-Type": "application/json",
  },
});

const avatarEditBtn = document.querySelector("#avatar-edit-btn");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const avatarEditForm = document.querySelector("#avatar-edit-form");

function handleDeleteClick(card) {
  confirmationPopup.open();
  confirmationPopup.setSubmitAction(() => {
    api
      .removeCard(card._id)
      .then(() => {
        card.removeCard();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.error(`Error deleting card ${err}`);
      });
  });
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopup.open({ link, name });
    },
    handleDeleteClick,
    handleLikeCard
  );

  const cardElement = card.getView();
  return cardElement;
}

function handleLikeCard(card) {
  const isLiked = card.getLikeStatus();
  if (isLiked) {
    api
      .unlikeCard(card.getId())
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .likeCard(card.getId())
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

profileEditBtn.addEventListener("click", () => {
  const data = profileUserInfo.getUserInfo();
  profileTitleInput.value = data.profileName;
  profileDescriptionInput.value = data.profileJob;
  profileEditPopup.open();
});

cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
});

avatarEditBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

function renderCard(cardData) {
  const newCard = getCardElement(cardData);
  cardList.addItem(newCard);
}

const cardList = new Section({ renderer: renderCard }, ".cards__list");

api
  .getAppInfo()
  .then(([userData, cards]) => {
    cardList.renderItems(cards);
    profileUserInfo.setUserInfo(userData);
    profileUserInfo.setUserAvatar(userData);
  })
  .catch((error) => console.error(error));

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: (data) => {
    renderLoading("#card-add-modal", true);
    api
      .addCard(data)
      .then((card) => {
        renderCard(card);
        cardFormValidator.disableButton();
        cardAddForm.reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading("#card-add-modal", false);
      });
  },
});

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: ({ title, description }) => {
    renderLoading("#profile-edit-modal", true);
    api
      .updateProfileInfo({ title, description })
      .then((data) => {
        profileUserInfo.setUserInfo(data);
        editFormValidator.disableButton();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading("#profile-edit-modal", false);
      });
  },
});

const avatarEditPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: ({ avatarUrl }) => {
    renderLoading("#avatar-edit-modal", true);
    api
      .updateUserAvatar(avatarUrl)
      .then((data) => {
        profileUserInfo.setUserAvatar(data);
        avatarFormValidator.disableButton();
        avatarEditForm.reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading("#avatar-edit-modal", false);
      });
  },
});

const imagePopup = new PopupWithImages({
  popupSelector: "#image-popup",
});

imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: "#delete-popup",
});

confirmationPopup.setEventListeners();

const profileUserInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
  profileAvatar: ".profile__image",
});

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);
const avatarFormValidator = new FormValidator(config, avatarEditForm);

cardFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
avatarEditPopup.setEventListeners();
