/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:48:56
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-02 11:08:14
 * @Description: 负责消息接收、归类、转发
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import { buffer2Json } from '../utils/msgUtil.js'
import botConfig from '../utils/botConfig.js'
import warframeModule from '../warframeModule/warframeModule.js'
import universalModule from '../customModule/universal.js'
import moliGroupModule from '../customModule/singalGroupModules/moliGroup.js'
/**
 * @description: 消息处理
 * @param {*} msgBuffer
 * @return {*}
 */
const msgHandle = (msgBuffer) => {
  // 消息转义
  const msgJson = buffer2Json(msgBuffer)
  // 事件类型
  const eventName = msgJson?.CurrentPacket?.EventName;
  // 来源群id
  const fromUin = msgJson?.CurrentPacket?.EventData?.MsgHead?.FromUin;
  // 来源人信息(群聊时为发言者、私聊时为指定用户)
  const senderUin = msgJson?.CurrentPacket?.EventData?.MsgHead?.SenderUin;
  // 内容
  const content = msgJson?.CurrentPacket?.EventData?.MsgBody?.Content;
  // @指定用户的列表
  const atList = msgJson?.CurrentPacket?.EventData?.MsgBody?.AtUinLists || [];
  // 自己的消息不回
  // 屏蔽的群消息不回
  // 空content不回
  if (
    [fromUin, senderUin].includes(botConfig.QQ) ||
    botConfig.IGNORE_GROUP.includes(fromUin) ||
    !content
  ) {
    return;
  }
  // 群消息处理
  if (eventName === 'ON_EVENT_GROUP_NEW_MSG') {
    // wf检定
    const groupInfoCheck = (botConfig.WF_GROUP.includes(fromUin) && warframeModule.check(fromUin, content)) ||
    // moli群过检定
    moliGroupModule.check(fromUin, senderUin, content, atList) ||
    // 通用检定
    universalModule.check(fromUin, senderUin, content, atList); //通用检定
    // 我知道当你看见这些注释
    // 会在想为什么叫检定
    // 因为我最近在玩博德之门^^
    console.log('检定结果：', groupInfoCheck ? '成功' : '失败');
  }
  // console.log(`
  // EventName: ${eventName},  FromUin: ${fromUin},  Content: ${content}, body: ${JSON.stringify(msgJson?.CurrentPacket?.EventData?.MsgBody)}
  // `);
}

export {
  msgHandle
};
