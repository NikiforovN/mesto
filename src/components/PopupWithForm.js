import Popup from "./Popup.js";



export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__container')
        this._submitButton = this._form.querySelector('.popup__button')
    }
    _getInputValues(){
        //получаем все инпуты в форме
        this._inputList = this._form.querySelectorAll('.popup__field');
        
        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        console.log(this._inputValues)
        return this._inputValues;
    }
    changeSubmitHandler(newHandler){
        this._submitHandler = newHandler;
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (event)=>{
            event.preventDefault();
            this._submitHandler(this._getInputValues())
            this.close();
        })
    }
    close=()=> {
        this._form.reset();
        super.close();
    }
    isLoading(isLoad){
        if(isLoad){
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }
}