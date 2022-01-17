const config ={
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
};


//функция открытия ошибки
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//функция скрытия ошибки
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//проверка валидности инпута
const checkInputValidity = (formElement, inputElement) => {
  console.log(inputElement.validity.valid)
  if (!inputElement.validity.valid){
  showError(formElement, inputElement, inputElement.validationMessage);
  }
  else
    hideError(formElement, inputElement);
};


// функция добавления слушателей на текущее изменения инпута
const  setEventListeners = (formElement) => {
  //получаем массив инпутов
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  //получаем кнопку сабмита из формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  //на каждый инпут в форме вешаем слушатель, проверяем его валидность и переключаем состояние кнопки
  inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);
     toggleButtonState(inputList, buttonElement);
 }); 
  })
}

// функция включения валидации
const enableValidation = () =>{
  // получаем массив форм из документа
  const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement)=>{
      //на каждую форму вешаем слушатель сабмита
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(formElement);
    })
}


//функция проверки наличия хотя бы одного невалидного инпута в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}


//функция изменения состояния кнопки сабмита
const toggleButtonState = (inputList, buttonElement) => {
  console.log('1', getComputedStyle(buttonElement).opacity);
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled','disabled');
  }
  else{
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled','disabled');
  }
}


enableValidation();