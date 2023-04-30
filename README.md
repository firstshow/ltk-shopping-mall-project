# vue3-mobile-cli-new

xxxx

## vscode 安装插件

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## vite 配置

See [Vite Configuration Reference](https://vitejs.dev/config/).

## 安装依赖

```sh
npm install
```

### 开发模式

```sh
# 运行测试环境
npm run dev
```

### 环境变量

目前只有正式和测试环境，相关配置详细请看

.env.production
.env.beta
.env.development

### 打包

```sh
# 打包正式环境
npm run build
# 不进行ts类型检查检查，打包环境用的这种
npm run build-only

# 打包测试环境
npm run build:dev
# 不进行ts类型检查检查，打包环境用的这种
npm run build-only:dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
