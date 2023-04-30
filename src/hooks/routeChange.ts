import router from '@/router'
import type { LocationQueryRaw } from 'vue-router'
// import store from '@/stores'
// export const defaultRoutePath = '/store/storeManage/storeManageList'

/**
 * @function 公共的router跳转方法
 * @param routeName 跳转的name
 * @param param 参数
 */
export function routeChange(routeName: string, param?: LocationQueryRaw): void {
  router.push({
    name: routeName,
    query: param
  })
}

/**
 * @function 公共的router替换跳转方法
 * @param routeName 跳转的name
 * @param param 参数
 */
export function routeReplaceChange(routeName: string, param?: LocationQueryRaw): void {
  router.replace({
    name: routeName,
    query: param
  })
}

/**
 * @function 回到之前的页面
 * @param step 返回步数
 */
export function routeGoBack(step = -1): void {
  router.go(step)
}
