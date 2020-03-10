<template>
    <div id="music">
        <base-input :iptPlaceholder="'请输入内容'"
                    :iptValue="iptValue"
                    :iptReadonly="iptReadonly"
                    :iptError="iptError"
                    :errorInfo="'输入有误'"
                    :isRelated="isRelated"
                    :relateData="relateData"
                    @iptEvent="input">
        </base-input>
        <base-button btnText="获取音乐" :btnBg="true" @confirm="getMusic"></base-button>
        <div class="title"></div>
        <base-table :scrollX="false"
                    :titleData="titleData"
                    :bodyData="bodyData"
                    :trClass="trClass"
                    @tdClick="tdClick">
        </base-table>
    </div>
</template>

<style lang="less">
    #music {
        padding: 20px;
        text-align: center;
        .title {
            width: 100%;
            border-top: 2px solid @color-primary;
            padding-bottom: 5px;
            margin-top: 5px;
        }
    }
</style>

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
            }
        },
        methods: {
            tdClick(value) {
                let that = this;
                let data = '';
                if(value.index == 2) {
                    this.$Axios.get({
                        url: '/api/music/song/detail',
                        params: {
                            songId: value.value.id
                        }
                    }).then((res)=>{
                        data = res.data || {};
                        const downloadFileA = document.createElement('a');
                        document.body.append(downloadFileA);
                        downloadFileA.href= data.songLink;
                        downloadFileA.download = data.songName + '.'+ data.format;
                        downloadFileA.rel = 'noopener noreferrer';
                        downloadFileA.click();
                        document.body.removeChild(downloadFileA)
                    }).catch((err)=>{
                        console.log(err)
                    });
                }
            },
            getMusic() {
                let that = this;
                let data = '';
                this.$Axios.get({
                    url: '/api/music/song/search',
                    params: {
                        keyWord: that.iptValue,
                        page: 1
                    }
                }).then((res)=>{
                    data = res.data || {};
                    data = data.list || [];
                    that.bodyData = [].concat(data)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            input(value) {
                this.iptValue = value;
            }
        }
    }
</script>
