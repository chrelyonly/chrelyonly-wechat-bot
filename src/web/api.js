import {
    messageKeywordsApiDebug,
    messageKeywordsApiList,
    messageKeywordsApiSubmit
} from "./messageKeywordsApi/messageKeywordsApi.js";
import {
    messageKeywordsResponseApiList, messageKeywordsResponseApiRemove,
    messageKeywordsResponseApiSubmit
} from "./messageKeywordsResponseApi/messageKeywordsResponseApi.js";

/**
 * web应用
 */
export const webApi = (webApp,bot) => {
//  注册messageKeywords KEY接口
    messageKeywordsApiList(webApp)
    messageKeywordsApiSubmit(webApp)
    messageKeywordsApiDebug(webApp,bot)
//   注册messageKeywordsResponse value接口
    messageKeywordsResponseApiList(webApp)
    messageKeywordsResponseApiSubmit(webApp)
    messageKeywordsResponseApiRemove(webApp)
}
