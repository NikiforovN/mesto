const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".form__close-icon");
const form = document.querySelector(".form");
function toggleForm() {
  form.classList.toggle("form__opened");
}
editButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let formElement = document.querySelector(".form__container");
let nameInput = formElement.querySelector("#name");
let statusInput = formElement.querySelector("#status");
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
}
formElement.addEventListener("submit", formSubmitHandler);
formElement.addEventListener("submit", toggleForm);

function editFormWithoutEdit() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}
closeButton.addEventListener("click", editFormWithoutEdit);

