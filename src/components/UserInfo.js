export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileJobElement = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileNameElement.textContent,
      profileJob: this._profileJobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileNameElement.textContent = userData.title;
    this._profileJobElement.textContent = userData.description;
  }
}
