import { CommonUtils } from "../utils/common.util";
import { QuickStorage, StorageUtil } from "../utils/storage.util";

export const UserManager = {
    getUserProfile(desc = "用于活动场景展示") {
        return new Promise((resolve) => {
            let nickName = StorageUtil.getStorage(StorageKey.userNickName)
            if (CommonUtils.isNotBlank(nickName) && nickName !== "微信用户") {
                resolve();
                return;
            }
            if (wx.getUserProfile) {
                wx.getUserProfile({
                    lang: "zh_CN",
                    desc: desc, // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                        let userInfo = res.userInfo;
                        StorageUtil.setStorage(StorageKey.userAvatarUrl, userInfo.avatarUrl);
                        StorageUtil.setStorage(StorageKey.userNickName, userInfo.nickName);
                    },
                    complete: () => {
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        })
    },
    /**
     * 刷新登录态
     */
    weappLogin() {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    resolve(res.code);
                },
                fail: function () {
                    reject("wx.login 接口调用失败");
                }
            });
        });
    },
    /**
     * 验证session有效
     * @param {Boolean} force 是否强制刷新微信登录态
     */
    checkSession(force) {
        return new Promise((resolve) => {
            wx.checkSession({
                success: () => {
                    console.error("session有效");
                    if (QuickStorage.getOpenId().isBlank() || force) {
                        this.weappLogin().then((code) => {
                            resolve({
                                success: false,
                                code: code
                            });
                        });
                    } else {
                        resolve({
                            success: true,
                            code: ""
                        });
                    }
                },
                fail: () => {
                    console.error("session失效");
                    this.weappLogin().then((code) => {
                        resolve({
                            success: false,
                            code: code
                        });
                    });
                }
            });
        });
    },
    getUserInfo(withCredentials) {
        return new Promise((resolve) => {
            wx.getUserInfo({
                withCredentials: withCredentials || false,
                success: (res) => {
                    resolve({
                        success: true,
                        userInfo: res
                    });
                },
                fail: () => {
                    resolve({
                        success: false,
                        userInfo: null
                    });
                }
            });
        });
    },
    /**
     * 微信登录态、用户信息准备（用于自动登录、支付等前置操作）
     * @returns resolve 会返回标准的requestData，根据checkSession结果决定是否刷新登录态
     */
    loginStatusPrepare() {
        return new Promise((resolve, reject) => {
            this.checkSession().then(data => {
                let jsCode = undefined;
                if (data.success == false) {
                    jsCode = data.code;
                }
                this.getUserInfo(true).then(userData => {
                    if (userData.success == true) {
                        var requestData = {
                            nickName: userData.userInfo.userInfo.nickName,
                            avatarUrl: userData.userInfo.userInfo.avatarUrl,
                            encryptedUserInfoData: userData.userInfo.encryptedData,
                            userInfoIv: userData.userInfo.iv,
                        };
                        if (jsCode) {
                            requestData["jsCode"] = jsCode;
                            requestData["grantType"] = "authorization_code";
                        }
                        if (!QuickStorage.getOpenId()) {
                            requestData["openId"] = QuickStorage.getOpenId();
                        }
                        resolve(requestData);
                    } else {
                        reject("获取UserInfo失败");
                    }
                });
            })
        })
    }
}