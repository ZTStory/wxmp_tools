export const DialogUtils = {
    /**
     * Loading
     * @param {string} text 
     * @param {boolean} mask 是否开启蒙版 default：true
     */
    showLoading(text, mask = true) {
        wx.showLoading({
            title: text,
            mask: mask
        });
    },
    hideLoading() {
        wx.hideLoading();
    },
    /**
     * Toast
     * @param {string} text 
     * @param {boolean} mask 是否开启蒙版 default：false
     * @param {number} duration 延迟消失  default：1500
     */
    showToast(text, mask = false, duration = 1500) {
        if (text === void 0) return;
        wx.showToast({
            title: text,
            icon: "none",
            mask: mask,
            duration: duration
        });
    },
    showSuccessToast(text, duration) {
        if (text === void 0) { text = "操作成功"; }
        if (duration === void 0) { duration = 1500; }
        wx.showToast({
            title: text,
            icon: "success",
            mask: false,
            duration: duration
        });
    },
    hideToast() {
        wx.hideToast();
    },
    /**
     * Dialog
     * @param {{title: string, content: string, cancelText?: string, confirmText?: string, confirm?: Function, cancel?: Function, complete?: Function}} config 
     */
    showDialog(config) {
        wx.showModal({
            title: config.title || "",
            content: config.content || "",
            showCancel: config.showCancel || true,
            cancelColor: config.cancelColor || "#333",
            cancelText: config.cancelText || "取消",
            confirmText: config.confirmText || "确定",
            confirmColor: config.confirmColor || "#00a4ff",
            success: (res) => {
                config.success && config.success(res);
                if (res.confirm) {
                    config.confirm && config.confirm();
                } else if (res.cancel) {
                    config.cancel && config.cancel();
                }
            },
            fail: config.fail,
            complete: config.complete
        });
    },
    /**
     * 单按钮Dialog
     * @param {{title: String, content: String, confirmText: String, success: Function}} config 
     */
    showOneBtnDialog(config) {
        wx.showModal({
            title: config.title || "",
            content: config.content || "",
            showCancel: false,
            confirmText: config.confirmText || "确定",
            confirmColor: config.confirmColor || "#00a4ff",
            success: config.success,
            fail: config.fail,
            complete: config.complete
        });
    },
    /**
     * ActionSheet
     * @param {{itemList: String[], itemColor?: String, success: Function}} config 
     */
    showActionSheet(config) {
        wx.showActionSheet({
            itemList: config.itemList,
            itemColor: config.itemColor || "#00a4ff",
            success: config.success,
            fail: config.fail,
            complete: config.complete
        });
    }
}