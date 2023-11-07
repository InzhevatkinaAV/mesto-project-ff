export function addCard(newCard, cardTemplate, placesList) {
  const card = createCard(newCard, deleteCard, cardTemplate, likeCard);
  placesList.prepend(card);
}

export function createCard(cardData, deleteCard, cardTemplate, likeCard, showImageInPopup) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.alt;

  card.querySelector('.card__delete-button').onclick = deleteCard;
  card.querySelector('.card__like-button').onclick = likeCard;

  card.querySelector('.card__image').addEventListener('click', showImageInPopup);

  return card;
}

export function deleteCard(e) {
  e.target.closest('.card').remove();
}

export function renderCard(placesList, card) {
  placesList.append(card); 
}

export function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}