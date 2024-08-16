import {saveOrUpdateMessageKeywords, selectMessageKeywordList} from "../../sqlite/service/messageKeywordsUtil.js";
import {R} from "../util/R.js"
/**
 * 查询接口
 * @param app
 */
export const messageKeywordsApiList = (app) => {
    app.get('/messageKeywords/list', (req, res) => {
        try {
            selectMessageKeywordList(0,10).then((response) => {
                res.send(R.data(response))
            })
        }catch (error) {
            console.log(error);
            res.send(R.fail(error.message))
        }
    });
}
/**
 * 操作接口
 */
export const messageKeywordsApiSubmit = (app) => {
    app.post('/messageKeywords/submit', (req, res) => {
        try {
            let {sort,label,keyword,open,id} = req.body;
            saveOrUpdateMessageKeywords(sort,label,keyword,open,id).then((response) => {
                res.send(R.data(response))
            })
        }catch (error) {
            console.log(error);
            res.send(R.fail(error.message))
        }
    });
}