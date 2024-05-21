// 严格模式 ,测试一下这个
"use strict";
// 调用微软云接口
import sdk from "microsoft-cognitiveservices-speech-sdk"
import readline from "readline"
import  "../newdate.js";
import {log} from "wechaty";
import {FileBox} from "file-box";
// 密钥
const SPEECH_KEY = "65d7e8a8deea4461967c3a627549d793";
// 区域
const SPEECH_REGION = "japaneast";
// 语音合成器对象
let synthesizer = null;
/**
 * 创建合成器
 */
const createSynthesizer = ()=>{
    log.info("文字转语音模块初始化...")
    // 初始化语音对象
    const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
    // 文件
    // let audioFile = new Date().Format("yyyyMMddhhmmss") + ".wav";
    // 初始化音频对象
    // const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
    // 语音模型
    // https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts 从这里选
    speechConfig.speechSynthesisVoiceName = "zh-CN-XiaoshuangNeural";
    // 创建语音合成器
    synthesizer = new sdk.SpeechSynthesizer(speechConfig);
}
/**
 * 文字转语音模块初始化
 */
export const textToVideo = (room,bot,msg) => {
    return new Promise((success,error)=>{
        // 为空则创建合成器
        if (synthesizer === null){
            createSynthesizer();
        }
        // 开始合成语音
        synthesizer.speakTextAsync(msg,result=> {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("合成完成.");
                    // synthesizer.close();
                    // 浏览器流转换常规流
                    // result.audioData
                    // synthesizer = null;
                    success(Buffer.from(result.audioData))
                    return;
                } else {
                    console.error("合成取消, " + result.errorDetails +
                        "\n请填写秘钥以及地区?");
                }
                synthesizer.close();
                synthesizer = null;
                error("合成失败")
            },
            err=>{
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = null;
                error("合成失败")
            });
    })
}
