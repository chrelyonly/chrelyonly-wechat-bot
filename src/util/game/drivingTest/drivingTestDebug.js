import "../newdate.js"
import {http} from "../https.js";
// 游戏状态
export let globalGameStatus = false;
let toGame = "";
let toGameStatus = false;
const supportedGames = ["开始驾照考试"];

let currentQuestionIndex = 0;
let gamePoint = [];
let totalAnsweredQuestions = 0;
let lastInfo = {}
/**
 * 从网络获取下一道题目
 * 假设每次调用此函数会从网络返回一题
 */
const fetchQuestion = async () => {
    try {
        // 模拟API请求，假设返回的数据格式与题库一致
        let res = await http("https://api.yujn.cn/api/kemu.php?type=json", "get", {}, 1, {});
        // 返回获取到的题目
        lastInfo = res.data;
        return res.data;
    } catch (error) {
        console.error("获取题目失败", error);
        return null; // 返回null表示请求失败
    }
}
const lastQuestion = () => {
    return lastInfo;
}

/**
 * 回到上一个游戏中
 * @param message 消息对象
 * @param room 房间对象
 * @param talker 机器人回复对象
 * @param text 消息文本
 */
export const joinGame = (message, room, talker, text) => {
    // 判断当前游戏状态
    if (!globalGameStatus) {
        room.say("当前未开始游戏，请重新发起。");
        return;
    }

    // 判断是否在游戏中
    if (toGameStatus) {
        if (toGame === "驾照考试") {
            startDrivingTest(message, room, talker, text);
        }
    }
};

/**
 * 开始驾照考试答题
 * @param message 消息对象
 * @param room 房间对象
 * @param talker 机器人回复对象
 * @param text 用户输入的答案
 */
const startDrivingTest = async (message, room, talker, text) => {
    // 查找玩家信息（假设玩家信息通过 talker 获取）
    let player = gamePoint.find(p => p.gameId === talker.id);
    if (!player) {
        // 如果玩家信息不存在，说明是第一次答题，初始化玩家数据
        player = {
            gameId: talker.id,
            gameName: talker.name() || "玩家",
            point: 0,
        };
        gamePoint.push(player);
    }

    // 获取当前题目
    const currentQuestion = lastQuestion();

    if (!currentQuestion) {
        room.say("无法获取新的题目，请稍后再试。");
        return;
    }

    // 判断答案是否正确
    if (currentQuestion.key === text.toLowerCase()) {
        player.point++; // 每答对一题得一分
        room.say("恭喜你，答对了！获得一分");
        room.say(`题目解析：${currentQuestion.analysis}`);
    } else {
        room.say("你的答案，" + text.toLowerCase());
        room.say("回答错误，请再试一次！");
        return;
    }

    // 更新全局答题计数器
    totalAnsweredQuestions++;

    // 判断是否完成10题
    if (totalAnsweredQuestions >= 10) {
        endGame(message, room);
    } else {
        // 给出下一题
        await nextQuestion(message, room);
    }
};

/**
 * 获取下一题
 * @param message 消息对象
 * @param room 房间对象
 */
const nextQuestion = async (message, room) => {
    // 获取下一道题
    const nextQuestion = await fetchQuestion();

    if (!nextQuestion) {
        room.say("无法获取新的题目，请稍后再试。");
        endGame(message, room);
        return;
    }

    room.say(`下一题：${nextQuestion.question}`);
    room.say(`选项：${nextQuestion.options}`);
};

/**
 * 结束游戏并显示得分
 * @param message 消息对象
 * @param room 房间对象
 */
const endGame = (message, room) => {
    room.say(`游戏结束！总共答对了 ${totalAnsweredQuestions} 题。`);
    room.say("感谢参与！");
    // 重置游戏状态
    toGameStatus = false;
    globalGameStatus = false;
    totalAnsweredQuestions = 0;  // 重置总答题数
    currentQuestionIndex = 0;  // 重置题目索引
};

/**
 * 启动驾照考试游戏
 * @param room 房间对象
 * @param bot 机器人回复对象
 */
export const startGame = async (room, bot) => {
    globalGameStatus = true;
    toGame = "驾照考试";
    toGameStatus = true;

    room.say("驾照考试游戏已开始！你可以开始答题。");

    // 给出第一题
    await nextQuestion(room, room);
};

// 模拟开始游戏
startGame({
    say: (msg) => {
        console.log("模拟回复:" + msg);
    }
},{}).then( res=>{
    // 模拟答题
    joinGame({},{
        say: (msg) => {
            console.log("模拟答题:" + msg);
        }
    },{
        id: 1,
        name: ()=>{ return "cm" }
    },"B");
    joinGame({},{
        say: (msg) => {
            console.log("模拟答题:" + msg);
        }
    },{
        id: 1,
        name: ()=>{ return "cm" }
    },"A");
    joinGame({},{
        say: (msg) => {
            console.log("模拟答题:" + msg);
        }
    },{
        id: 1,
        name: ()=>{ return "cm" }
    },"C");
    joinGame({},{
        say: (msg) => {
            console.log("模拟答题:" + msg);
        }
    },{
        id: 1,
        name: ()=>{ return "cm" }
    },"D");

})

