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
        path: '/test',
        name: 'test',
        component: () => import('@/components/Home/Player.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;