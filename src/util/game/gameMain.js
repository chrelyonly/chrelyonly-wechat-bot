import {gameStatus, iGuess, joinYouDrawIGuess, startYouDrawIGuess} from "./youDrawIguess/youDrawIGuess.js";


/**
 * 游戏状态
 * @type {number}
 * 0未开始
 * 1等待人员加入
 * 2等待画图
 * 3等待猜图
 */
/**
 * guess猜
 */
export const startGame = (message,room,bot,text)=>{
    // if (text.toString().includes("你画我猜")) {
    //     youDrawIGuess(message, room, bot, text)
    // }else
    if (text.toString().includes("加入你画我猜")) {
        joinYouDrawIGuess(message, room, bot, text)
    }else if (text.toString().includes("开始你画我猜")) {
        startYouDrawIGuess(message, room, bot, text)
    }else if (text.toString().includes("我猜")) {
        iGuess(message, room, bot, text)
    }
}

export {
    gameStatus
}
