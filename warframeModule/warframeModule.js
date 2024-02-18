/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-31 16:17:58
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-08 14:08:51
 * @Description: 机器人的wf模块
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */

import warframeApis from "./request/getWarframeInfo.js"
import warframeMarketApis from "./request/getWarframeMarketInfo.js"
import warframeMarketRivenApis from "./request/getWmRivenInfo.js"
import { sendTextMsgToGroup } from "../msgHandle/msgSender.js"
import { splitMsgBySearchKey } from '../utils/msgUtil.js'
import botConfig from "../utils/botConfig.js"

const warframeModule = {}

// wf相关关键词
warframeModule.keyWord = {
    '突击': warframeApis.getSortie(),
    '裂缝': warframeApis.getFissures(),
    '裂隙': warframeApis.getFissures(),
    '警报': warframeApis.getAlerts(),
    '奸商': warframeApis.getVoidTrader(),
    '入侵': warframeApis.getInvasions(),
    '地球平原': warframeApis.getCetusCycle(),
    '平原': warframeApis.getCetusCycle(),
    '金星平原': warframeApis.getVallisCycle(),
    '火卫二平原': warframeApis.getCambionCycle(),
    '电波': warframeApis.getNightwave(),
    '仲裁': warframeApis.getArbitration(),
    '扎里曼': warframeApis.getZarimanCycle(),
    'wiki': warframeApis.getWikiWebSite(),
    'wm': warframeApis.getWmWebSite()
}

// 自动签到
let dailyGroupCheck = '';

/**
 * @description: 初步处理搜寻结果
 * @param {*} searchRes
 * @return {*}
 */
const handleSearchKeyRes = (searchRes) => {
  if (!searchRes) return false;
  if (searchRes === 'ONLY_KEY') {
    warframeModule.keyWord[msg].then(res => {
      sendTextMsgToGroup(fromUin, res);
    })
    return false;
  }
  if (searchRes === 'WTF_RU_SEARCHING') {
    sendTextMsgToGroup(fromUin, '你在搜些什么勾吧?');
    return false;
  }
  return true;
}

/**
 * @description: wf检定，判断是否有wf关键词
 * @param {*} fromUin 来源群号
 * @param {*} msg 消息内容
 * @return {boolean} true|false 检定成功|检定失败
 */
warframeModule.check = (fromUin, msg) => {
  // 自动签到
  if (!dailyGroupCheck) {
    dailyGroupCheck = setInterval(() => {
      sendTextMsgToGroup(botConfig.dailyGroup, '签到');
    }, 24 * 3600 * 1000)
  }
  // wf固定词查询功能
  if (warframeModule.keyWord[msg]) {
    warframeModule.keyWord[msg].then(res => {
      sendTextMsgToGroup(fromUin, res);
    })
    return true;
  }
  // 需要匹配二段词查询的内容  比如： wiki 啥b
  // wiki
  const wikiSearchRes = splitMsgBySearchKey(msg, 'wiki');
  if (handleSearchKeyRes(wikiSearchRes)) {
    const url = `https://warframe.huijiwiki.com/wiki/${wikiSearchRes?.data}`;
    sendTextMsgToGroup(fromUin, `少爷,这是您要的wiki链接:${url}`);
    return true;
  }
  // wm
  const wmSearchRes = splitMsgBySearchKey(msg, 'wm') || splitMsgBySearchKey(msg, '查询');
  if (handleSearchKeyRes(wmSearchRes)) {
    const item = wmSearchRes?.data;
    warframeMarketApis.getSalePrice(item).then(res => {
      sendTextMsgToGroup(fromUin, res);
    })
    return true;
  }
  // 紫卡
  const wmrSearchRes = splitMsgBySearchKey(msg, '紫卡') || splitMsgBySearchKey(msg, 'zk');
  if (handleSearchKeyRes(wmrSearchRes)) {
    const item = wmrSearchRes?.data;
    warframeMarketRivenApis.getRivenSalePrice(item).then(res => {
      sendTextMsgToGroup(fromUin, res);
    })
    return true;
  }
  return false;
}

export default warframeModule;