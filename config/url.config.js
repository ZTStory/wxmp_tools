import { AppRouter } from "../app/app.router"

export const UrlConfig = {
    SERVICE_RULE: "",
    PRIVACY_RULE: "",
    HELP_CENTER: "",
}

export const UrlNaviHandle = {
    localPageUrlRule: [{
        rule: /order.+?orderNo\=([A-Z]\d+)/,
        navigateAction: (orderNo) => {
            AppRouter.COMMON.orderdetail(orderNo);
        }
    }],
    catchUrl(url) {
        if (!url) return;
        for (let index = 0; index < this.localPageUrlRule.length; index++) {
            const item = this.localPageUrlRule[index];
            if (item.rule.test(url)) {
                let group = item.rule.exec(url);
                item.navigateAction(group[1]);
                return;
            }
        }
        AppRouter.COMMON.webview(encodeURIComponent(url), "1");
    }
}