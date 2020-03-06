<style lang="less">

</style>

<template>
    <div class="wrapper">
        <div>普通按钮</div>
        <base-button btnText="查询" :btnBg="true" @confirm="confirm"></base-button>
        <div>带icon按钮</div>
        <base-button btnText="下载" btnIcon="down" @confirm="confirm"></base-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            let that = this;
        },
        methods: {
            confirm() {
                console.log('按钮点击')
            }
        }
    }
</script>
