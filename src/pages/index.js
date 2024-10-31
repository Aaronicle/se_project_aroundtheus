import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImages from "../components/PopupWithImages.js";

//Constants

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open({ link, name });
  });

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

const cardList = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

cardList.renderItems();

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: (data) => {
    renderCard(data);
    cardFormValidator.disableButton();
  },
});

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    profileUserInfo.setUserInfo(data);
  },
});

const imagePopup = new PopupWithImages({
  popupSelector: "#image-popup",
});

imagePopup.setEventListeners();

const profileUserInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
});

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
