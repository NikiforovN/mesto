export class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }

    getProfile(){
       return fetch(`${this._baseUrl}/users/me`,
        {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))

    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,
        {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
  
    editProfile({name, about}){
        return fetch(`${this._baseUrl}/users/me`,
        {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
    addCard({name, link}){
        return fetch(`${this._baseUrl}/cards`,
        {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`,
        {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
    deleteLike(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,
        {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
    putLike(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,
        {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
    editAvatar({avatar}){
        return fetch(`${this._baseUrl}/users/me/avatar`,
        {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(`Ошибка: ${res.status}`))
    }
  }
  



 export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: '81063bdf-1ed9-4bcf-88aa-fb9855c3dd87',
      'Content-Type': 'application/json'
    }
  });