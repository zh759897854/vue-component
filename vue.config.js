// vue add style-resources-loader
const path = require("path");

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                path.resolve(__dirname, "./src/theme/css.less"),
            ],
        }
    },
    // 配置跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'https://www.mxnzp.com/api/', // 代理目标主机
                changeOrigin: true, // 启用跨域
                ws: true,
                pathRewrite: { // 路径重写等
                    '^/api': ''
                }
            }
        }
    },
    // pathRewrite: {'^/old/api' : '/new/api'} // 重写路径 pathRewrite + 请求地址
    // pathRewrite: {'^/remove/api' : ''} // 删除路径 target + '' + 请求地址
    // pathRewrite: {'^/' : '/basepath/'} // 添加基础路径 target + pathRewrite + 请求地址

};
