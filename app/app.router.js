export const NavigatorMode = {
    PUSH: 0,
    REDIRECT: 1,
    BACK: 2,
    RELAUNCH: 3
}

export const AppRouter = {
    COMMON: {},
    BUSINESS1: {},
    BUSINESS2: {},
    /**
     * 返回到指定页面
     * @param {string} targetPageRoute 
     */
    navigateBackToTargetPage(targetPageRoute) {
        this.navigator(NavigatorMode.BACK, {
            route: targetPageRoute
        })
    },
    navigator(mode, intent) {
        switch (mode) {
            case NavigatorMode.PUSH: {
                wx.navigateTo({
                    url: intent.pageUrl,
                    success: intent.success,
                    events: intent.events
                });
                break;
            }
            case NavigatorMode.REDIRECT: {
                wx.redirectTo({
                    url: intent.pageUrl,
                    success: intent.success,
                    events: intent.events
                });
                break;
            }
            case NavigatorMode.BACK: {
                if (intent.route) {
                    let pages = getCurrentPages();
                    let targetPageIndex = pages.findIndex(item => item.route === intent.route);
                    if (targetPageIndex !== -1) {
                        intent.delta = pages.length - targetPageIndex - 1;
                    }
                    console.log(pages, targetPageIndex, intent.delta)
                }
                wx.navigateBack({
                    delta: intent.delta
                });
                break;
            }
            case NavigatorMode.RELAUNCH: {
                wx.reLaunch({
                    url: intent.pageUrl
                });
                break;
            }
            default:
                break;
        }
    }
}