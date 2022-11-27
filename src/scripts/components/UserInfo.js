export default class UserInfo {
    constructor ({profileNameSelector, descriptionSelector}){
        this.profileName = document.querySelector(profileNameSelector);
        this.description = document.querySelector(descriptionSelector);
    }
    getUserInfo (){
        const userInfo = {};
            userInfo.name = this.profileName.textContent;
            userInfo.description = this.description.textContent;
        return userInfo;
    }
    setUserInfo(name, description){
        this.profileName.textContent = name;
        this.description.textContent = description;
    }
}