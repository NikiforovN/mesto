


export default class UserInfo {
    constructor(userName, userJob, userAvatar){
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
        this._userAvatar = document.querySelector(userAvatar)
       
    }
    getUserInfo(){
        return {
            name: this._userName.textContent,
            about : this._userJob.textContent,
        }
    }
    setUserInfo = ({name,about})=>{
        this._userName.textContent =  name;
        this._userJob.textContent =  about;
       
    }
    setUserAvatar = ({avatar})=>{
        this._userAvatar.src = avatar;
    }
}
