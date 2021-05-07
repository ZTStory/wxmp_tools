import { AppConstant, REQUEST_MODE } from "../app/app.constant"

export const ApiConfig = {
    BASE(apiVer, requestMode) {
        if (!requestMode) requestMode = AppConstant.requestMode;
        if (!apiVer) apiVer = AppConstant.apiVersion;
        switch (requestMode) {
            case REQUEST_MODE.SIMULATED: {
                return "http://127.0.0.1/" + apiVersion;
            }
            case REQUEST_MODE.TEST: {
                return "" + apiVersion;
            }
            case REQUEST_MODE.DEVELOPMENT: {
                return "" + apiVersion;
            }
            default:
                return "" + apiVersion;
        }
    }
}