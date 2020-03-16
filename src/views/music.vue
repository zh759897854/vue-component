<style lang="less">
    #music {
        padding: 20px;
        .title {
            width: 100%;
            border-top: 2px solid @color-primary;
            padding-bottom: 5px;
            margin-top: 5px;
        }
    }
</style>

<template>
    <div id="music">
        <h2>
            <router-link :to="{name: 'home'}">Home --></router-link>
        </h2>
        <base-input :iptPlaceholder="'请输入内容'"
                    :iptValue="iptValue"
                    :iptReadonly="iptReadonly"
                    :iptError="iptError"
                    :errorInfo="'输入有误'"
                    :isRelated="isRelated"
                    :relateData="relateData"
                    @iptEvent="input">
        </base-input>
        <base-button btnText="获取音乐" :btnBg="true" @confirm="getDatas"></base-button>
        <div class="title"></div>
        <base-table :scrollX="false"
                    :titleData="musicCookie.titleData"
                    :bodyData="musicCookie.bodyData"
                    :trClass="musicCookie.trClass"
                    @tdClick="tdClick">
        </base-table>
        <base-page
            refer="musicCookie"
            :cookie="musicCookie"
            @pageChange="pageChange">
        </base-page>
    </div>
</template>

<script>

    export default {
        name: 'music',
        data() {
            return {
                iptValue: '',
                iptReadonly: false,
                iptError: false,
                isRelated: false,
                relateData : [],
                initQuery: null,
                musicCookie: {
                    pageNumber: 1,
                    pageSize: 30,
                    pageCount: 1,
                    firstDisable: true,
                    perDisable: true,
                    nextDisable: true,
                    requestMark: false,
                    trClass: [
                        {
                            index: 2,
                            className: 'companyName'
                        }
                    ],
                    titleData : [
                        {albumName: '专辑名称',},
                        {artistName: '歌手姓名'},
                        {songName: '音乐名称'},
                        {id: '音乐id'},
                    ],
                    bodyData : [],
                    tableData: []
                }
            }
        },
        methods: {
            getDatas() {
                this.getMusic(true);
            },
            tdClick(value) {
                let that = this;
                let data = '';
                if(value.index == 2) {
                    new this.DataServe({
                        method: 'get',
                        url: '/api/music/song/detail',
                        data: {
                            songId: value.value.id
                        },
                        success: function(res) {
                            data = res.data || {};
                            const downloadFileA = document.createElement('a');
                            document.body.append(downloadFileA);
                            downloadFileA.href= data.songLink;
                            downloadFileA.download = data.songName + '.'+ data.format;
                            downloadFileA.rel = 'noopener noreferrer';
                            downloadFileA.click();
                            document.body.removeChild(downloadFileA)
                        },
                        error: function(error) {},
                        always: function() {}
                    });
                }
            },
            getMusic(init) {
                let that = this;
                let curCookie = this.musicCookie;
                let pageSize = curCookie.pageSize;
                if(curCookie.requestMark) {
                    console.error('数据正在请求');
                    return false
                }
                if(init) {
                    curCookie.pageNumber = 1;
                    curCookie.pageCount = 1;
                    curCookie.firstDisable= true;
                    curCookie.perDisable= true;
                    curCookie.nextDisable= true;
                }
                curCookie.requestMark = true;
                new this.DataServe({
                    method: 'get',
                    url: '/api/music/song/search',
                    data: {
                        keyWord: that.iptValue,
                        page: curCookie.pageNumber
                    },
                    success: function(res) {
                        let data = [];
                        data = res.data || {};
                        data = data.list || [];

                        let len = data.length;
                        // 更新翻页组件状态
                        if(init) {
                            curCookie.tableData = [];
                            curCookie.bodyData = [];
                            if(len > 0) {
                                curCookie.tableData = [].concat(data);
                                len === pageSize?curCookie.nextDisable = false:curCookie.nextDisable = true;
                            }else {
                                alert('暂无数据')
                            }
                        }else if(len > 0) {
                            curCookie.tableData = curCookie.tableData.concat(data);
                            curCookie.pageCount++;
                        }else {
                            curCookie.pageNumber--;
                        }

                        if(len > 0) {
                            curCookie.bodyData = data;
                        }

                        if(len < pageSize) {
                            curCookie.nextDisable = true;
                        }
                        if(curCookie.pageNumber > 1) {
                            curCookie.firstDisable = false;
                            curCookie.perDisable = false;
                        }
                    },
                    error: function(error) {},
                    always: function() {
                        curCookie.requestMark = false;
                    }
                });
            },
            pageChange(data) {
                let curCookies = this[data.refer];
                curCookies.pageNumber = data.value.pageNumber;
                curCookies.firstDisable = data.value.firstDisable;
                curCookies.perDisable = data.value.perDisable;
                curCookies.nextDisable = data.value.nextDisable;
                if(curCookies.pageNumber > curCookies.pageCount) {
                    this.getMusic();
                }else {
                    // 当前不是新请求时 当页码数*页码大于总数据长度下一页置灰
                    if(curCookies.pageNumber*curCookies.pageSize > curCookies.tableData.length) {
                        curCookies.nextDisable = true;
                    }
                    let tempData = [].concat(curCookies.tableData);
                    curCookies.bodyData = tempData.splice((curCookies.pageNumber-1)*curCookies.pageSize, curCookies.pageSize)
                }
            },
            input(value) {
                this.iptValue = value;
            }
        }
    }
</script>
