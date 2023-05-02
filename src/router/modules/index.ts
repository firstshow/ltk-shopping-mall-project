import type { RouteRecordRaw } from 'vue-router'
import home from './home'
import my from './my'

const routes: Array<RouteRecordRaw> = [...home, ...my]

export default routes
