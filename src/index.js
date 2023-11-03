import './pages/index.css';  
import { initialCards } from './scripts/cards.js'; 

const cardTemplate = document.querySelector('#card-template').content; 

const placesList = document.querySelector('.places__list');

function createCard(cardData, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.alt;

  card.querySelector('.card__delete-button').onclick = deleteCard;

  return card;
}

function deleteCard(e) {
  e.target.parentElement.remove();
}

function renderCard(placesList, card) {
  placesList.append(card); 
}

for (let item of initialCards) {
  const card = createCard(item, deleteCard);
  renderCard(placesList, card);
}