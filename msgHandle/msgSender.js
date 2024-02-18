/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 18:58:29
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-05 09:40:52
 * @Description: 发送各种消息
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../utils/botConfig.js";

axios.interceptors.response.use(() => {}, err => {
  console.log('err')
})


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
 * @description: 获取群员列表消息包的body
 * @param {*} GroupId
 * @return {*}
 */
const getReqBodyForGroupUsers = (GroupId) => {
  return JSON.stringify({
    "CgiCmd": "GetGroupMemberLists",
    "CgiRequest": {
      "Uin": GroupId,
      "LastBuffer": ""
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
    .catch(err => {
      console.log('reqErrIn -- sendImgToCloud');
    })
  })
}

/**
 * @description: 发送图片信息
 * @param {*} groupId
 * @param {*} msgData
 * @param {*} filePath
 * @param {*} width
 * @param {*} height
 * @return {*}
 */
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

/**
 * @description: 获取指定群成员列表
 * @param {*} groupId
 * @return {*}
 */
const getGroupUserList = (groupId) => {
  return new Promise((resolve, reject) => {
    instance.post('',
      getReqBodyForGroupUsers(groupId)
    )
    .then(res => {
      resolve(res.data?.ResponseData?.MemberLists)
    })
    .catch(err => {
      console.log('reqErrIn -- getGroupUserList');
    })
  })
}

export {
  sendTextMsgToGroup,
  sendImgMSgToGroup,
  getGroupUserList
};