import './pages/index.css';  
import { createCard, addCard, renderCard, deleteCard, likeCard,  } from './scripts/card.js'
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getCardsFromServer, getProfileInfoFromServer, updateProfileInfoOnServer,
  addCardToServer, updatAvatarOnServer } from './scripts/api.js';

let id_ = '';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');

//После загрузки с сервера отображаем на странице карточки и инфорамцию пользователя
Promise.all([getCardsFromServer, getProfileInfoFromServer])
  .then(() => {
    getCardsFromServer()
      .then(cardsArray => {
        cardsArray.forEach(item => {
          const card = createCard(item, deleteCard, cardTemplate, likeCard, showImageInPopup);
          renderCard(placesList, card)
        });
      })
      .catch(console.error)

    getProfileInfoFromServer()
      .then((data) => {
        //Обновление данных пользователя
        id_ = data['_id'];
        const currentProfileTitle = document.querySelector('.profile__title');
        const currentProfileDescription = document.querySelector('.profile__description');

        currentProfileTitle.textContent = data.name;
        currentProfileDescription.textContent = data.about;
        
        //Аватар берется с сервера
        currentProfileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      })
      .catch(console.error)
  });

//Реакция на клик по кнопке "Редактировать профиль"
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = popupTypeEdit.querySelector('.popup__form');
const submitButtonEditProfile = popupTypeEdit.querySelector('.popup__button');
profileEditButton.addEventListener('click', function(evt) {
  profileEditForm.reset();

  //Перед тем как показать попап пользователю,
  //находим и подставляем в поля ввода попапа данные со страницы пользователя:
  const currentProfileTitle = document.querySelector('.profile__title');
  // const popupInputName = popupTypeEdit.querySelector('.popup__input_type_name');

  // console.log(currentProfileTitle)
  // console.log(popupInputName)
  nameInput.value = currentProfileTitle.textContent; //!

  const currentProfileDescription = document.querySelector('.profile__description');
  // const popupInputDescription = popupTypeEdit.querySelector('.popup__input_type_description');
  jobInput.value = currentProfileDescription.textContent;

  //Валидация: очистка инпутов формы
  // console.log("-------------------")
  // console.log(profileEditForm)
  // console.log(nameInput) //2й раз null
  // console.log(jobInput) //2й раз null
  // console.log(submitButtonEditProfile)
  clearValidation(profileEditForm, [nameInput, jobInput], submitButtonEditProfile, 
    'popup__button', 'popup__button_disabled', 'popup__input_type_error',  'popup__error_visible');

  //Открываем попап редактирования профиля
  openPopup(popupTypeEdit);
});

//Реакция на клик по кнопке "Добавить новую карточку"
const profileAddButton = document.querySelector('.profile__add-button');
const addNewCardForm = popupTypeNewCard.querySelector('.popup__form');
const submitButtonAddNewCard = popupTypeNewCard.querySelector('.popup__button');
profileAddButton.addEventListener('click', function(evt) {
  // addNewCardForm.reset();

  const popupInputCardName = popupTypeNewCard.querySelector('.popup__input_type_card-name');
  const popupInputUrl = popupTypeNewCard.querySelector('.popup__input_type_url');

  // console.log("!!!")
  // console.log(popupInputCardName);
  // console.log(popupInputUrl)
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

  submitEdit.textContent = 'Сохранение...';

  //Отправка данных о пользователе на сервер
  updateProfileInfoOnServer(newName, newJob)
  .then((data) => {
    currentProfileTitle.textContent = data.name;
    currentProfileDescription.textContent = data.about;
    closePopup(popupTypeEdit);
  })
  .catch(console.error)
  .finally(() => {
    submitEdit.textContent = 'Сохранить';
  });
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

    submitNewCard.textContent = 'Сохранение...';

    addCardToServer(newCard.name, newCard.link)
    .then((data) => {
      addCard(newCard, cardTemplate, placesList);
      console.log("add")
    })
    .catch(console.error)
    .finally(() => {
      submitNewCard.textContent = 'Сохранить';
      closePopup(popupTypeNewCard);
    });
}

//По клику на кнопку "Сохранить изменения" в попапе добавления изображения,
//на страницу добавляется новая карточка с данными, введенными в поля ввода попапа
submitNewCard.addEventListener('submit', addNewCardFormSubmit); 

document.addEventListener('mousedown', closePopupByOverlay);

//Включение валидации всех форм
enableValidation('.popup__form', '.popup__input', '.popup__button', 'popup__button_disabled', 'popup__input_type_error', 'popup__error_visible');

//Обновление аватара пользователя
const avatarEditButton = document.querySelector('.profile__avatar-edit'); 
const popupTypeAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const changeAvatarForm = popupTypeAvatarEdit.querySelector('.popup__form');
avatarEditButton.addEventListener('click', function(evt) {
  //Валидация: очистка инпута формы
  clearValidation(changeAvatarForm, [popupInputAvatarUrl], submitEditAvatar, 
    '.popup__button', 'popup__button_disabled', 'popup__input_type_error',  'popup__error_visible');

  openPopup(popupTypeAvatarEdit);
})

const popupInputAvatarUrl = popupTypeAvatarEdit.querySelector('.popup__input_type_url');
const currentProfileAvatar = document.querySelector('.profile__image');
const submitEditAvatar = popupTypeAvatarEdit.querySelector('.popup__form');
function changeAvatar(evt) {
  evt.preventDefault();

  const newAvatar = popupInputAvatarUrl.value;

  submitEditAvatar.textContent = 'Сохранение...';
  updatAvatarOnServer(newAvatar)
  .then((data) => {
    currentProfileAvatar.style.backgroundImage = `url(${newAvatar})`
    closePopup(popupTypeAvatarEdit);
  })
  .catch(console.error)
  .finally(() => {
    submitEditAvatar.textContent = 'Сохранить';
  });
}

//По клику на кнопку "Сохранить изменения" в попапе изменения аватара,
//на странице обновляется аватар, изменения отправляются на сервер
submitEditAvatar.addEventListener('submit', changeAvatar); 