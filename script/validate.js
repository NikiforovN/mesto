const configs = {
  formSelector: ".popup__container",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};

//функция открытия ошибки
const showError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//функция скрытия ошибки
const hideError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = " ";
};

//проверка валидности инпута
const checkInputValidity = (config, formElement, inputElement) => {
  console.log(`${inputElement.name} - `, inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    showError(
      config,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else hideError(config, formElement, inputElement);
};

//функция изменения состояния кнопки сабмита
function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(config, buttonElement);
  } else {
    enableSubmitButton(config, buttonElement);
  }
}

//включение кнопки
function disableSubmitButton(config, buttonElement){
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

//выключение кнопки
function enableSubmitButton(config, buttonElement) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "disabled");
}

// функция добавления слушателей на текущее изменения инпута
const setEventListeners = (config, formElement) => {
  //получаем массив инпутов
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  //получаем кнопку сабмита из формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  //на каждый инпут в форме вешаем слушатель, проверяем его валидность и переключаем состояние кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

// функция включения валидации
function enableValidation(config) {
  // получаем массив форм из документа
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    //на каждую форму вешаем слушатель сабмита
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

//функция проверки наличия хотя бы одного невалидного инпута в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation(configs);
