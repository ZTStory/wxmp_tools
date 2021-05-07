export const QRCodeAnalyse = {
    IndexQRCodeAnalyseList: [IndexQRCodeAnalyse],
    OtherPageQRCodeAnalyseList: [],
    _clearUrl(url) {
        if (!url) return "";
        url = url.replace(/\s*/g, "");
        url = url.replace(/\++/g, "");
        return url;
    },
    /**
     * QRCode解析入口（将url中的参数解析为对象，按不同页面统一管理）
     * @param {object} options 
     * @param {"Index"|"OtherPage"} targetPage 
     */
    entry(options, targetPage) {
        let QRCodeAnalyseList = this[`${targetPage}QRCodeAnalyseList`];
        if (options.q) {
            let url = decodeURIComponent(options.q);
            url = this._clearUrl(url);

            if (/\?/.test(url)) {
                url = url.split("?")[1];
            }

            for (let index = 0; index < QRCodeAnalyseList.length; index++) {
                const element = QRCodeAnalyseList[index];
                if (element.rule.test(url)) {
                    return element.analyse(url);
                }
            }
        }
    }
}

const IndexQRCodeAnalyse = {
    rule: /\&/,
    analyse(url) {
        let obj = new Object();
        let params = url.split("&");
        params.forEach((param) => {
            obj[param.split("=")[0]] = unescape(param.split("=")[1]);
        });
        this.analyseGlobalData(obj);
    },
    analyseGlobalData(params) {

    }
}