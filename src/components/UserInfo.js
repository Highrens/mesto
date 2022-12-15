export default class UserInfo {
    constructor ({profileNameSelector, descriptionSelector, avatarSelector}){
        this.profileName = document.querySelector(profileNameSelector);
        this.description = document.querySelector(descriptionSelector);
        this.avatar      = document.querySelector(avatarSelector);
    }
    getUserInfo (){
        const userInfo = {};
            userInfo.name = this.profileName.textContent;
            userInfo.description = this.description.textContent;
            userInfo.avatar = this.avatar.src

        return userInfo;
    }
    setUserInfo(name, description){
        this.profileName.textContent = name;
        this.description.textContent = description;
    }
    setUserAvatar(link) {
        this.avatar.src = link;
    }
}