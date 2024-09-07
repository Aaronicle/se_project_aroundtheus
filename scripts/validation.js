function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(
  inputEls,
  submitButtonElement,
  { inactiveButtonClass }
) {
  let foundInvalid = false;
  inputEls.forEach((input) => {
    if (!input.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const submitButton = formEl.querySelector(submitButtonSelector);
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  // toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {});

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
