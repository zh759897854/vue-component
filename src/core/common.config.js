import axios from 'axios'

axios.defaults.timeout = 10000;
axios.defaults.headers.app_id = 'catyikskognqglfl';
axios.defaults.headers.app_secret = 'dnNhcmJoeGlDN1FuaElQazlTelYwQT09';

axios.interceptors.response.use(function(response) {
    // 处理响应数据
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, function (error){
    // 处理响应失败
    return Promise.reject(error);
});

const get = function(data) {
    let url = data.url,
        params = data.params;
    return new Promise((resolve,reject) => {
        axios.get(url, {params}
        ).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error)
        })
    })
};

const post = function(data) {
    let url = data.url,
        params = data.params;
    return new Promise((resolve,reject) => {
        axios.get(url, {params: params}
        ).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error)
        })
    })
};

export default {get, post}
