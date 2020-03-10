<template>
    <div class="home">
        <h1>HOME页</h1>
        <router-link :to="{name: 'index'}">INDEX</router-link>
        <base-button btnText="获取数据" :btnBg="true" @confirm="getJYdata"></base-button>
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
    }
</style>
<script>
    export default {
        name: 'home',
        components: {},
        data() {
            return {
                data: [],
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
            }
        }
    }
</script>
