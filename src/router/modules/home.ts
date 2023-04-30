import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页'
    }
  }
]
export default routes
