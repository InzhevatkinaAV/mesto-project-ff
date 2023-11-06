import './pages/index.css';  
import { showCards, addCard } from './scripts/cards.js'; 
import { openPopup, closePopup } from './scripts/modal.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

showCards();

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function(evt) {
  openPopup(evt, popupTypeEdit, popupTypeNewCard, popupTypeImage);
});

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function(evt) {
  openPopup(evt, popupTypeEdit, popupTypeNewCard, popupTypeImage);
});

document.addEventListener('click', function(evt) {
  openPopup(evt, popupTypeEdit, popupTypeNewCard, popupTypeImage);
});

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
    
    closePopup(evt);
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

    if (newCardName && newUrl) {
      const newCard = {
        name: newCardName,
        link: newUrl,
        alt: newCardName,
      }

      addCard(newCard);
    }

    nameCardInput.value = '';
    linkCardInput.value = '';

    closePopup(evt);
}

submitNewCard.addEventListener('submit', addNewCardFormSubmit); 