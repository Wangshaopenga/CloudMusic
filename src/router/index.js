import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            app: () => import('@/views/Home.vue'),
        },
        children: [
            {
                path: '',
                name: 'main',
                components: { content: () => import('../components/Home/Main.vue') }
            },
            {
                path: 'search',
                name: 'search',
                components: { content: () => import('@/components/Search/Search.vue') }
            },
        ]
    },
    {
        path: '/about',
        name: 'about',
        components: { app: () => import('@/views/About.vue') }
    },
    {
        path: '/test',
        name: 'test',
        components: { app: () => import('@/components/Home/Main.vue') }
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;