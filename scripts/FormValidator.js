class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = formElement;
  }

  // create a private menthod to show error
  _showInpoutError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(this._inputErrorClass);
    errorElement.textcontent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //create a private method to hide an error
  _hideInputError(inputEl) {
    const errorElement = this._element.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(_inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(formEl) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, options);
    } else {
      hideInputError(formEl, inputEl, options);
    }
  }

  _toggleButtonState(inputList, btnEl) {}

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (_e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
