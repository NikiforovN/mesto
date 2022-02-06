const configs = {
  formSelector: ".popup__container",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__input-error_active",
};

class FormValidator{
  constructor(data, formElement){
    this._formSelector=data.formSelector
    this._inputSelector=data.inputSelector
    this._submitButtonSelector=data.submitButtonSelector
    this._inactiveButtonClass=data.inactiveButtonClass
    this._inputErrorClass=data.inputErrorClass
    this._errorClass=data.errorClass
    this._formElement=formElement
  }

  //функция открытия ошибки
_showError(formElement, inputElement, errorMessage){
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
}

//функция скрытия ошибки
_hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = " ";
}

//проверка валидности инпута
_checkInputValidity(formElement, inputElement) {
  console.log(`${inputElement.name} - `, inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    this._showError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else this._hideError(formElement, inputElement);
}

//функция изменения состояния кнопки сабмита
_toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    this._disableSubmitButton(buttonElement);
  } else {
    this._enableSubmitButton(buttonElement);
  }
}

//выключение кнопки
_disableSubmitButton(buttonElement){
  buttonElement.classList.add(this._inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

//включение кнопки
_enableSubmitButton(buttonElement) {
  buttonElement.classList.remove(this._inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "disabled");
}

// функция добавления слушателей на текущее изменения инпута
_setEventListeners(formElement){
  //получаем массив инпутов
  const inputList = Array.from(
    formElement.querySelectorAll(this._inputSelector)
  );
  //получаем кнопку сабмита из формы
  const buttonElement = formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  //на каждый инпут в форме вешаем слушатель, проверяем его валидность и переключаем состояние кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input",  () => {
      this._checkInputValidity( formElement, inputElement);
      this._toggleButtonState( inputList, buttonElement);
    });
  });
  this._formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

//функция проверки наличия хотя бы одного невалидного инпута в форме
_hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функция включения валидации
enableValidation() {

  this._setEventListeners(this._formElement);
  
}

}

const forms=document.querySelectorAll('.popup__rectangle')
forms.forEach(item => {
  const validationForm = new FormValidator(configs, item.querySelector(configs.formSelector))
  validationForm.enableValidation();
})

export {FormValidator, configs}

