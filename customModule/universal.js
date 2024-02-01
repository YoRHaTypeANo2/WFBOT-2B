/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-31 16:17:54
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-01 15:04:59
 * @Description: 自定义功能模块
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import wordDict from "../utils/wordDict.js";
import { sendTextMsgToGroup } from "../msgHandle/msgSender.js";

const universalModule = {};

universalModule.check = (fromUin, senderUin, msg, atList) => {
  // 去掉@info的Msg信息
  let removeAtStrMsg = msg;
  // 两端去掉空格的信息
  const trimedMSg = msg.trim();
  // 两端去掉空格的除@信息
  let trimedAtStrMsg = msg;
  // at列表
  const atNickList = atList.map(item => {
    return {
      Nick: item.Nick,
      Uin: item.Uin
    }
  })
  if (atList.length) {
    atNickList.forEach(item => {
      removeAtStrMsg = removeAtStrMsg.replace(`@${item.Nick}`, '');
    })
    trimedAtStrMsg = removeAtStrMsg.trim();
  }
  // 铸币词检定
  if (wordDict.zhubiList.includes(msg)) {
    sendTextMsgToGroup(fromUin, msg);
    return true;
  }
  console.log('trimedAtStrMsg',trimedAtStrMsg)
  if (trimedAtStrMsg &&
  wordDict.zhubiList.includes(trimedAtStrMsg)) {
    sendTextMsgToGroup(fromUin, trimedAtStrMsg, atNickList);
    return true;
  }
  return false;
}

export default universalModule;
