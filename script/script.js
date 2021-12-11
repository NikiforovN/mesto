const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.form__close-icon')
const form = document.querySelector('.form');
function toggleForm(){
    form.classList.toggle('form__opened');
}

editButton.addEventListener('click', toggleForm);
closeButton.addEventListener('click', toggleForm);
