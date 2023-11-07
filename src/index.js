import './pages/index.css';  
import { initialCards } from './scripts/cards.js';
import { createCard, addCard, renderCard, deleteCard, likeCard,  } from './scripts/card.js'
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

showCards();

function showCards() {
  for (let item of initialCards) {
    const card = createCard(item, deleteCard, cardTemplate, likeCard, showImageInPopup);
    renderCard(placesList, card);
  }
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function(evt) {
  openPopup(popupTypeEdit);
});

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function(evt) {
  openPopup(popupTypeNewCard);
});

function showImageInPopup(evt) {
  const img = popupTypeImage.querySelector('img');
  img.src = evt.target.closest('img').src;
  img.alt = evt.target.closest('img').alt;

  const caption = popupTypeImage.querySelector('.popup__caption');
  caption.textContent = img.alt;

  openPopup(popupTypeImage);
}

//Редактирование данных пользователя
const submitEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');

function editProfileFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    const currentProfileTitle = document.querySelector('.profile__title');
    const currentProfileDescription = document.querySelector('.profile__description');

    currentProfileTitle.textContent = newName;
    currentProfileDescription.textContent = newJob;
    
    closePopup(popupTypeEdit);
}

submitEdit.addEventListener('submit', editProfileFormSubmit); 

//Добавление карточки
const submitNewCard = popupTypeNewCard.querySelector('.popup__form');
const nameCardInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const linkCardInput = popupTypeNewCard.querySelector('.popup__input_type_url');

function addNewCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardName = nameCardInput.value;
    const newUrl = linkCardInput.value;

    const newCard = {
      name: newCardName,
      link: newUrl,
      alt: newCardName,
    }

    addCard(newCard, cardTemplate, placesList);

    submitNewCard.reset();

    closePopup(popupTypeNewCard);
}

submitNewCard.addEventListener('submit', addNewCardFormSubmit); 

document.addEventListener('mousedown', closePopupByOverlay);