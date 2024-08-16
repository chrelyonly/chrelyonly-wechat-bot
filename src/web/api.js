import {messageKeywordsApiList, messageKeywordsApiSubmit} from "./messageKeywordsApi/messageKeywordsApi.js";

/**
 * web应用
 */
export const webApi = (webApp) => {
//  注册messageKeywords KEY接口
    messageKeywordsApiList(webApp)
    messageKeywordsApiSubmit(webApp)
}