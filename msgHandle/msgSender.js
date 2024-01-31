/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:58:29
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 10:11:28
 * @Description: 发送各种消息
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../utils/botConfig.js";


// 创建axios实例
const instance = axios.create({
  baseURL: botConfig.BOT_SERVICE_HOST,
  timeout: botConfig.BOT_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS,
  params: botConfig.BOT_SERVICE_PARAMS
})


/**
 * @description: 获取群组消息包的body
 * @param {*} groupId 群号
 * @param {*} msgData 消息（文字）
 * @return {*}
 */
const getReqBodyForGroupText = (groupId, msgData) => {
  return JSON.stringify({
    "CgiCmd": "MessageSvc.PbSendMsg",
    "CgiRequest": {
      "ToUin": groupId,
      "ToType": 2,
      "Content": msgData,
    }
  })
}

/**
 * @description: 发送群消息(文字)
 * @param {*} groupId 群号
 * @param {*} msgData 消息
 * @return {*}
 */
const sendTextMsgToGroup = (groupId, msgData) => {
  instance.post('',
    getReqBodyForGroupText(groupId, msgData)
  )
  .then(res => {
    // res暂时就不管了
    // console.log(res);
  })
  .catch(err => {
    // console.log(err);
    console.log('reqErrIn -- sendTextMsgToGroup', err);
  })
}

export {
  sendTextMsgToGroup
};