import warframeApis from "./request/getWarframeInfo.js"
import warframeMarketApis from "./request/getWarframeMarketInfo.js"
import { sendTextMsgToGroup } from "../msgHandle/msgSender.js"
import { splitMsgBySearchKey } from '../utils/msgUtil.js'

const warframeModule = {}

warframeModule.keyWord = {
    '突击': warframeApis.getSortie(),
    '裂缝': warframeApis.getFissures(),
    '裂隙': warframeApis.getFissures(),
    '警报': warframeApis.getAlerts(),
    '奸商': warframeApis.getVoidTrader(),
    '入侵': warframeApis.getInvasions(),
    '地球平原': warframeApis.getCetusCycle(),
    '金星平原': warframeApis.getVallisCycle(),
    '火卫二平原': warframeApis.getCambionCycle(),
    '电波': warframeApis.getNightwave(),
    '仲裁': warframeApis.getArbitration(),
    '扎里曼': warframeApis.getZarimanCycle(),
    'wiki': warframeApis.getWikiWebSite()
}

/**
 * @description: wf检定，判断是否有wf关键词  别问为什么叫wf检定，因为我在玩博德之门
 * @param {*} fromUin 来源群号
 * @param {*} msg 消息内容
 * @return {*}
 */
warframeModule.check = (fromUin, msg) => {
  // wf固定词查询功能
  if (warframeModule.keyWord[msg]) {
    warframeModule.keyWord[msg].then(res => {
      sendTextMsgToGroup(fromUin, res);
    })
    return;
  }
  // 需要匹配二段词查询的内容  比如： wiki 啥b
  // wiki
  const wikiSearchRes = splitMsgBySearchKey(msg, 'wiki');
  if (wikiSearchRes) {
    switch(wikiSearchRes) {
      case 'ONLY_KEY':
        warframeModule.keyWord[msg].then(res => {
          sendTextMsgToGroup(fromUin, res);
        })
        break;
      case 'WTF_RU_SEARCHING':
        sendTextMsgToGroup(fromUin, '你在搜些什么勾吧?');
        break;
      default:
        const url = `https://warframe.huijiwiki.com/wiki/${wikiSearchRes?.data}`;
        sendTextMsgToGroup(fromUin, `少爷,这是您要的wiki链接^^:${url}`);
    }
    return;
  }
  // wm
  const wmSearchRes = splitMsgBySearchKey(msg, 'wm');
  if (wmSearchRes) {
    switch(wmSearchRes) {
      case 'ONLY_KEY':
        warframeModule.keyWord[msg].then(res => {
          sendTextMsgToGroup(fromUin, res);
        })
        break;
      case 'WTF_RU_SEARCHING':
        sendTextMsgToGroup(fromUin, '你在搜些什么勾吧?');
        break;
      default:
        const item = wmSearchRes?.data;
        warframeMarketApis.getSalePrice(item).then(res => {
          sendTextMsgToGroup(fromUin, res);
        })
    }
    return;
  }
}

export default warframeModule;