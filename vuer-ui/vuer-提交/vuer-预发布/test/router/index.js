import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/test-button', name: 'test-button', component: () => import('test/views/test-button.vue') },
    // { path: '/test-dialog', name: 'test-dialog', component: () => import('@/views/test-dialog.vue') },
    // { path: '/test-switch', name: 'test-switch', component: () => import('@/views/test-switch.vue') },
    // { path: '/test-radio', name: 'test-radio', component: () => import('@/views/test-radio.vue') },
    // { path: '/test-checkbox', name: 'test-checkbox', component: () => import('@/views/test-checkbox.vue') },
    // { path: '/test-input', name: 'test-input', component: () => import('@/views/test-input.vue') },
    // { path: '/test-form', name: 'test-form', component: () => import('@/views/test-form.vue') },
    { path: '/test-progress-bar', name: 'test-progress-bar', component: () => import('test/views/test-progress-bar.vue') },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router