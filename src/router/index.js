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
            }
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
        components: { app: () => import('@/components/Home/Player.vue') }
    },
    {
        path: '/header',
        name: 'header',
        components: { app: () => import('@/components/Home/Header.vue') }
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;