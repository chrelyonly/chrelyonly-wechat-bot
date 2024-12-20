// 游戏状态
export let globalGameStatus = false;
// 当前游戏
let toGame = "";
// 当前游戏状态
let toGameStatus = false;
// 支持的游戏列表
const supportedGames = ["开始驾照考试"];

// 题库（可以根据实际情况扩展）
const questionBank = [
    {
        "id": "33885",
        "question": "以欺骗、贿赂等不正当手段取得机动车登记的，申请人多久不得申请机动车登记？",
        "options": "A:三年内, B:终身, C:五年内, D:一年内",
        "imageurl": "",
        "analysis": "以欺骗、贿赂等手段取得机动车登记，是违法行为，会被收缴登记证书，三年内不得再次申请机动车登记。《道路交通安全法实施条例》第一百零三条：以欺骗、贿赂等不正当手段取得机动车登记或者驾驶许可的，收缴机动车登记证书、号牌、行驶证或者机动车驾驶证，撤销机动车登记或者机动车驾驶许可；申请人在3年内不得申请机动车登记或者机动车驾驶许可。",
        "key": "a",
        "A": "三年内",
        "B": "终身",
        "C": "五年内",
        "D": "一年内"
    },
    // 添加更多问题
];

// 当前题目索引
let currentQuestionIndex = 0;

// 玩家信息
let gamePoint = [
    {
        gameId: "",   // 玩家ID（或用户名）
        gameName: "",  // 玩家名称
        point: 0,      // 当前分数
    }
];

// 全局答题计数器
let totalAnsweredQuestions = 0;

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
const startDrivingTest = (message, room, talker, text) => {
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
    const currentQuestion = questionBank[currentQuestionIndex];

    // 判断答案是否正确
    if (currentQuestion.key === text.toLowerCase()) {
        player.point++; // 每答对一题得一分
        room.say("恭喜你，答对了！获得一分");
        room.say(`题目解析：${currentQuestion.analysis}`);
    } else {
        room.say("回答错误，请再试一次！");
    }

    // 更新全局答题计数器
    totalAnsweredQuestions++;

    // 判断是否完成10题
    if (totalAnsweredQuestions >= 10) {
        endGame(message, room);
    } else {
        // 更新题目索引，给出下一题
        currentQuestionIndex++;
        nextQuestion(message, room);
    }
};

/**
 * 获取下一题
 * @param message 消息对象
 * @param room 房间对象
 */
const nextQuestion = (message, room) => {
    // 确保还有问题可以给出
    if (currentQuestionIndex < questionBank.length) {
        const nextQuestion = questionBank[currentQuestionIndex];
        room.say(`下一题：${nextQuestion.question}`);
        room.say(`选项：${nextQuestion.A}, ${nextQuestion.B}, ${nextQuestion.C}, ${nextQuestion.D}`);
    } else {
        room.say("所有题目已答完！");
        endGame(message, room);
    }
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
export const startGame = (room, bot) => {
    globalGameStatus = true;
    toGame = "驾照考试";
    toGameStatus = true;

    room.say("驾照考试游戏已开始！你可以开始答题。");

    // 给出第一题
    nextQuestion(room, room);
};

