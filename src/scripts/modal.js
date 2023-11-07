export function openPopup(popup) {
  addNewClassToComponent('popup_is-animated', popup); 

  setTimeout(function() { 
    addNewClassToComponent('popup_is-opened', popup); 
    showInfoInPopup(popup); 
    popup.style.opacity = 1; 
  }, 100);

  document.addEventListener('keydown', closePopupByEsc);
}

function addNewClassToComponent(newClass, component) {
  component.classList.add(newClass);
}

function showInfoInPopup(popup) {
  if (popup.classList.contains('popup_type_edit'))
    showInfoInEditPopup(popup);
  // else if (popup.classList.contains('popup_type_edit'))
  //   showImageInImagePopup(popup);
}

function showInfoInEditPopup(popupTypeEdit) {
  const popupInputName = popupTypeEdit.querySelector('.popup__input_type_name');
  const currentProfileTitle = document.querySelector('.profile__title');
  popupInputName.value = currentProfileTitle.innerHTML || null;

  const popupInputDescription = popupTypeEdit.querySelector('.popup__input_type_description');
  const currentProfileDescription = document.querySelector('.profile__description');
  popupInputDescription.value = currentProfileDescription.innerHTML || null;
}

// function showImageInImagePopup(popupTypeImage) {
//   const img = popupTypeImage.querySelector('img');
//   img.src = evt.target.closest('img').src;
//   img.alt = evt.target.closest('img').alt;

//   const caption = popupTypeImage.querySelector('.popup__caption');
//   caption.textContent = img.alt;
// }

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); //Находим открытый попап
    closePopup(openedPopup); //Закрываем его
  }
}

export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const openedPopup = document.querySelector('.popup_is-opened'); //Находим открытый попап
    closePopup(openedPopup); //Закрываем его
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); 
  popup.classList.remove('popup__image'); 

  popup.style.opacity = 0; 

  setTimeout(function() { 
    addNewClassToComponent('popup_is-animated', popup); 
  }, 600); 

  document.removeEventListener('keydown',  closePopupByEsc); 
}