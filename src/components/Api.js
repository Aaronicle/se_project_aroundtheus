class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error : ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this.checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard(cardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateProfileInfo({ title, description }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    });
  }

  getAppInfo() {
    return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateUserAvatar(avatarUrl) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  // other methods for working with the API
}

export default Api;
