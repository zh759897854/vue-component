<template>
    <div class="home">
        <h1>HOME页</h1>
        <h2>
            <router-link :to="{name: 'music'}">music排行榜</router-link>
        </h2>
        <router-link :to="{name: 'index'}">INDEX</router-link>
        <base-button btnText="获取数据" :btnBg="true" @confirm="getJYdata"></base-button>
        <base-button btnText="生成二维码" :btnBg="true" @confirm="creatEr"></base-button>
        <img class="qrCode" :src="imgSrc" alt="">
        <div>
            <div class="wrapper" v-for="(item, index) in data">
                <span class="data-content">{{item.content}}</span>
                <span class="data-date">时间：{{item.updateTime}}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .home {
        padding: 10px;
        .wrapper {
            padding: 10px;
            color: #333;
            border: 1px solid @btn-bg-color;
            border-radius: @btn-border-radius;
            margin-top: 5px;
            span {
                display: inline-block;
            }
            .data-date {
                margin-top: 10px;
                width: 100%;
                text-align: right;
                color: #6666;
            }
        }
        .qrCode {
            width: 100px;
        }
    }
</style>
<script>
    export default {
        name: 'home',
        components: {},
        data() {
            return {
                data: [],
                imgSrc: ''
            }
        },
        mounted() {

        },
        methods: {
            getJYdata() {
                let that = this;
                this.$Axios.get({
                    url: '/api/jokes/list?page=1',
                    params: {}
                }).then((res)=>{
                    that.data = res.data.list || [];
                }).catch((err)=>{
                    console.log(err)
                })
            },
            creatEr() {
                let that = this;
                let data = '';
                this.$Axios.post({
                    url: '/api/qrcode/create/single?content=猫咪&size=600&type=0',
                    params: {}
                }).then((res)=>{
                    data = res.data || {};
                    that.imgSrc = data.qrCodeUrl
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>
