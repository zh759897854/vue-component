import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import pageA from '@/views/pageA.vue'
import pageB from '@/views/pageB.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children:[
            {
                path: '/',
                name: 'pageA',
                component: pageA
            },
            {
                path: '/pageB',
                name: 'pageB',
                component: pageB
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
