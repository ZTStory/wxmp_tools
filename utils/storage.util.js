import { AppConstant } from "../app/app.constant";

export const StorageUtil = {
    setStorage(key, value) {
        wx.setStorageSync(key, value);
    },
    getStorage(key) {
        return wx.getStorageSync(key);
    },
    removeStorage(key) {
        wx.removeStorageSync(key);
    },
    clearStorage() {
        wx.clearStorageSync();
    }
}

export const StorageKey = {
    userInfo: "userInfo",
    userAvatarUrl: "userAvatarUrl",
    userNickName: "userNickName",
    openId: "openId"
}

export const QuickStorage = {
    logout() {
        this.setUserInfo(undefined);
        this.setOpenId(undefined);
    },
    getUserInfo() {
        if (AppConstant.userInfo === (void 0)) {
            AppConstant.userInfo = StorageUtil.getStorage(StorageKey.userInfo);
        }
        return AppConstant.userInfo;
    },
    setUserInfo(user) {
        if (user) {
            StorageUtil.setStorage(StorageKey.userInfo, user);
            this.setOpenId(user.openId);
        } else {
            StorageUtil.removeStorage(StorageKey.userInfo);
        }
        AppConstant.userInfo = user;
    },
    getOpenId() {
        if (AppConstant.openId == undefined) {
            AppConstant.openId = StorageUtil.getStorage(StorageKey.openId);
        }
        return AppConstant.openId;
    },
    setOpenId(openId) {
        if (openId) {
            StorageUtil.setStorage(StorageKey.openId, openId);
        } else {
            StorageUtil.removeStorage(StorageKey.openId);
        }
        AppConstant.openId = openId;
    },
}