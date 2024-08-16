import {selectMessageKeywordList} from "../../sqlite/service/messageKeywordsUtil.js";
import {R} from "../util/R.js"

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
export const messageKeywordsApiSubmit = () => {

}