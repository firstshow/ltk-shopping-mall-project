import App from './App.vue'
import { setupRouter } from './router'
import { setupAssets } from '@/plugins'
import { setupStore } from '@/stores'
import { Lazyload } from 'vant'

const app = createApp(App)

app.use(Lazyload)

function setupPlugins() {
  // 引入静态资源
  setupAssets()
}

function setupApp() {
  // 挂载vuex状态管理
  setupStore(app)
  // 挂载路由
  setupRouter(app)

  app.mount('#app')
}

setupPlugins()

setupApp()
