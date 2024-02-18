/*
 * @Author: duanaoqi duanaoqi@huawei.com
 * @Date: 2024-01-31 10:11:01
 * @LastEditors: duanaoqi duanaoqi@huawei.com
 * @LastEditTime: 2024-02-06 14:35:32
 * @Description: warframe相关api接口
 * Copyright (c) 2024 by duanaoqi, All Rights Reserved. 
 */
import axios from "axios";
import botConfig from "../../utils/botConfig.js";

// wf接口模块
const warframeApis = {}
// 创建axios实例
const instance = axios.create({
  baseURL: botConfig.WF_SERVICE_HOST,
  timeout: botConfig.WF_TIME_OUT,
  headers: botConfig.BOT_SERVICE_HEADERS
})

instance.interceptors.response.use((res) => {
  return res;
}, err => {
  console.log('err', err);
})

/**
 * @description: 获取突击信息
 * @return {*}
 */
warframeApis.getSortie = () => {
  return new Promise((resolve, reject) => {
    instance.get('/sortie')
    .then(res => {
      resolve(res?.data);
    })
    .catch(err => {
      console.log('reqErrIn -- warframeMoudle.getSortie', err);
    })
  })
}

/**
 * @description: 获取裂隙信息
 * @return {*}
 */
warframeApis.getFissures = () => {
  return new Promise((resolve, reject) => {
    instance.get('/fissures')
    .then(res => {
      resolve(res?.data);
    })
    .catch(err => {
      console.log('reqErrIn -- warframeModule.getFissures', err);
    })
  })
}

/**
 * @description: 奸商信息
 * @return {*}
 */
warframeApis.getVoidTrader = () => {
  return new Promise((resolve, reject) => {
    instance.get('/voidTrader')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取警报信息
 * @return {*}
 */
warframeApis.getAlerts = () => {
  return new Promise((resolve, reject) => {
    instance.get('/alerts')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取入侵信息
 * @return {*}
 */
warframeApis.getInvasions = () => {
  return new Promise((resolve, reject) => {
    instance.get('/alerts')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取地球平原信息
 * @return {*}
 */
warframeApis.getCetusCycle = () => {
  return new Promise((resolve, reject) => {
    instance.get('/cetusCycle')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取金星平原信息
 * @return {*}
 */
warframeApis.getVallisCycle = () => {
  return new Promise((resolve, reject) => {
    instance.get('/vallisCycle')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取火卫二平原信息
 * @return {*}
 */
warframeApis.getCambionCycle = () => {
  return new Promise((resolve, reject) => {
    instance.get('/cambionCycle')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取电波信息
 * @return {*}
 */
warframeApis.getNightwave = () => {
  return new Promise((resolve, reject) => {
    instance.get('/nightwave')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取仲裁信息
 * @return {*}
 */
warframeApis.getArbitration = () => {
  return new Promise((resolve, reject) => {
    instance.get('/arbitration')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 获取扎里曼信息
 * @return {*}
 */
warframeApis.getZarimanCycle = () => {
  return new Promise((resolve, reject) => {
    instance.get('/zarimanCycle')
    .then(res => {
      resolve(res?.data);
    })
  })
}

/**
 * @description: 返回wiki链接
 * @return {*}
 */
warframeApis.getWikiWebSite = () => {
  return new Promise((resolve, reject) => {
    resolve(`少爷,这是您要的wiki链接:https://warframe.huijiwiki.com`);
  })
}

warframeApis.getWmWebSite = () => {
  return new Promise((resolve, reject) => {
    resolve(`少爷,这是您要的wm链接:warframe.market'`);
  })
}

warframeApis

export default warframeApis