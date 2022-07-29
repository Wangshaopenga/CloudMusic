import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/Home/Main.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/components/Search/Search.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
    },
    {
        path: '/test2',
        name: 'test2',
        component: () => import('@/components/Singer.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/Test1.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;