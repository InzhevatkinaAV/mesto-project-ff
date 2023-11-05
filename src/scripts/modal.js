//Открыть модальное окно
export function openPopup(evt, popupTypeEdit, popupTypeNewCard, popupTypeImage) {
  if (evt.target.classList.contains('profile__edit-button')) {
    addNewClassToComponent('popup_is-animated', popupTypeEdit);
    
    setTimeout(function() {
      addNewClassToComponent('popup_is-opened', popupTypeEdit);
      showInfoInPopup(popupTypeEdit);
      popupTypeEdit.style.opacity = 1;
      addListenerOnPopup(popupTypeEdit);
    }, 100);

  } else if (evt.target.classList.contains('profile__add-button')) {
    addNewClassToComponent('popup_is-animated', popupTypeNewCard);

    setTimeout(function() {
      addNewClassToComponent('popup_is-opened', popupTypeNewCard);
      popupTypeNewCard.style.opacity = 1;
      addListenerOnPopup(popupTypeNewCard);
    }, 100);

  } else if (evt.target.closest('.card__image')) {
    addNewClassToComponent('popup_is-animated', popupTypeImage);

    setTimeout(function() {
    addNewClassToComponent('popup_is-opened', popupTypeImage);
    popupTypeImage.style.opacity = 1;
    addListenerOnPopup(popupTypeImage);

    const card = evt.target.closest('.card__image');
    showImageInPopup(evt, popupTypeImage, card);
    }, 100);
  }
}

function addListenerOnPopup(popup) {
  popup.addEventListener('click', closePopup);
  popup.addEventListener('keydown', closePopup);
}

function addNewClassToComponent(newClass, component) {
  component.classList.add(newClass);
}

function showImageInPopup(evt, popupTypeImage, card) {
  const img = popupTypeImage.querySelector('img');
  img.src = evt.target.closest('.card__image').src;
  img.alt = evt.target.closest('.card__image').title;

  const caption = popupTypeImage.querySelector('.popup__caption');
  caption.innerHTML = card.parentNode.querySelector('.card__title').innerHTML;
}

function showInfoInPopup(popupTypeEdit) {
  const popupInputName = popupTypeEdit.querySelector('.popup__input_type_name');
  const currentProfileTitle = document.querySelector('.profile__title');
  popupInputName.value = currentProfileTitle.innerHTML || null;

  const popupInputDescription = popupTypeEdit.querySelector('.popup__input_type_description');
  const currentProfileDescription = document.querySelector('.profile__description');
  popupInputDescription.value = currentProfileDescription.innerHTML || null;
}

export function closePopup(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close') || evt.key === 'Escape'
    || evt.target.classList.contains('popup__button')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    removePopup(openedPopup);  
  }
}

function removePopup(component) {
    component.classList.remove('popup_is-opened');
    component.classList.remove('popup__image');
    
    component.style.opacity = 0;

    setTimeout(function() {
      addNewClassToComponent('popup_is-animated', component);
    }, 600);

    removeListenerFromPopup(component)
}

function removeListenerFromPopup(popup) {
  popup.removeEventListener('click',  closePopup);
  popup.removeEventListener('keydown',  closePopup);
}