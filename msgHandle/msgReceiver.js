/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:48:56
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 16:05:53
 * @Description: 负责消息接收、归类、转发
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import { buffer2Json } from '../utils/msgUtil.js'
import { sendTextMsgToGroup } from  '../msgHandle/msgSender.js'
import botConfig from '../utils/botConfig.js'
import warframeModule from '../warframeModule/warframeModule.js'
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
  // 来源人信息(私聊时生效)
  const senderUin = msgJson?.CurrentPacket?.EventData?.MsgHead?.SenderUin;
  // 内容
  const content = msgJson?.CurrentPacket?.EventData?.MsgBody?.Content;
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
    // WF群过一次wf检定
    if (botConfig.WF_GROUP.includes(fromUin)) {
      warframeModule.check(fromUin, content);
    }
    if (content === '铸币') {
      sendTextMsgToGroup(fromUin, "铸币");
    }
  }
  console.log(`
  EventName: ${eventName},  FromUin: ${fromUin},  Content: ${content}
  `);
}

export {
  msgHandle
};
