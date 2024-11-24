export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatar }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileJobElement = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      profileName: this._profileNameElement.textContent,
      profileJob: this._profileJobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileNameElement.textContent = userData.name;
    this._profileJobElement.textContent = userData.about;
  }

  setUserAvatar(userData) {
    if (userData.avatar) {
      this._profileAvatar.src = userData.avatar;
    }
  }
}
