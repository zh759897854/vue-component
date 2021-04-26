/**
 * @desc: axios防抖节流请求封装
 * @params: {url: '', data: {}}
 * @return: Object
 */
import axios from "axios";
import Route from "vue-router";
import UTILS from "../common/utils/index";
import getSign from "../common/service/sign.service";
import { Loading } from "element-ui";

// 请求配置
const defaultConfig = {
  // `url`是用于请求的服务器 URL
  url: "",
  // `method`是创建请求时使用的方法 默认是get
  method: "post",
  // `baseURL`将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: "/datasync-server",
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间) 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 15000,
  // `data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  data: {},
  // `params` 是即将与请求一起发送的 URL 参数用于get请求
  params: {},
};

const defaultData = {
  isReduce: 1, //是否压缩的标识
  ver: "v1.0.0", //版本号
  platForm: "seeyii", //平台
};

let loadingInstance = null;

class service {
  constructor(configObj) {
    let that = this;

    this.successCallback = function () {};
    this.errorCallback = function () {};
    this.alwaysCallback = function () {};

    this.curConfig = {};
    this.updateConfig(configObj);

    // 新建一个axios实例
    that.Axios = axios.create();

    // 请求防抖
    const CancelToken = axios.CancelToken;
    this.pendingList = [];

    // 请求拦截
    that.Axios.interceptors.request.use(
      function (config) {
        // 取消已经存在的请求
        that.cancelRequest(config);
        config.cancelToken = new CancelToken(function (c) {
          that.pendingList.push({
            flag: config.url + "&" + config.method,
            fn: c,
          });
        });
        return config;
      },
      function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );

    // 响应拦截
    that.Axios.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        that.cancelRequest(response.config);
        let result = response.data || {};
        let msg = result.msg || {};
        if (msg.code === "10006") {
          Route.push("login");
        }
        return result;
      },
      function (error) {
        // 对响应错误做点什么
        if (error.response && error.response.status === 808) {
          Route.push("login");
        }
        return Promise.reject(error);
      }
    );
  }

  // 处理传参
  updateConfig(conf) {
    // 处理一些请求参数
    let that = this;
    let config = {};
    config = Object.assign({}, defaultConfig, defaultData, conf);
    if (config.url === "") {
      console.error("请求地址为空");
      return false;
    }

    // 不跨域请求删除baseURL参数
    if (!Object.prototype.hasOwnProperty.call(config, "proxy")) {
      delete config.baseURL;
    }

    if (config.method === "post") {
      delete config.params;
      config.data["timestamp"] = new Date().getTime();
      // 计算sign值
      config.data = getSign(config.data);
      // 序列化参数 将请求转化为form data格式
      config.data = UTILS.serializeData(config.data);
    } else {
      delete config.data;
    }

    //初始化请求成功回调函数
    if (config.success) {
      that.successCallback = config.success;
    }
    //初始化请求失败回调函数
    if (config.error) {
      that.errorCallback = config.error;
    }
    //初始化请求不管成功与否一定会执行的函数
    if (config.always) {
      that.alwaysCallback = config.always;
    }
    that.curConfig = Object.assign({}, config);
  }

  // 发起请求获取数据
  request() {
    // 发起请求
    let that = this;
    // 需要添加全局loadingd的
    if (that.curConfig.data.indexOf("loading") > -1) {
      loadingInstance = Loading.service();
    }
    that.Axios.request(that.curConfig)
      .then(function (data) {
        that.successCallback(data);
      })
      .catch(function (error) {
        that.errorCallback(error);
      })
      .finally(function () {
        if (loadingInstance !== null) {
          loadingInstance.close();
        }
        that.alwaysCallback();
      });
  }

  // 取消请求
  cancelRequest(conf) {
    let list = this.pendingList;
    for (let c in list) {
      //当前请求在数组中存在时执行函数体
      if (list[c].flag === conf.url + "&" + conf.method && typeof(list[c].fn) === "function") {
        list[c].fn("cancelRequest"); //执行取消操作
        list.splice(c, 1); //把这条记录从数组中移除
      }
    }
  }
}

export default service;
