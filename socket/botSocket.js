/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 17:28:05
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 16:05:07
 * @Description: bot连接OPQBot（by webSocket）
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import ws from "ws";
import { msgHandle } from "../msgHandle/msgReceiver.js";
 
const SERCIVE_HOST = "ws://127.0.0.1:8088/ws";

// 请先确保OPQBot已运行
// 和wf服务已经运行
// ws://127.0.0.1:8088/ws
//让客户端去连接服务器的socket
const initScoket = () => {
  const  socket = new ws(SERCIVE_HOST);
  socket.on("open", () => {
    console.log("connect success");
  });
  
  socket.on("error", (err) => {
    console.log("error: ", err);
  });
  
  socket.on("close", () => {
    console.log("close");
  });
  
  socket.on("message", (data) => {
    msgHandle(data);
  });
}

export {
  initScoket
}
