/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:58:29
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-01 20:22:51
 * @Description: 发送各种消息
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../utils/botConfig.js";


// 创建axios实例 (信息发送)
const instance = axios.create({
  baseURL: botConfig.BOT_SERVICE_HOST,
  timeout: botConfig.BOT_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS,
  params: botConfig.BOT_SERVICE_PARAMS
})

// 创建axios实例 （资源文件）
const instance2 = axios.create({
  baseURL: botConfig.BOT_SERVICE_RESOURCE_HOST,
  timeout: botConfig.BOT_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS,
  params: botConfig.BOT_SERVICE_RESOURCE_PARAMS
})


/**
 * @description: 获取群组消息包的body
 * @param {*} groupId 群号
 * @param {*} msgData 消息（文字）
 * @return {string}
 */
const getReqBodyForGroupText = (groupId, msgData, atList = []) => {
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
 * @description: 获取资源上传消息包的body
 * @param {string} filePath
 * @return {string} 
 */
const getReqBodyForResource = (filePath) => {
  return JSON.stringify({
    "CgiCmd": "PicUp.DataUp",
    "CgiRequest": {
      "CommandId": 2,
      "FilePath": filePath
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
    console.log('reqErrIn -- sendTextMsgToGroup', msgData);
  })
}

/**
 * @description: 上传图片资源
 * @param {*} filePath
 * @return {*}
 */
const sendImgToCloud = (filePath) => {
  return new Promise((resolve, reject) => {
    instance2.post('',
      getReqBodyForResource(filePath)
    )
    .then(res => {
      resolve(res.data)
    })
  })
}

const sendImgMSgToGroup = (groupId, msgData, filePath, width, height) => {
  const baseBody = JSON.parse(getReqBodyForGroupText(groupId));
  // 先获取图片资源地址
  sendImgToCloud(filePath)
  .then(res => {
    baseBody.CgiRequest.Images = [
      {
        FileId: res?.ResponseData?.FileId,
        FileMd5: res?.ResponseData?.FileMd5,
        FileSize: res?.ResponseData?.FileSize,
        width: width,
        height: height
      }
    ]
    console.log()
    instance.post('',
      JSON.stringify(baseBody)
    )
    .then(res => {
      // console.log(res)
    })
    .catch(err => {
      console.log('reqErrIn -- sendImgMSgToGroup');
    })
  })
}

export {
  sendTextMsgToGroup,
  sendImgMSgToGroup
};