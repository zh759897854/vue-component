<style lang="less">
    #page {
        height: 50px;
        .page-wrapper {
            width: 210px;
            height: 30px;
            float: right;
            margin-top: 10px;
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
                a:hover {
                    color: @color-primary;
                }
                .disabled {
                    border-color: @btn-border-color;
                    background: @btn-disable-bg;
                    color: @color-999;
                    cursor: not-allowed;
                    background: #eee;
                }
                .disabled:hover {
                    color: @color-999;
                }
            }
        }
    }
</style>

<template>
    <div id="page">
        <ul class="page-wrapper">
            <li>
                <a class="first-page" :class="{'disabled': cookie.firstDisable}" @click="firstPage">首页</a>
            </li>
            <li>
                <a class="pre-page" :class="{'disabled': cookie.perDisable}" @click="perPage">上一页</a>
            </li>
            <li>
                <a class="next-page" :class="{'disabled': cookie.nextDisable}" @click="nextPage">下一页</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstDisable: null,
                perDisable: null,
                nextDisable: null,
                pageNumber: 1,
                referCookie: {}
            }
        },
        watch: {
            // props内部属性值 deep参数
            cookie: {
                handler(newVal, oldVal) {
                    let curCookie = this.cookie;
                    this.pageNumber = curCookie.pageNumber;
                },
                deep: true
            }
        },
        mounted() {
            let curCookie = this.cookie;
            this.pageNumber = curCookie.pageNumber;
        },
        props: {
            cookie: {
                type: Object,
                default: function() {
                    return {
                        pageNumber: 1,
                        firstDisable: true,
                        perDisable: true,
                        nextDisable: true,
                    }
                }
            },
            refer: {
                type: String,
                default: function() {
                    return ''
                }
            }
        },
        methods: {
            firstPage() {
                if(!this.cookie.firstDisable && !this.cookie.requestMark) {
                    // 点击首页 首页、上一页置灰  下一页可点击
                    this.pageNumber = 1;
                    this.firstDisable = true;
                    this.perDisable = true;
                    this.nextDisable = false;
                    this.$emit('pageChange', this.setCookie());
                }
            },
            perPage() {
                if(!this.cookie.perDisable && !this.cookie.requestMark) {
                    this.pageNumber--;
                    if(this.pageNumber === 1) {
                        // 点击上一页 页码为1  首页、上一页置灰  下一页可点击
                        this.firstDisable = true;
                        this.perDisable = true;
                        this.nextDisable = false;
                    }else {
                        // 点击上一页 首页、上一页、下一页可点击
                        this.firstDisable = false;
                        this.perDisable = false;
                        this.nextDisable = false;
                    }
                    this.$emit('pageChange', this.setCookie());
                }
            },
            nextPage() {
                if(!this.cookie.nextDisable && !this.cookie.requestMark) {
                    // 点击下一页 首页、上一页都可点击
                    this.firstDisable = false;
                    this.perDisable = false;
                    this.pageNumber++;
                    this.$emit('pageChange', this.setCookie());
                }
            },
            setCookie() {
                let result = null;
                this.referCookie = {
                    refer: this.refer,
                    value: {
                        pageNumber: this.pageNumber,
                        firstDisable : this.firstDisable,
                        perDisable : this.perDisable,
                        nextDisable : this.nextDisable
                    }
                };
                result = Object.assign(this.referCookie);
                return result
            }
        }
    }
</script>
