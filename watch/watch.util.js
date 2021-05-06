/**
 * WatchUtil 增加Page.data中属性监听扩展
 * 
 * Usage:
 * 1、Page中调用 WatchUtil.startWatch(this) 开启监听
 * 2、实现Page.watch() 属性，举例：
 *   
 * watch() {
 *     return {
 *          property: (newVal, oldVal) => {
 * 
 *                  }
 *     }
 * }
 */

export const WatchUtil = {
    _thiz: undefined,
    startWatch(target) {
        this._thiz = target;
        if (target.watch) {
            Object.keys(target.watch()).forEach(pro => {
                this._addObserve(pro)
            })
        }
    },
    _addObserve(key) {
        let action = this._thiz.watch()[key];
        var val = this._thiz.data[key];
        Object.defineProperty(this._thiz.data, key, {
            configurable: true,
            enumerable: true,
            set: function (value) {
                val = value;
                action(value, val);
            },
            get: function () {
                return val;
            }
        })
    }

}