/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={};function t(){return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards",{headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"}}).then(r)}e.p="";var o=function(){return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me",{headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"}}).then(r)};function r(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}const n=e.p+"images/picture_img_not_found.a0317e460cf1deb28088.jpg";var c="ef36abce93dd9b4195075dd8";function a(e,t,o,r,a){var i,u=o.querySelector(".card").cloneNode(!0);u.querySelector(".card__title").textContent=e.name,u.querySelector(".card__image").alt=e.name,(i=e.link,new Promise((function(e,t){var o=document.createElement("img");o.src=i,o.onload=function(){return e(o)},o.onerror=function(){return t(new Error("Ошибка загрузки изображения ".concat(i)))}}))).then((function(t){u.querySelector(".card__image").src=e.link}),(function(e){u.querySelector(".card__image").src=n})),u.id=e._id,u.querySelector(".card__image").addEventListener("click",a),u.querySelector(".card__like-button").onclick=r;var s=u.querySelector(".card__likes-count");return s.textContent=0,e.likes&&(s.textContent=e.likes.length,e.likes.forEach((function(e){e._id===c&&l(u.querySelector(".card__like-button"),"card__like-button_is-active")}))),u.querySelector(".card__delete-button").onclick=t,e.owner&&e.owner._id!=c&&(u.querySelector(".card__delete-button").style.display="none"),u}function i(e){var t;(t=e.target.closest(".card").id,fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/".concat(t),{method:"DELETE",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"}}).then(r)).then((function(){e.target.closest(".card").remove()})).catch(console.error),e.target.closest(".card").remove()}function u(e){var t,o=e.target.closest(".card").querySelector(".card__likes-count");e.target.classList.contains("card__like-button_is-active")?(t=e.target.closest(".card").id,fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(t),{method:"DELETE",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"}}).then(r)).then((function(t){o.textContent=t.likes.length,l(e.target,"card__like-button_is-active")})).catch(console.error):function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(e),{method:"PUT",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"}}).then(r)}(e.target.closest(".card").id).then((function(t){o.textContent=t.likes.length,l(e.target,"card__like-button_is-active")})).catch(console.error)}function l(e,t){e.classList.toggle(t)}function s(e){p("popup_is-animated",e),setTimeout((function(){p("popup_is-opened",e),e.style.opacity=1}),100),document.addEventListener("keydown",d)}function p(e,t){t.classList.add(e)}function d(e){"Escape"===e.key&&_(document.querySelector(".popup_is-opened"))}function _(e){e.classList.remove("popup_is-opened"),e.classList.remove("popup__image"),e.style.opacity=0,setTimeout((function(){p("popup_is-animated",e)}),600),document.removeEventListener("keydown",d)}function f(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);o.forEach((function(o){var r=e.querySelector(".".concat(o.id,"_error"));o.classList.remove(t.inputErrorClass),r.classList.remove(t.errorClass)})),r.classList.add(t.inactiveButtonClass)}function m(e,t,o){for(var r=!0,n=0;n<e.length;n++)if(!e[n].validity.valid){r=!1;break}r?(t.disabled=!1,t.classList.remove(o)):(t.disabled=!0,t.classList.add(o))}var y=function(e,t,o,r,n){var c=e.querySelector(".".concat(t.id,"_error"));c.textContent=o,c.classList.add(n),t.classList.add(r)},v=function(e,t,o,r){var n=e.querySelector(".".concat(t.id,"_error"));n.textContent="",n.classList.remove(r),t.classList.remove(o)},h=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),q=document.querySelector("#card-template").content,g=document.querySelector(".places__list");Promise.all([t,o]).then((function(){t().then((function(e){e.forEach((function(e){var t=a(e,i,q,u,T);!function(e,t){e.append(t)}(g,t)}))})).catch(console.error),o().then((function(e){e._id;var t=document.querySelector(".profile__title"),o=document.querySelector(".profile__description");t.textContent=e.name,o.textContent=e.about,I.style.backgroundImage="url('".concat(e.avatar,"')")})).catch(console.error)}));var C=document.querySelector(".profile__edit-button"),k=h.querySelector(".popup__form"),L=h.querySelector(".popup__button");C.addEventListener("click",(function(e){k.reset();var t=document.querySelector(".profile__title");z.value=t.textContent;var o=document.querySelector(".profile__description");A.value=o.textContent,f(k,N),s(h)}));var E=document.querySelector(".profile__add-button"),x=b.querySelector(".popup__form"),w=b.querySelector(".popup__button");function T(e){var t=S.querySelector("img");t.src=e.target.closest("img").src,t.alt=e.target.closest("img").alt,S.querySelector(".popup__caption").textContent=t.alt,s(S)}E.addEventListener("click",(function(e){b.querySelector(".popup__input_type_card-name"),b.querySelector(".popup__input_type_url"),f(x,N),s(b)}));var j=h.querySelector(".popup__form"),z=h.querySelector(".popup__input_type_name"),A=h.querySelector(".popup__input_type_description");j.addEventListener("submit",(function(e){e.preventDefault();var t=z.value,o=A.value,n=document.querySelector(".profile__title"),c=document.querySelector(".profile__description");L.textContent="Сохранение...",function(e,t){return fetch("https://nomoreparties.co/v1/wff-cohort-1//users/me",{method:"PATCH",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then(r)}(t,o).then((function(e){n.textContent=e.name,c.textContent=e.about,_(h)})).catch(console.error).finally((function(){L.textContent="Сохранить"}))}));var P=b.querySelector(".popup__form"),B=b.querySelector(".popup__input_type_card-name"),D=b.querySelector(".popup__input_type_url");P.addEventListener("submit",(function(e){e.preventDefault();var t,o,n=B.value,c={name:n,link:D.value,alt:n};w.textContent="Сохранение...",(t=c.name,o=c.link,fetch("https://nomoreparties.co/v1/wff-cohort-1/cards",{method:"POST",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"},body:JSON.stringify({name:t,link:o})}).then(r)).then((function(e){!function(e,t,o){var r=a(e,i,t,u);o.prepend(r)}(e,q,g)})).catch(console.error).finally((function(){w.textContent="Сохранить",B.value="",D.value="",_(b)}))})),document.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&_(document.querySelector(".popup_is-opened"))}));var N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){!function(e,t,o,r,n,c){var a=Array.from(e.querySelectorAll(t));a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,o,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?v(e,t,o,r):y(e,t,t.validationMessage,o,r)}(e,t,n,c),m(a,i,r)}))}));var i=e.querySelector(o);m(a,i,r)}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(N);var O=document.querySelector(".profile__avatar-edit"),J=document.querySelector(".popup_type_avatar-edit"),M=J.querySelector(".popup__form");O.addEventListener("click",(function(e){f(M,N),s(J)}));var H=J.querySelector(".popup__input_type_url"),I=document.querySelector(".profile__image"),V=J.querySelector(".popup__form"),U=J.querySelector(".popup__button");V.addEventListener("submit",(function(e){e.preventDefault();var t,o=H.value;U.textContent="Сохранение...",(t=o,fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar",{method:"PATCH",headers:{authorization:"9d6a2078-c8bd-460f-aba9-4f83db3dbd20","Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then(r)).then((function(e){I.style.backgroundImage="url(".concat(o,")");var t=V.querySelector(".popup__input_type_url");f(V,N),t.value="",_(J)})).catch(console.error).finally((function(){U.textContent="Сохранить"}))}))})();