/**
 * App事件管理中心
 * 通过注册事件来监听回调
 * 
 * 注意：page addObserve 后，需要在 onUnload 方法中 removeObserve，否则会出现泄漏
 */

export const AppEventBus = {
    // __wxExparserNodeId__
    observeMap: {},
    /**
     * 添加观察者监听事件
     * @param {PageObj} observe this
     * @param {String} notiName 
     * @param {Function} notiCallBack 
     */
    addObserve(observe, notiName, notiCallBack) {
        let list = this.observeMap[observe.__wxExparserNodeId__];
        if (!list) {
            list = [];
        }
        let map = new Map();
        map.set(notiName, notiCallBack);
        // 去重
        if (list.findIndex((value) => value.has(notiName)) == -1) {
            list.push(map);
            this.observeMap[observe.__wxExparserNodeId__] = list;
        }
    },
    /**
     * 发送消息
     * @param {String} notiName 
     * @param {AnyObject} params 
     */
    postNoti(notiName, params = {}) {
        for (const key in this.observeMap) {
            const element = this.observeMap[key];
            element.forEach(value => {
                if (value.has(notiName)) {
                    value.get(notiName)(params);
                }
            })
        }
    },
    /**
     * 清除观察者
     * @param {PageObj} observe 
     */
    removeObserve(observe) {
        try {
            this.observeMap[observe.__wxExparserNodeId__] = [];
        } catch (error) {
            console.error(error);
        }
    }
}

export const AppEventKey = {}