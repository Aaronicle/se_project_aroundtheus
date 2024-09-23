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
  _showInpoutError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textcontent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //create a private method to hide an error
  _hideInputError(inputEl) {
    const errorElement = this._element.querySelector(`#${inputEl.id}-error`);
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

  _toggleButtonState() {
    const inputs = [...this._form.querySelectorAll(this._inputSelector)];
    const isFormValid = inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListeners() {
    const inputs = [...this._form.querySelectorAll(this._inputSelector)];

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
        this.toggleButtonState();
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
