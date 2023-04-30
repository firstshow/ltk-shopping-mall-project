import type { Router } from 'vue-router'

export function createRouterGuards(router: Router, whiteNameList: string[]) {
  router.beforeEach(async (_to, _from, next) => {
    next()
  })

  router.afterEach((_to) => {
    console.log(whiteNameList, 'whiteNameList')
    // if (!whiteNameList.includes(to.name as string)) {
    //   window.ap.setNavigationBar({ title: to.meta.title, reset: true })
    // }
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
