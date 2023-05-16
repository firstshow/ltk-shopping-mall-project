import App from './App.vue'
import { setupAssets } from '@/plugins'
import { setupStore } from '@/stores'
import { setupRouter } from './router'
import { Lazyload } from 'vant'

const app = createApp(App)

app.use(Lazyload)

function setupPlugins() {
  // 引入静态资源
  setupAssets()
}

function setupApp() {
  // 挂载路由
  setupRouter(app)
  // 挂载vuex状态管理
  setupStore(app)

  app.mount('#app')
}

setupPlugins()

setupApp()
