/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 20:24:18
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 16:26:11
 * @Description: 配置信息
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
const botConfig = {
  IGNORE_GROUP: [123456], // 需要屏蔽消息的群号 number
  QQ: 123456, // 你的qq号 number
  // WF
  WF_SERVICE_HOST: "http://localhost:3000/wf/robot", // wf服务的url
  WM_SERVICE_HOST: "http://localhost:3000/wm/robot", // wm服务的url
  WF_TIME_OUT: 10000, // timeout
  WF_GROUP: [123456, 123456, 123456, 123456], // wf群组
  // BOT
  WS_SERVICE_HOST: "ws://127.0.0.1:8088/ws",  // opq的ws地址
  BOT_SERVICE_HOST: "http://localhost:8088/v1/LuaApiCaller", // opq接口地址
  BOT_SERVICE_HEADERS: { // headers
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
  },
  BOT_SERVICE_PARAMS: { // 固定params
    funcname: 'MagicCgiCmd',
    timeout: 10000,
    qq: 123456
  },
  BOT_TIME_OUT: 10000, // timeout
}

export default botConfig;