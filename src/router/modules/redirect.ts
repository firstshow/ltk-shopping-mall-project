import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/views/Redirect/index.vue'),
    meta: {
      title: '跳转页面'
    }
  }
]
export default routes
