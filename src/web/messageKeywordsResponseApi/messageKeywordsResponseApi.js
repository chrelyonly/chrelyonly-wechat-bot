import {
    delMessageKeywords,
    saveOrUpdateMessageKeywordsResponse,
    selectMessageKeywordsResponseList,
    selectMessageKeywordsResponsePage
} from "../../sqlite/service/messageKeywordsResponseUtil.js";
import {R} from "../util/R.js"
/**
 * 查询接口
 * @param app
 */
export const messageKeywordsResponseApiList = (app) => {
    app.get('/messageKeywordsResponse/list', (req, res) => {
        try {
            const { current, size,parentId } = req.query; // 从请求中获取分页参数
            selectMessageKeywordsResponsePage(parentId,current,size).then((response) => {
                res.send(R.data(response))
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
export const messageKeywordsResponseApiSubmit = (app) => {
    app.post('/messageKeywordsResponse/submit', (req, res) => {
        try {
            let {sort,level,parentId,content,open,id} = req.body;
            if(!parentId){
                res.send(R.fail("参数错误未找到"))
                return
            }
            saveOrUpdateMessageKeywordsResponse(sort,level,parentId,content,open,id).then((response ) => {
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
export const messageKeywordsResponseApiDebug = (app) => {
    app.post('/messageKeywordsResponse/debug', (req, res) => {
        try {
            let {sort,label,keyword,open,id} = req.body;
            // 根据id查询响应关键字
            res.send(R.success())
            // saveOrUpdateMessageKeywords(sort,label,keyword,open,id).then((response ) => {
            //     res.send(response)
            // },err=>{
            //     res.send(err)
            // })
        }catch (error) {
            console.log(error);
            res.send(R.fail(error.message))
        }
    });
}


/**
 * 操作接口
 */
export const messageKeywordsResponseApiRemove = (app) => {
    app.post('/messageKeywordsResponse/remove', (req, res) => {
        try {
            let {id} = req.body;
            if(!id){
                res.send(R.fail("参数错误未找到"))
                return
            }
            delMessageKeywords(id).then((response ) => {
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
