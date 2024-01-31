/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-30 19:00:19
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 15:32:48
 * @Description: 数据处理工具方法
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */


/**
 * @description: socket传过来的buffer转Json
 * @param {*} buffer socketBuffer
 * @return {*}
 */
const buffer2Json = (buffer) => {
  const enc = new TextDecoder("utf-8");
  const uint8_msg = new Uint8Array(buffer);
  const finalMsg = JSON.parse(enc.decode(uint8_msg));
  return finalMsg;
}

/**
 * @description: 返回匹配keyword的查询词
 * @param {*} msg 消息
 * @param {*} keyword 需要匹配的keyword
 * @return {*}
 */
const splitMsgBySearchKey = (msg, keyword) => {
  // 我知道或许用正则来做会显得很高级
  // 但是我tm全忘了
  // 哈哈
  const msgLower = msg.toLocaleLowerCase();
  const searchword = `${keyword} `;
  if (!msgLower.indexOf(searchword)) {
    let splitedWordArray = msgLower?.split(searchword)?.filter((item) => item);
    if (splitedWordArray?.length === 1) {
      // 我觉得有啥b会搜ONLY_KEY和WTF_RU_SEARCHING导致我出现不可预知的问题，所以加固一层
      return {data: splitedWordArray[0]};
    } else if (!splitedWordArray.length) {
      return 'ONLY_KEY'
    } else {
      return 'WTF_RU_SEARCHING'
    }
  }
  return '';
}

export {
  buffer2Json,
  splitMsgBySearchKey
}