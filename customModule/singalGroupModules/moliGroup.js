/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-02-01 10:46:18
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-02 11:38:56
 * @Description: moli群组模块
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import wordDict from "../../utils/wordDict.js";
import { sendTextMsgToGroup } from "../../msgHandle/msgSender.js";


const moliGroupModule = {}


moliGroupModule.check = (fromUin, senderUin, msg, atList) => {
  return false;
}

export default moliGroupModule;