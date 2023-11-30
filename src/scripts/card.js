import { deleteCardFromServer, likeCardOnServer, dislikeCardOnServer } from './api.js';
import defaulPictureLink from '../images/picture_img_not_found.jpg';

const defaulPicture = {
  name: 'Picture for missing pictures',
  link: defaulPictureLink
}

export function addCard(newCard, cardTemplate, placesList, showImageInPopup, myId) {
  const card = createCard(newCard, deleteCard, cardTemplate, likeCard, showImageInPopup, myId);
  placesList.prepend(card);
}

export function createCard(cardData, deleteCard, cardTemplate, likeCard, showImageInPopup, myId) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').alt = cardData.name;

  //Если картинка по link уже недоступна, то на ее место подставляется дефолтная с надписью "Picture not found"
  const loadImageCard = (img, url) => {  
    img.onerror = () => img.src = defaulPicture.link;
    img.src = url;
  }
  loadImageCard(card.querySelector('.card__image'), cardData.link);

  card.id = cardData._id; 

  card.querySelector('.card__image').addEventListener('click', showImageInPopup);

  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  const cardLikesCount = card.querySelector('.card__likes-count');
  cardLikesCount.textContent = 0;

  cardLikesCount.textContent = cardData.likes.length;

  //Сердце под лайкнутой карточкой должно быть закрашено:
  const isLikedByMe = cardData.likes.some(user => user._id === myId);
  if (isLikedByMe )
    toggleClassElement(card.querySelector('.card__like-button'), 'card__like-button_is-active')

  if (cardData.owner._id != myId)
    card.querySelector('.card__delete-button').remove();
  else
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
 
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
  //Ищу ближаюшую карточку (на которой нажали лайк)
  const cardLikesCount = e.target.closest('.card').querySelector('.card__likes-count');

  //Если она лайкнута ? дизлайкаем : лайкаем
  const likeMethod = e.target.classList.contains('card__like-button_is-active') ? dislikeCardOnServer : likeCardOnServer;
  likeMethod(e.target.closest('.card').id)
  .then(response => { 
    cardLikesCount.textContent = response.likes.length; 
    toggleClassElement(e.target, 'card__like-button_is-active') 
  }) 
  .catch(console.error);
}

function toggleClassElement(element, className) {
  element.classList.toggle(className);
}