

export default class Api {
    constructor(options) {
     this.baseUrl = options.baseUrl;
     this.headers = options.headers;
    }
  
    getInitialCards() {
      return fetch(this.baseUrl  + 'cards', { headers: this.headers})
        .then(res => res.json()) // (res) => { res.ok ? res.json() : Promise.reject(res.status)})
        .then((result) => {
          return result;
        }); 
    } 

    getUserInfo() {
      return fetch(this.baseUrl  + 'users/me', { headers: this.headers})
        .then(res => res.json()) 
        .then((data) => {
          return data;
        });
    }
    
    updateUserAvatar(avatarlink) {
      return fetch(this.baseUrl  + 'users/me/avatar', {  
        method: 'PATCH', 
        headers:  {authorization: '02f5ff8b-a10a-4ea8-87ee-4eeed01dea15',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          "avatar": avatarlink.link
        }) })
        .then(res => res.json()) 
        .then((result) => {
          return result;
        }); 
    }

    updateUserInfo(name, about) {
      return fetch(this.baseUrl  + 'users/me', {  
        method: 'PATCH', 
        headers: 
         {authorization: '02f5ff8b-a10a-4ea8-87ee-4eeed01dea15',
         'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          about: about
        }) })
        .then(res => res.json())
        .then((result) => {
          return result;
        }); 
    }

    postNewCard({name, link}) {
      return fetch(this.baseUrl  + 'cards', {  
        method: 'POST', 
        headers: 
         {authorization: '02f5ff8b-a10a-4ea8-87ee-4eeed01dea15',
         'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          link: link
        }) })
        .then(res => res.json()) 
        .then((result) => {
          return result;
        }); 
    }

    deleteCard(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId, {  
        method: 'DELETE', 
        headers: this.headers})
        .then(res => res.json()) 
        .then((result) => {
          return result;
        }); 
    }

    setLike(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId + '/likes', {  
        method: 'PUT', 
        headers: this.headers})
        .then(res => res.json()) 
        .then((result) => {
          return result;
        }); 
    }

    takeLike(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId + '/likes', {  
        method: 'DELETE', 
        headers: this.headers})
        .then(res => res.json())
        .then((result) => {
          return result;
        }); 
    }
}
