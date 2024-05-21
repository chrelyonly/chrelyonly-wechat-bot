import {http} from "../../https.js";
import {FileBox} from "file-box";
import  gifResize  from '@gumlet/gif-resize'
import _ from "lodash"
// 接口目录
const url = "http://www.itukuai.top:2233/memes/"
/**
 * 发送接口
 */
export const sendApi = async (item,room,bot,text)=> {
  // let params = {}
  // if(item.params.min_images !== 0){
  //   // const fileBox = FileBox.fromBuffer("https://q1.qlogo.cn/g?b=qq&nk=1172576293&s=640","avatar.jpg")
  //
  //   let url = await http("https://q1.qlogo.cn/g?b=qq&nk=1172576293&s=640","get",{},3,{})
  //   params["images"] = url.data
  // }
  // if(item.params.min_texts !== 0){
  //   // params["texts"] = "测试1"
  // }
  // if (item.params.args.length > 0){
  //   // item.params.args
  //   params["args"] = handleArgs(item.key, "", [{ text: "测试2", gender: "unknown" }])
  // }
  const formData = new FormData()
  if(item.params.min_images !== 0){
    let url = await http("https://q1.qlogo.cn/g?b=qq&nk=" + text + "&s=640","get",{},3,{})
    formData.append("images", new Blob([url.data]))
  }
  if(item.params.min_texts !== 0){
    formData.append("texts",text)
  }
  if (item.params.args.length > 0){
    // item.params.args
    // params["args"] = handleArgs(item.key, "", [{ text: "测试2", gender: "unknown" }])
  }
  let headers = {
    "Content-Type": "multipart/form-data"
  }
  // 返回图片
  http(`${url}${item.key}/`,"post",formData,6,headers).then( res=> {
    // 根据响应头判断文件类型
    let name = res.headers["content-type"].split("/")[1]
      // 如果是gif
      if(name === "gif"){
        // 尝试压缩
        const buffer = Buffer.from(res.data)
        gifResize({ width: 200,optimizationLevel:3})(buffer).then( res2=> {
          const fileBox = FileBox.fromBuffer(res2,item.key + "." + name)
          // let msgTemp = "信息:\n";
          // msgTemp += "压缩前大小:" + res.data.length/1024 + "KB\n"
          // msgTemp += "压缩后大小:" + fileBox.size/1024 + "KB\n"
          // msgTemp += "压缩模式:3"
          // room.say(msgTemp)
          room.say(fileBox)
        },err=>{
          console.log(err)
          room.say("压缩图片异常" + err.message)
        }).catch(err=>{
            console.log(err)
            room.say("接口通信异常" + err.message)
        })
        return
      }
      // 如果是图片
      const fileBox = FileBox.fromBuffer(res.data,item.key + "." + name)
      room.say(fileBox)
      return
  },err=>{
    console.log(err)
    room.say("接口通信异常" + err.message)
  }).catch(err=>{
    console.log(err)
    room.say("接口通信异常" + err.message)
  })
}
// 判断参数位置
function handleArgs(key, args, userInfos) {
  let argsObj = {}
  switch (key) {
    case "look_flat":
      argsObj = { ratio: parseInt(args) || 2 }
      break
    case "crawl":
      argsObj = { number: parseInt(args) || _.random(1, 92, false) }
      break
    case "symmetric": {
      const directionMap = {
        左: "left",
        右: "right",
        上: "top",
        下: "bottom"
      }
      argsObj = { direction: directionMap[args.trim()] || "left" }
      break
    }
    case "petpet":
    case "jiji_king":
    case "kirby_hammer":
      argsObj = { circle: args.startsWith("圆") }
      break
    case "my_friend":
      if (!args) args = _.trim(userInfos[0].text, "@")
      argsObj = { name: args }
      break
    case "looklook":
      argsObj = { mirror: args === "翻转" }
      break
    case "always": {
      const modeMap = {
        "": "normal",
        循环: "loop",
        套娃: "circle"
      }
      argsObj = { mode: modeMap[args] || "normal" }
      break
    }
    case "gun":
    case "bubble_tea": {
      const directionMap = {
        左: "left",
        右: "right",
        两边: "both"
      }
      argsObj = { position: directionMap[args.trim()] || "right" }
      break
    }
  }
  argsObj.user_infos = userInfos.map(u => {
    return {
      name: _.trim(u.text, "@"),
      gender: u.gender
    }
  })
  return JSON.stringify(argsObj)
}








/**
 * 获取菜单
 */
