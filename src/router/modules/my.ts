import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My/index.vue'),
    meta: {
      title: '我的'
    }
  }
]
export default routes
