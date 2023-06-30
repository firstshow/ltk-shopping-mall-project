import type { RouteRecordRaw } from 'vue-router'
import home from './home'
import my from './my'
import redirect from './redirect'

const routes: Array<RouteRecordRaw> = [...home, ...my, ...redirect]

export default routes
