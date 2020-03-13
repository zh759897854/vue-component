import axios from 'axios'

const dataServe = function(cfg) {
    let base_url = '';
    process.env.NODE_ENV === 'development'?base_url = 'http://192.168.10.14:8080':base_url = 'http://192.168.10.14:8080';
    const config = {
        proxy: true,  //是否需要通过代理请求数据
        baseURL: base_url,
        method: 'get',  //method
        timeout: 5000,
        headers: {
            app_id: 'catyikskognqglfl',
            app_secret: 'dnNhcmJoeGlDN1FuaElQazlTelYwQT09'
        },
        url: '', //url
        success: function () {}, // 成功的回调函数
        error: function () {}, // 错误的回调函数
        always: function () {} //完成的回调函数
    };
    const curAxios = axios.create();

    const pending = {};
    const CancelToken = axios.CancelToken;
    const removePending = (key, isRequest = false) => {
        if (pending[key] && isRequest) {
            pending[key]('取消重复请求')
        }
        delete pending[key]
    };
    const getRequestIdentify = (config, isReuest = false) => {
        let url = config.url,
            result = '';
        if (isReuest) {
            url = config.baseURL + config.url.substring(1, config.url.length)
        }
        result = config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data));
        return result
    };

    // 请求拦截器
    curAxios.interceptors.request.use(config => {
        // 拦截重复请求(即当前正在进行的相同请求)
        let requestData = getRequestIdentify(config, true);
        removePending(requestData, true);

        config.cancelToken = new CancelToken((c) => {
            pending[requestData] = c;
            config.url = cfg.url;
        });
        return config
    }, error => {
        return Promise.reject(error)
    });


    curAxios.interceptors.response.use(function (response) {
        // 把已经完成的请求从 pending 中移除
        let requestData = getRequestIdentify(response.config);
        removePending(requestData);
        return Promise.resolve(response);
    }, function(error) {
        let status = error.response.status;
        switch (status) {
            case 400:
                error.response.message = '请求错误';
                break;
            case 401:
                error.response.message = '未授权，请登录';
                break;
            case 403:
                error.response.message = '拒绝访问';
                break;
            case 404:
                error.response.message = '未找到访问地址';
                break;
            case 408:
                error.response.message = '请求超时';
                break;
            case 500:
                error.response.message = '服务器内部错误';
                break;
            case 501:
                error.response.message = '服务未实现';
                break;
            case 502:
                error.response.message = '网关错误';
                break;
            case 503:
                error.response.message = '服务不可用';
                break;
            case 504:
                error.response.message = '网关超时';
                break;
            case 505:
                error.response.message = 'HTTP版本不受支持';
                break;
            default:
        }
        return Promise.reject(error)
    });

    if(cfg.url && cfg.url !== '') {
        // data post参数
        // paramsL get参数
        cfg.method !== 'get'?config.data = cfg.data:config.params = cfg.data;
        Object.assign(config,cfg)
    }
    curAxios.request(config)
        .then(function (data) {
            config.success(data.data)
        })
        .catch(function (response) {
            config.error({
                status: response.response.status,
                msg: response.response.message
            })
        })
        .finally(function(){
            config.always()
        });
};

export default dataServe
