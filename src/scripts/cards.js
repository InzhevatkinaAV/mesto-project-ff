const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Зеленые горы, местами лежит снег",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Лесное озеро в зимнем лесу",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Многоэтажные дома в предрассветных сумерках",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Мох у подножия вулкана",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Уходящая вдаль железная дорога, лес",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Отвесные скалы на берегу озера",
  },
];

const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

export function showCards() {
  for (let item of initialCards) {
    const card = createCard(item, deleteCard, cardTemplate, likeCard);
    renderCard(placesList, card);
  }
}

export function addCard(newCard) {
  const card = createCard(newCard, deleteCard, cardTemplate, likeCard);
  placesList.prepend(card);
}

function createCard(cardData, deleteCard, cardTemplate, likeCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.alt;

  card.querySelector('.card__delete-button').onclick = deleteCard;
  card.querySelector('.card__like-button').onclick = likeCard;

  return card;
}

function deleteCard(e) {
  e.target.parentElement.remove();
}

function renderCard(placesList, card) {
  placesList.append(card); 
}

function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}