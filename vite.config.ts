import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import {
  loadEnv,
  splitVendorChunkPlugin,
  type ConfigEnv,
  type UserConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { viteVConsole } from 'vite-plugin-vconsole'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const CWD = process.cwd()
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_DROP_CONSOLE, VITE_BASE_API } = loadEnv(mode, CWD)

  return {
    build: {
      target: 'es2015'
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/styles/variables.less";`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS({
        scan: {  
          dirs: ['./src'], // 当前目录下所有文件  
          fileExtensions: ['vue', 'js', 'ts'], // 同时启用扫描vue/js/ts 
        } 
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        // 自定义组件全局挂载，默认是src/components
        dirs: ['src/components/global'],
        // ui库解析器
        resolvers: [
          VantResolver()
        ],
      }),
      DefineOptions(),
      createSvgIconsPlugin({
        iconDirs: [resolve(CWD, 'src/assets/icons')],
        symbolId: 'svg-icon-[name]'
      }),
      splitVendorChunkPlugin(),
      // VConsole 调试工具配置，若没有此配置，则调试工具控制台不会打印日志
      viteVConsole({
        entry: path.resolve('src/main.ts'), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.ts')]
        localEnabled: true, // 本地是否启用
        enabled: VITE_DROP_CONSOLE === 'false' // 是否启用
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    }
  }
}
