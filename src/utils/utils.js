export const renderLoading = (popSelector, isLoading = false) => {
  const currentActiveButton = document.querySelector(
    `${popSelector} .modal__button`
  );
  if (isLoading) {
    currentActiveButton.textContent = "Saving...";
  } else {
    currentActiveButton.textContent = "Save";
  }
};
