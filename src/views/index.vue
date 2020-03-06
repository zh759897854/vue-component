<style lang="less">
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #333 !important;
        text-decoration: none !important;
    }
    a:link:hover {
        text-decoration: none !important;
    }
    .index {
        padding: 20px;
        .cards {
            padding-bottom: 50px;
            span {
                display: inline-block;
                width: 80px;
                height: 30px;
                font-size: 14px;
                line-height: 30px;
                text-align: center;
                border: 1px solid @color-primary;
                border-radius: @btn-border-radius;
                margin-right: 15px;
                color: #333;
                cursor: pointer;
            }
            .active {
                background: @color-primary;
                a {
                    color: #fff !important;
                }
            }
        }
    }
</style>

<template>
    <div class="index">
        <h1>vue 组件</h1>
        <div class="component-wrapper">
            <div class="cards">
                <span :class="{'active': active===index}" v-for="(item, index) in cards" :key="index" @click="cardsActive(index)">
                    <router-link :to="item.path">{{item.name}}</router-link>
                </span>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cards: [
                    {
                        name: '按钮',
                        path: '/'
                    },
                    {
                        name: '复选框',
                        path: '/baseCheckBox'
                    },{
                        name: '时间筛选',
                        path: '/datePicker'
                    },{
                        name: 'input输入框',
                        path: '/baseInput'
                    },{
                        name: '下拉筛选',
                        path: '/baseSelect'
                    },{
                        name: 'table表格',
                        path: '/baseTable'
                    }
                ],
                active: 0
            }
        },
        methods: {
            cardsActive(index) {
                index = index || 0;
                this.active = index;
            }
        }
    }
</script>
