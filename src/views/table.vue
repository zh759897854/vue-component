<style lang="less">

</style>

<template>
    <div class="wrapper">
        <base-table :scrollX="false"
                    :titleData="companyCookie.titleData"
                    :bodyData="companyCookie.bodyData"
                    :trClass="trClass"
                    @tdClick="tdClick"
                    @getSortData="getSortData">
        </base-table>
        <base-page
            refer="companyCookie"
            :cookie="companyCookie"
            @pageChange="pageChange">
        </base-page>
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
                companyCookie: {
                    pageNumber: 1,
                    pageSize: 3,
                    pageCount: 1,
                    firstDisable: true,
                    perDisable: true,
                    nextDisable: true,
                    titleData : [
                        {company: '公司名称',className: 'companyName'},
                        {type: '公司类型'},
                        {target: '收购标的'},
                        {legalPreson: '法人代表'},
                        {capital: '注册资本<br><small>(万元)</small>',sortValue: 'capital',sortType: ''},
                        {detail: '详情'},
                    ],
                    bodyData : [],
                    tableData: []
                }
            }
        },
        mounted() {
            let that = this;
            that.setData(true);
        },
        methods: {
            setData(init) {
                let curCookie = this.companyCookie;
                let pageSize = curCookie.pageSize;

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
                    },
                    {
                        type: "三板公司",
                        target: "2020-01-10",
                        fullName: "中大股份",
                        company: "",
                        legalPreson: '王五',
                        capital: "3500",
                        detail: "详情",
                    }
                ];
                for(let i = 0; i < result.length; i++) {
                    let imgSrc = require('@/assets/icon-stock-a-cyb.png');
                    result[i].company = "<img src='"+ imgSrc +"'>" + result[i].fullName;
                }

                console.log(require)
                let len = 3;
                if(curCookie.pageNumber === 2) {
                    result = [
                        {
                            type: "A股上市",
                            target: "2020-01-10",
                            fullName: "字节跳动",
                            company: "字节跳动",
                            legalPreson: '李四',
                            capital: "2500",
                            detail: "详情",
                        },
                        {
                            type: "三板公司",
                            target: "2020-01-10",
                            fullName: "中大股份",
                            company: "中大股份",
                            legalPreson: '王五',
                            capital: "3500",
                            detail: "详情",
                        },
                        {
                            type: "三板公司",
                            target: "2020-01-10",
                            fullName: "中大股份",
                            company: "中大股份",
                            legalPreson: '王五',
                            capital: "3500",
                            detail: "详情",
                        }
                    ];
                }
                if(curCookie.pageNumber === 3) {
                    len = 2;
                    result = [
                        {
                            type: "三板公司",
                            target: "2020-01-10",
                            fullName: "中大股份",
                            company: "中大股份",
                            legalPreson: '王五',
                            capital: "3500",
                            detail: "详情",
                        },
                        {
                            type: "三板公司",
                            target: "2020-01-10",
                            fullName: "中大股份",
                            company: "中大股份",
                            legalPreson: '王五',
                            capital: "3500",
                            detail: "详情",
                        }
                    ];
                }
                if(len > 0) {
                    curCookie.bodyData = result
                }
                // 更新翻页组件状态
                if(init) {
                    if(len > 0) {
                        curCookie.tableData = [].concat(result);
                        len === pageSize?curCookie.nextDisable = false:curCookie.nextDisable = true;
                    }else {
                        alert('暂无数据')
                    }
                }else if(len > 0) {
                    curCookie.tableData = curCookie.tableData.concat(result);
                    curCookie.pageCount++;
                }else {
                    curCookie.pageNumber--;
                }

                if(len < pageSize) {
                    curCookie.nextDisable = true;
                }
                if(curCookie.pageNumber > 1) {
                    curCookie.firstDisable = false;
                    curCookie.perDisable = false;
                }
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
            },
            pageChange(data) {
                let curCookies = this[data.refer];
                curCookies.pageNumber = data.value.pageNumber;
                curCookies.firstDisable = data.value.firstDisable;
                curCookies.perDisable = data.value.perDisable;
                curCookies.nextDisable = data.value.nextDisable;
                if(curCookies.pageNumber > curCookies.pageCount) {
                    this.setData();
                }else {
                    // 当页码数*页码大于总数据长度下一页置灰
                    if(curCookies.pageNumber*curCookies.pageSize > curCookies.tableData.length) {
                        curCookies.nextDisable = true;
                    }
                    let tempData = [].concat(curCookies.tableData);
                    curCookies.bodyData = tempData.splice((curCookies.pageNumber-1)*curCookies.pageSize, curCookies.pageSize)
                }
            },
        }
    }
</script>
