<style lang="less">
    .page-wrapper {
        width: 210px;
        height: 30px;
        float: right;
        li {
            float: left;
            display: inline-block;
            a {
                display: block;
                margin: 0 5px;
                padding: 2px 0;
                width: 60px;
                font-size: 14px;
                color: @color-666;
                text-align: center;
                border: 1px solid @link-border-color;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <base-table :scrollX="false"
                  :titleData="titleData"
                  :bodyData="bodyData"
                  :trClass="trClass"
                  @tdClick="tdClick"
                  @getSortData="getSortData">
        </base-table>
        <ul class="page-wrapper">
            <li>
                <a class="first-page disabled">首页</a>
            </li>
            <li>
                <a class="pre-page disabled">上一页</a>
            </li>
            <li>
                <a class="next-page disabled">下一页</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                trClass: [
                    {
                        index: 5,
                        className: 'detail'
                    },
                    {
                        index: 0,
                        className: 'companyName'
                    }
                ],
                titleData : [
                    {company: '公司名称',className: 'companyName'},
                    {type: '公司类型'},
                    {target: '收购标的'},
                    {legalPreson: '法人代表'},
                    {capital: '注册资本<br><small>(万元)</small>',sortValue: 'capital',sortType: ''},
                    {detail: '详情'},
                ],
                bodyData : [],
            }
        },
        mounted() {
            let that = this;
            that.setData();
        },
        methods: {
            setData() {
                let result = [
                    {
                        type: "非挂牌",
                        target: "2020-01-10",
                        fullName: "北京视野金融信息服务有限公司",
                        company: "",
                        legalPreson: '张三',
                        capital: "1500",
                        detail: "详情",
                    },
                    {
                        type: "A股上市",
                        target: "2020-01-10",
                        fullName: "字节跳动",
                        company: "",
                        legalPreson: '李四',
                        capital: "2500",
                        detail: "详情",
                    }
                ];
                for(let i = 0; i < result.length; i++) {
                    let imgSrc = require('@/assets/icon-stock-a-cyb.png');
                    result[i].company = "<img src='"+ imgSrc +"'>" + result[i].fullName;
                }
                this.bodyData = [].concat(result);
                console.log(result,'====')
            },
            tdClick(value) {
                console.log(value,'点击事件')
            },
            getSortData(sortData) {
                console.log(sortData,'排序事件')
                let that = this;
                let titleData = that.titleData || [];
                if(sortData.sortType){
                    for(let i = 0, l = titleData.length; i < l; i++){
                        if(titleData[i].hasOwnProperty(sortData.sortValue)){
                            titleData[i].sortType = sortData.sortType;
                        }
                    }
                }
            }
        }
    }
</script>
