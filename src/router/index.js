import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/index'
import baseButton from '@/views/button'
import baseCheckBox from '@/views/checkBox'
import datePicker from '@/views/datePicker'
import baseInput from '@/views/input'
import baseSelect from '@/views/select'
import baseTable from '@/views/table'

import Home from '@/views/Home'
import Music from '@/views/music'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        redirect: 'baseButton',
        children:[
            {
                path: 'baseButton',
                name: 'baseButton',
                component: baseButton
            },
            {
                path: 'baseCheckBox',
                name: 'baseCheckBox',
                component: baseCheckBox
            },
            {
                path: 'datePicker',
                name: 'datePicker',
                component: datePicker
            },
            {
                path: 'baseInput',
                name: 'baseInput',
                component: baseInput
            },
            {
                path: 'baseSelect',
                name: 'baseSelect',
                component: baseSelect
            },
            {
                path: 'baseTable',
                name: 'baseTable',
                component: baseTable
            },
        ]
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/music',
        name: 'music',
        component: Music,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
