import { deleteCardFromServer, likeCardOnServer, dislikeCardOnServer } from './api.js';
import defaulPicture from '../images/picture_img_not_found.jpg';

const myId = 'ef36abce93dd9b4195075dd8';

export function addCard(newCard, cardTemplate, placesList) {
  const card = createCard(newCard, deleteCard, cardTemplate, likeCard);
  placesList.prepend(card);
}

export function createCard(cardData, deleteCard, cardTemplate, likeCard, showImageInPopup) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').alt = cardData.name;

  //Если картинка по link уже недоступна, то на ее место подставляется дефолтная с надписью "Picture not found"
  let promise = loadImage(cardData.link);
  promise.then(
    img => { 
      card.querySelector('.card__image').src = cardData.link;
    },
    error => {
      card.querySelector('.card__image').src = defaulPicture;
  });

  card.id = cardData['_id'];

  card.querySelector('.card__image').addEventListener('click', showImageInPopup);

  card.querySelector('.card__like-button').onclick = likeCard;
  const cardLikesCount = card.querySelector('.card__likes-count');
  cardLikesCount.textContent = cardData.likes.length;

  //Сердце под лайкнутой карточкой должно быть закрашено:
  cardData.likes.forEach(user => {
    if (user._id === myId) 
      toggleClassElement(card.querySelector('.card__like-button'), 'card__like-button_is-active')
  });

  if (cardData.owner._id != myId) 
    card.querySelector('.card__delete-button').style.display = 'none';
  else
    card.querySelector('.card__delete-button').onclick = deleteCard;

  return card;
}

function loadImage(src) {
	return new Promise(function(resolve, reject) {
		const img = document.createElement('img');
		img.src = src;
		
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(`Ошибка загрузки изображения ${src}`));
	});
}

export function deleteCard(e) {
  deleteCardFromServer(e.target.closest('.card').id) 
  .then(() => {
    e.target.closest('.card').remove();
  })
  .catch(console.error);
}

export function renderCard(placesList, card) {
  placesList.append(card); 
}

export function likeCard(e) {
  const cardLikesCount = e.target.closest('.card').querySelector('.card__likes-count');

  if (e.target.classList.contains('card__like-button_is-active')) {
    dislikeCardOnServer(e.target.closest('.card').id)
    .then(response => {
      cardLikesCount.textContent = response.likes.length;
    })
    .catch(console.error);
  } else {
    likeCardOnServer(e.target.closest('.card').id)
    .then(data => {
      cardLikesCount.textContent = data.likes.length;
    })
    .catch(console.error);
  }

  toggleClassElement(e.target, 'card__like-button_is-active')
}

function toggleClassElement(element, className) {
  element.classList.toggle(className);
}