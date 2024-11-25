import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}
export default PopupWithConfirmation;
