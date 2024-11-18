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

//Constants
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0bf64e41-5628-4dd5-aa86-0207ee40e68a",
    "Content-Type": "application/json",
  },
});

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const deleteCardModal = document.querySelector("#delete-popup");
const deleteBtn = document.querySelector(".card__delete-button");

function handleDeleteClick(card) {
  confirmationPopup.open();
  confirmationPopup.setSubmitAction(() => {
    api
      .removeCard(card.id)
      .then(() => {
        card.removeCard();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.error(`Error deleting card ${err}`);
      });
  });
  // call setSubmitAction function
  // pass it an arrow function
  // inside arrow function is where you make the api request
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopup.open({ link, name });
    },
    handleDeleteClick
  );

  const cardElement = card.getView();
  return cardElement;
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

function renderCard(cardData) {
  const newCard = getCardElement(cardData);
  cardList.addItem(newCard);
}

const cardList = new Section({ renderer: renderCard }, ".cards__list");

api
  .getAppInfo()
  .then(([userData, cards]) => {
    console.log(cards);
    cardList.renderItems(cards);
    profileUserInfo.setUserInfo(userData);
  })
  .catch((error) => console.error(error));

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: (data) => {
    api
      .addCard(data)
      .then((card) => {
        renderCard(card);
        cardFormValidator.disableButton();
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: ({ title, description }) => {
    api
      .updateProfileInfo({ title, description })
      .then((data) => {
        profileUserInfo.setUserInfo(data);
        editFormValidator.disableButton();
      })
      .catch((error) => {
        console.log(error);
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
});

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

cardFormValidator.enableValidation();
editFormValidator.enableValidation();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
