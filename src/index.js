import './pages/index.css';  
import { initialCards } from './scripts/cards.js';
import { createCard, addCard, renderCard, deleteCard, likeCard,  } from './scripts/card.js'
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

showCards();

//Показать карточки-заготовки на странице
function showCards() {
  for (let item of initialCards) {
    const card = createCard(item, deleteCard, cardTemplate, likeCard, showImageInPopup);
    renderCard(placesList, card);
  }
}

//Реакция на клик по кнопке "Редактировать профиль"
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = popupTypeEdit.querySelector('.popup__form');
const submitButtonEditProfile = popupTypeEdit.querySelector('.popup__button');
profileEditButton.addEventListener('click', function(evt) {
  //Перед тем как показать попап пользователю,
  //находим и подставляем в поля ввода попапа данные со страницы пользователя:
  const currentProfileTitle = document.querySelector('.profile__title');
  const popupInputName = popupTypeEdit.querySelector('.popup__input_type_name');
  popupInputName.value = currentProfileTitle.textContent;

  const currentProfileDescription = document.querySelector('.profile__description');
  const popupInputDescription = popupTypeEdit.querySelector('.popup__input_type_description');
  popupInputDescription.value = currentProfileDescription.textContent;

  //Валидация: очистка инпутов формы
  clearValidation(profileEditForm, [popupInputName, popupInputDescription], submitButtonEditProfile, 
    '.popup__button', 'popup__button_disabled', 'popup__input_type_error',  'popup__error_visible');

  //Открываем попап редактирования профиля
  openPopup(popupTypeEdit);
});

//Реакция на клик по кнопке "Добавить новую карточку"
const profileAddButton = document.querySelector('.profile__add-button');
const addNewCardForm = popupTypeNewCard.querySelector('.popup__form');
const submitButtonAddNewCard = popupTypeNewCard.querySelector('.popup__button');
profileAddButton.addEventListener('click', function(evt) {
  const popupInputCardName = popupTypeNewCard.querySelector('.popup__input_type_card-name');
  const popupInputUrl = popupTypeNewCard.querySelector('.popup__input_type_url');

  //Валидация: очистка инпутов формы
  clearValidation(addNewCardForm, [popupInputCardName, popupInputUrl], submitButtonAddNewCard, 
    '.popup__button', 'popup__button_disabled', 'popup__input_type_error',  'popup__error_visible');

  openPopup(popupTypeNewCard);
});

//Коллбэк для открытия попапа по клику на изображении в карточке
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

//По клику на кнопку "Сохранить изменения" в попапе редактирования профиля,
//данные из полей ввода подставляются в соответствующие области страницы
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

//По клику на кнопку "Сохранить изменения" в попапе добавления изображения,
//на страницу добавляется новая карточка с данными, введенными в поля ввода попапа
submitNewCard.addEventListener('submit', addNewCardFormSubmit); 

document.addEventListener('mousedown', closePopupByOverlay);

//Включение валидации всех форм
enableValidation('.popup__form', '.popup__input', '.popup__button', 'popup__button_disabled', 'popup__input_type_error', 'popup__error_visible');