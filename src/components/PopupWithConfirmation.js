import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      console.log("I was clicked");
      this._handleSubmit();
    });
  }
}
export default PopupWithConfirmation;
