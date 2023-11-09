export function openPopup(popup) {
  addNewClassToComponent('popup_is-animated', popup); 

  setTimeout(function() { 
    addNewClassToComponent('popup_is-opened', popup);
    popup.style.opacity = 1; 
  }, 100);

  document.addEventListener('keydown', closePopupByEsc);
}

function addNewClassToComponent(newClass, component) {
  component.classList.add(newClass);
}

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