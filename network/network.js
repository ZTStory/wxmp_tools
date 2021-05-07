import { DialogUtils } from "../utils/dialog.util";
import { Interceptor } from "./interceptor";


export const Network = {
    _requestTask: undefined,
    cancel: function () {
        if (this._requestTask) {
            this._requestTask.abort();
        }
    },
    /**
     * GET请求
     * @param {{url: String, data: Object, secure: Boolean, showProgress: Boolean, success: Function, fail: Function}} request 
     */
    GET: function (request) {
        this.req("GET", request);
    },
    /**
     * POST请求
     * @param {{url: String, data: Object, secure: Boolean, showProgress: Boolean, responseKeyPath: String, success: Function, fail: Function}} request 
     */
    POST: function (request) {
        this.req("POST", request);
    },
    /**
     * POST请求 Promise化
     * @param {{url: String, data: Object, secure: Boolean, showProgress: Boolean, responseKeyPath: String}} request 
     * @return {Promise}
     */
    PromisePOST(request) {
        return new Promise((resolve, reject) => {
            this.POST({
                url: request.url,
                data: request.data,
                secure: request.secure,
                showProgress: request.showProgress,
                responseKeyPath: request.responseKeyPath,
                success: (response) => { resolve(response) },
                fail: (error) => { reject(error) }
            })
        })
    },
    req: function (method, request) {
        if (request.showProgress) {
            DialogUtils.showLoading(request.progressText || "请稍等...");
        }
        var requestData = Interceptor.request(request);
        this._requestTask = wx.request({
            url: request.url,
            data: requestData.data || {},
            header: request.header || {
                'content-type': 'application/json'
            },
            dataType: request.dataType || "json",
            responseType: request.responseType || "text",
            method: method,
            success: function (res) {
                if (typeof res.data == 'string') {
                    try {
                        res.data = JSON.parse(res.data)
                    } catch (error) {
                        console.log(error);
                    }
                }
                var responseData = Interceptor.response(res.data, requestData);
                if (responseData.returnNo == "0000") {
                    request.success && request.success(responseData);
                } else {
                    if (request.fail) {
                        // return true; 表示隐藏提示
                        if (!request.fail(responseData)) {
                            setTimeout(function () {
                                DialogUtils.showToast(responseData.returnInfo);
                            }, 500);
                        }
                    }
                }
            },
            fail: function (error) {
                var responseData = {
                    returnInfo: "网络请求失败",
                    returnNo: "-1"
                };
                request.fail && request.fail(responseData);
                request.showProgress && DialogUtils.showToast(responseData.returnInfo);
                console.error(`【请求结果】【 ${request.url} 】：${JSON.stringify(error)}`);
            },
            complete: function () {
                if (request.showProgress) {
                    DialogUtils.hideLoading();
                }
                request.complete && request.complete();
            }
        });
    }
}