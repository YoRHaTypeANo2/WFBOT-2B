/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-31 15:17:55
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-01-31 15:30:21
 * @Description: warframeMarkt相关api接口
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../../utils/botConfig.js";

// wm接口模块
const warframeMarketApis = {}
// 创建axios实例
const instance = axios.create({
  baseURL: botConfig.WM_SERVICE_HOST,
  timeout: botConfig.WF_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS
})

/**
 * @description: 返回wm的url
 * @return {*}
 */
warframeMarketApis.getWmSite = () => {
  return new Promise((resolve, reject) => {
    resolve("warframe.market");
  })
}

/**
 * @description: 查询wm物品价格
 * @param {*} item
 * @return {*}
 */
warframeMarketApis.getSalePrice = (item) => {
  return new Promise((resolve, reject) => {
    instance.get(`/${item}`)
    .then(res => {
      resolve(res.data)
    })
  })
}

export default warframeMarketApis;