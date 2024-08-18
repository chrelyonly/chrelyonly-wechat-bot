import {saveOrUpdateMessageKeywords, selectMessageKeywordList} from "../../sqlite/service/messageKeywordsUtil.js";
import {R} from "../util/R.js"
import {myDivMessageResponseMain} from "../../sqlite/service/myDivMessageResponseMain.js";
/**
 * 查询接口
 * @param app
 */
export const messageKeywordsApiList = (app) => {
    app.get('/messageKeywords/list', (req, res) => {
        try {
            const { current = 1, size = 10 } = req.query; // 从请求中获取分页参数
            selectMessageKeywordList(current,size).then((response) => {
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
            saveOrUpdateMessageKeywords(sort,label,keyword,open,id).then((response ) => {
                res.send(response)
            },err=>{
                res.send(err)
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
export const messageKeywordsApiDebug = (app,bot) => {
    app.post('/messageKeywords/debug', (req, res) => {
        try {
            let {keyword} = req.body;
            // 根据id查询响应关键字
            sendMsg(bot,keyword);
            res.send(R.success())
        }catch (error) {
            console.log(error);
            res.send(R.fail(error.message))
        }
    });
}


const sendMsg = (bot,msg) => {
    // 寻找指定群
    bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
        if (room) {
            myDivMessageResponseMain(msg,room);
        }
    })
}
