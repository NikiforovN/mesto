import { editFormElement } from "../utils/constants.js";


export default class UserInfo {
    constructor(userName, userJob){
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
        this._nameInput = editFormElement.querySelector('#name')//удалить в константах
        this._jobInput = editFormElement.querySelector('#status')//удалить в константах
    }
    getUserInfo(){
        this._nameInput.value = this._userName.textContent;
        this._jobInput.value = this._userJob.textContent;

        return {
            name: this._userName.textContent,
            job : this._userJob.textContent
        }
    }
    setUserInfo = ({name,status})=>{
        this._userName.textContent =  name;
        this._userJob.textContent =  status
    }
}