export const getMenu = (key,room,bot)=> {

  let params = {

  }
  // 返回图片
  http(`${url}render_list`,"post",params,3,{}).then( res=> {
    const fileBox = FileBox.fromBuffer(res.data, key + ".png")
    room.say(fileBox)
  })
}
// // 该接口返回一个图片
// const res = await fetch(`${url}render_list`, { method: "POST" })
// const qqImg = `http://q2.qlogo.cn/headimg_dl?dst_uin=${e.user_id}&spec=5`;
// const formData = new FormData()
// const imgRes = await fetch(imgUrl)
// const buffer = Buffer.from(await imgRes.arrayBuffer())
// formData.append("images", new Blob([buffer]))
//
//
//   async accept(e) {
//     if (!e.msg || kg == 0) return
//     const match = e.msg.match?.(reg)?.[0]
//     if (!match) return
//     const keyword = e.msg.split(" ")
//     const id = keyword[0].replace(match, "") || e.at || e.user_id
//     const item = bq[match]
//
//     const pick = await e.group?.pickMember?.(id) || await e.bot?.pickFriend?.(id)
//     const info = await pick?.getInfo?.() || pick?.info || pick
//     const name = info?.card || info?.nickname
//
//     const formData = new FormData()
//     if (item.params.min_images == 2) {
//       const imgUrl = await e.member?.getAvatarUrl?.() || await e.friend?.getAvatarUrl?.() || `http://q2.qlogo.cn/headimg_dl?dst_uin=${e.user_id}&spec=5`
//       const imgRes = await fetch(imgUrl)
//       const buffer = Buffer.from(await imgRes.arrayBuffer())
//       formData.append("images", new Blob([buffer]))
//     }
//
//     if (item.params.min_images != 0) {
//       let reply
//       if (e.getReply) {
//         reply = await e.getReply()
//       } else if (e.source) {
//         if (e.group?.getChatHistory)
//           reply = (await e.group.getChatHistory(e.source.seq, 1)).pop()
//         else if (e.friend?.getChatHistory)
//           reply = (await e.friend.getChatHistory(e.source.time, 1)).pop()
//       }
//       if (reply?.message) for (const i of reply.message)
//         if (i.type == "image" || i.type == "file") {
//           e.img = [i.url]
//           break
//         }
//
//       const imgUrl = e.img?.[0] || await pick?.getAvatarUrl?.() || `http://q2.qlogo.cn/headimg_dl?dst_uin=${id}&spec=5`
//       const imgRes = await fetch(imgUrl)
//       const buffer = Buffer.from(await imgRes.arrayBuffer())
//       formData.append("images", new Blob([buffer]))
//     }
//
//     if (item.params.min_texts != 0)
//       for (let i=0;i<keyword.length-1;i++)
//         formData.append("texts", keyword[i+1])
//
//     let args
//     if (item.params.min_texts == 0 & keyword[1] != undefined)
//       args = handleArgs(item.key, keyword[1], [{ text: name, gender: "unknown" }])
//     else
//       args = handleArgs(item.key, "", [{ text: name, gender: "unknown" }])
//     if (args)
//       formData.set("args", args)
//
//     const res = await fetch(`${url}${item.key}/`, { method: "POST", body: formData })
//     if (res.status > 299)
//       return e.reply(`该表情至少需要${item.params.min_images}张图片，${item.params.min_texts}个文字描述`, true)
//
//     const resultBuffer = Buffer.from(await res.arrayBuffer())
//     return e.reply(segment.image(resultBuffer))
//   }
// }
//
// function handleArgs(key, args, userInfos) {
//   let argsObj = {}
//   switch (key) {
//     case "look_flat":
//       argsObj = { ratio: parseInt(args) || 2 }
//       break
//     case "crawl":
//       argsObj = { number: parseInt(args) || _.random(1, 92, false) }
//       break
//     case "symmetric": {
//       const directionMap = {
//         左: "left",
//         右: "right",
//         上: "top",
//         下: "bottom"
//       }
//       argsObj = { direction: directionMap[args.trim()] || "left" }
//       break
//     }
//     case "petpet":
//     case "jiji_king":
//     case "kirby_hammer":
//       argsObj = { circle: args.startsWith("圆") }
//       break
//     case "my_friend":
//       if (!args) args = _.trim(userInfos[0].text, "@")
//       argsObj = { name: args }
//       break
//     case "looklook":
//       argsObj = { mirror: args === "翻转" }
//       break
//     case "always": {
//       const modeMap = {
//         "": "normal",
//         循环: "loop",
//         套娃: "circle"
//       }
//       argsObj = { mode: modeMap[args] || "normal" }
//       break
//     }
//     case "gun":
//     case "bubble_tea": {
//       const directionMap = {
//         左: "left",
//         右: "right",
//         两边: "both"
//       }
//       argsObj = { position: directionMap[args.trim()] || "right" }
//       break
//     }
//   }
//   argsObj.user_infos = userInfos.map(u => {
//     return {
//       name: _.trim(u.text, "@"),
//       gender: u.gender
//     }
//   })
//   return JSON.stringify(argsObj)
// }
