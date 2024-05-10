export const roomEventInit = (bot)=>{
    // 新成员事件
    bot.on('room-join', (room, inviteeList, inviter) => {
        const nameList = inviteeList.map(c => c.name()).join(',')
        room.say(`新成员 ${nameList}, 邀请者 ${inviter}`)
    })
    // 成员退出事件
    bot.on('room-leave', (room, leaverList) => {
        const nameList = leaverList.map(c => c.name()).join(',')
        room.say(`程序退出 ${nameList}`)
    })
    // 成员修改群名称事件
    bot.on('room-topic', (room, topic, oldTopic, changer) => {
        room.say(`群名称被修改 ${oldTopic} to ${topic} by ${changer.name()}`)
    })
}
