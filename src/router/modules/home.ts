import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home/search',
    name: 'search',
    component: () => import('@/views/Home/Search/index.vue'),
    meta: {
      title: '搜索页'
    }
  }
]
export default routes
