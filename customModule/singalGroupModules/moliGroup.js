/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-02-01 10:46:18
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-01 11:51:25
 * @Description: moli群组模块
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import wordDict from "../../utils/wordDict.js";
import { sendTextMsgToGroup } from "../../msgHandle/msgSender.js";

const moliGroupCheck = (fromUin, senderUin, msg, atList) => {
  // const handle = 
}

const behaviorList = [
  // @带上铸币回复
  {
    msgKeyWords: wordDict,
    minAtListLength: 1,
    behavior: 1,
  }
]



export default moliGroupCheck;