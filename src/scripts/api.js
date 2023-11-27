//Как сделать запрос к серверу:
// fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
//   headers: {
//     authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20'
//   }
// })  
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
// }); 

//Загрузка информации о пользователе с сервера:
// fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
//   method: 'GET',
//   headers: {
//     authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20'
//   }
// })  
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
// });

//Загрузка карточек с сервера
export function getCardsFromServer() {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards`, {
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse);
}

//Добавление новой карточки на сервер
export const addCardToServer = (cardName, cardLink) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards`, {
    method: 'POST',  
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(handleResponse)
}

//Редактирование профиля, отправка изменений на сервер
export function updateProfileInfoOnServer(newName, newJob) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1//users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then(handleResponse)
}

//Получение данных профиля с сервера
export const getProfileInfoFromServer = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/users/me`, {
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
  })
  .then(handleResponse)
} 

//Удаление карточки с сервера
export const deleteCardFromServer = (card) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${card}`, {
    method: 'DELETE',  
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
  })
  .then(handleResponse)
}

//Отправка лайка на сервер
export const likeCardOnServer = (card) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${card}`, {
    method: 'PUT',  
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
  })
  .then(handleResponse)
}

//Убрать лайк с сервера
export const dislikeCardOnServer = (card) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${card}`, {
    method: 'DELETE',  
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
  })
  .then(handleResponse)
}

//Обновление аватара пользователя
export const updatAvatarOnServer = (url) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar`, {
    method: 'PATCH',  
    headers: {
      authorization: '9d6a2078-c8bd-460f-aba9-4f83db3dbd20',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(handleResponse)
}

function handleResponse(response) {
  if (response.ok) 
    return response.json();
  else
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${response.status}`);
};