class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  // create a private menthod to show error
  _showInputError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //create a private method to hide an error
  _hideInputError(inputEl) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _isFormValid() {
    return this._inputs.every((input) => input.validity.valid);
  }
  _toggleButtonState() {
    if (this._isFormValid()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this.disableButton();
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners() {
    this._inputs = [...this._form.querySelectorAll(this._inputSelector)];
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    // this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    // this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    // toggleButtonState(inputEls, submitButton, options);
    // inputEls.forEach((inputEl) => {
    //   inputEl.addEventListener("input", (_e) => {
    //     checkInputValidity(this._form, inputEl, options);
    //     toggleButtonState(inputEls, submitButton, options);
    //   });
    // });
  }

  enableValidation() {
    // this._form.addEventListener("submit", (e) => {
    //   e.preventDefault();
    // });

    this._setEventListeners();
  }
}

export default FormValidator;
