const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-icon");
const form = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector("#name");
let statusInput = formElement.querySelector("#status");
function openForm() {
  form.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}

function closeForm() {
  form.classList.remove("popup_opened");
}

editButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closeForm();
}
formElement.addEventListener("submit", formSubmitHandler);
