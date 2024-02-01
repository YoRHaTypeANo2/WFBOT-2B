/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:58:29
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-01 11:25:01
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
const getReqBodyForGroupText = (groupId, msgData, atList) => {
  return JSON.stringify({
    "CgiCmd": "MessageSvc.PbSendMsg",
    "CgiRequest": {
      "ToUin": groupId,
      "ToType": 2,
      "Content": msgData,
      "AtUinLists": atList,
    }
  })
}

/**
 * @description: 发送群消息(文字)
 * @param {*} groupId 群号
 * @param {*} msgData 消息
 * @param {*} atList at的成员列表
 * @return {*}
 */
const sendTextMsgToGroup = (groupId, msgData, atList = []) => {
  instance.post('',
    getReqBodyForGroupText(groupId, msgData, atList)
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