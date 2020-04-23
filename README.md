### vue基础组件

### ---------------------------------------

基于vue的底层组件UI框架，原生代码，无第三方库。

### ---------------------------------------

新添加了全局的css变量 vue3下面直接执行 vue add style-resources-loader 
配置 vue.config.js如下
```
const path = require("path");

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/theme/css.less")] #自己的全局文件地址
        } 
    }
};
```

###  关于axios跨域  vue配置proxy 网上的都是找一篇一通往上怼  根本没重点 解析也不明确
### 重点说明 pathRewrite 并不是全部重写 具体的是重写了还是替换了  分情况见下面注释1
```    // 配置跨域
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
    【注释1】
    // pathRewrite: {'^/old/api' : '/new/api'} // 重写路径 pathRewrite + 请求地址
    // pathRewrite: {'^/remove/api' : ''} // 删除路径 target + '' + 请求地址
    // pathRewrite: {'^/' : '/basepath/'} // 添加基础路径 target + pathRewrite + 请求地址 ```

### webSreom加载vue项目头疼啊 不加载node_modules的话没智能提示  加载的话内存小被卡死  怎么办？
### svn propset svn:ignore node_modules . 添加svn忽略文件 或者在svn设置里面添加node_modules选项用于过滤node_modules
### $refd.$el.children 可以获取dom并操作
### $refd.$el.children.offsetHeight 获取vue中dom元素的高度  类似属性也可以获得 
### [CSDN地址](https://blog.csdn.net/xhwy_zh)
### 关于$refs.xx 获取高度  $refs.xx.offsetHeight $refs.xx.getArrtbuite('xx')
