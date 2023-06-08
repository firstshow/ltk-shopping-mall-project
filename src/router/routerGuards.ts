import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

export function createRouterGuards(router: Router, whiteNameList: string[]) {
  router.beforeEach(async (_to, _from, next) => {
    if (_to.query.token) {
      const userStore = useUserStore()
      userStore.setUserInfo({
        accessToken: _to.query.token as string
      })
    }

    // 如果有传toPage，那就直接跳转到toPage，并且把keyword传过去
    if (_to.query.toPage) {
      return next({
        name: _to.query.toPage as string,
        query: {
          keyword: _to.query.keyword
        }
      })
    }

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
