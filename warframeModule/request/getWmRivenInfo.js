/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-31 15:17:55
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-06 14:44:56
 * @Description: warframeMarkt相关api接口
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../../utils/botConfig.js";

// wm接口模块
const warframeMarketRivenApis = {}
// 创建axios实例
const instance = axios.create({
  baseURL: botConfig.WMR_SERVICE_HOST,
  timeout: botConfig.WF_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS
})

instance.interceptors.response.use((res) => {
  return res;
}, err => {
  console.log('err', err);
});

/**
 * @description: 返回wm的url
 * @return {*}
 */
warframeMarketRivenApis.getWmSite = () => {
  return new Promise((resolve, reject) => {
    resolve("你好像啥都没查，那就返回给你这个吧：warframe.market");
  })
}

/**
 * @description: 查询wm物品价格
 * @param {*} item
 * @return {*}
 */
warframeMarketRivenApis.getRivenSalePrice = (item) => {
  return new Promise((resolve, reject) => {
    instance.get(`/${item}`)
    .then(res => {
      resolve(res?.data)
    })
  })
}

export default warframeMarketRivenApis;