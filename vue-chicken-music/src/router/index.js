import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: () => import('@/views/recommend/recommend'),
        children: [
            {
                path: ':id',
                component: () => import('@/views/disc/disc')
            }
        ]
    },
    {
        path: '/singer',
        component: () => import('@/views/singer/singer'),
        children: [
            {
                path: ':id',
                component: () => import('@/views/singerDetail/singerDetail')
            }
        ]
    },
    {
        path: '/rank',
        component: () => import('@/views/rank/rank'),
        children: [
            {
                path: ':id',
                component: () => import('@/views/topList/topList')
            }
        ]
    },
    {
        path: '/search',
        component: () => import('@/views/search/search'),
        children: [
            {
                path: ':id',
                component: () => import('@/views/singerDetail/singerDetail')
            }
        ]
    },
    {
        path: '/user',
        component: () => import('@/views/userCenter/userCenter')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
