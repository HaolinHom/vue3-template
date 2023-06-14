# vue3-template (Vue3 项目模板)

## 模板说明

本项目是一个基于 Vue3 + Vite3.4 的项目模板，提供了快速、高效的开发体验。

主要技术栈：`typescript` + `vue3` + `vue-router` + `pinia` + `axios` + `dayjs` + `less`

### 项目结构

```
├─ public // 项目公共资源
├─ src
│  ├─ api // api接口
│  ├─ components
│  │  ├─ ... // 组件
│  │  ├─ styles // 公共样式
│  │  └─ utils // 组件工具(toast等)
│  ├─ constants
│  │  ├─ date.ts // 日期格式
│  │  └─ env.ts // 环境变量
│  ├─ layouts // 布局
│  ├─ views // 页面
│  ├─ router // 路由
│  ├─ store // 状态管理
│  │  └─ main // 顶级状态
│  ├─ utils // 公共工具、方法
|  │  └─ request // 基于axios封装的请求方法
│  ├─ App.vue // 视图入口文件
│  ├─ auto-imports-comps.d.ts // 组件(自动引入)类型定义
│  ├─ auto-imports-deps.d.ts // 依赖(自动引入)类型定义
│  ├─ axios.d.ts // axios类型定义
│  ├─ env.d.ts // env类型定义
│  └─ main.ts // 入口文件
├─ .editorconfig
├─ .env // 环境变量(所有环境均会生效)
├─ .env.development
├─ .env.pre
├─ .env.production
├─ .env.test
├─ .eslintrc
├─ .gitattributes
├─ .gitignore
├─ .prettierrc
├─ commitlint.config.js
├─ index.html
├─ openapi.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ README.md
├─ tsconfig.json
└─ vite.config.ts
```

### 项目贴士

项目内存在着以 <b>TIPS</b> 开头的注释，在通过模板创建项目后，建议先全局搜索该关键词后，按照提示进行对应的代码修改。

## 功能

### JSX

默认支持`jsx`及`tsx`。

### 依赖、组件自动引入

基于 Vite 的插件 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#unplugin-auto-import) 与 [unplugin-auto-import](https://github.com/antfu/unplugin-vue-components#unplugin-vue-components)，为项目提供了依赖与组件的自动引入能力。

without

```vue
<template>
  <Button>按钮</Button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from '@/src/components/Button';

const count = ref(0);
</script>
```

with

```vue
<template>
  <Button>按钮</Button>
</template>

<script lang="ts" setup>
const count = ref(0);
</script>
```

默认开启了下表内的依赖及组件自动引入，后续可根据项目需要自行在 vite.config.ts 内进行配置。

| 依赖       | 组件           |
| ---------- | -------------- |
| vue        | scr/components |
| vue-router | scr/layouts    |
| pinia      |                |

除此之外，还支持第三方组件库的自动引入，详见 [从 UI 库导入](https://github.com/antfu/unplugin-vue-components#importing-from-ui-libraries)。

### 环境变量

项目内的环境变量都挂载在 <b>import.meta.env</b> 上，其中包括 Vite 内建的变量，也包括 .env 文件内配置的变量。更多详细内容可以参考 [环境变量和模式 | Vite 官方中文文档](https://cn.vitejs.dev/guide/env-and-mode.html#env-files) 。

关于 .env 文件 的使用，有 3 点需要注意的：

1. 所有变量均需带有 <b>APP\_</b> 前缀，否则配置不会生效
2. .env 文件优加载机制参见下表。当多个文件出现同名变量时，靠下面的文件会覆盖靠上面的文件:

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

3. 在 .env 文件配置完变量后，需要在 `src/constants/env.ts` 声明该变量，同时也需要在 `src/shims-env.d.ts` 内声明该变量的定义。

### OpenAPI

首次使用时需打开根目录下 openapi.config.js 文件，并按下方提示进行配置。

```javascript
const swaggerConfig = [
  {
    // TIPS: 在此处添加需要的接口
    schemaPath: '',
    projectName: 'swagger',
    // TIPS: 在此处添加需要的Controller
    include: [],
  },
];
```

### 项目质量

开发时会通过 Vite 插件在浏览器上显示类型错误信息。

代码提交时，会利用 `husky` + `eslint` + `prettier` + `commitlint` 规范代码格式及 commit message 格式。

### bundle 分析

在进行 dev 环境代码构建时，会在项目根目录下生成 `bundle-analyzer.html` 文件，直接在浏览器内打开即可。

## 开发规范

### 单文件组件 script setup

统一使用 script setup 写法，详见 [文档](https://cn.vuejs.org/api/sfc-script-setup.html#script-setup)。

```vue
<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts" setup>
const title = ref('页面标题');
</script>
```

### 组件名格式

[按照 vue 官方推荐的 PascalCase 作为组件名的注册格式](https://cn.vuejs.org/guide/components/registration.html#component-name-casing)。

示例:

1. 目录组件：src/components/<b>UrButton</b>/index.vue
2. 单文件组件：src/pages/Index/components/<b>Banner</b>.vue

```vue
<template>
  <Banner></Banner>

  <UrButton>我是按钮</UrButton>
</template>

<script lang="ts" setup>
import Banner from './components/Banner.vue';
</script>
```

---

## 项目要求

- nodejs 版本必须高于 14.18.0
- 包管理器统一使用 [pnpm](https://pnpm.io/zh/)
- 编辑器必须开启 eslint 检验
- 必须使用 git hooks
- 建议统一使用 Visual Studio Code 进行开发

## 使用说明

### 开发

```shell
# 开发(dev)环境
pnpm dev

# 测试(test)环境开发
pnpm dev:test

# 预发布(pre)环境开发
pnpm dev:pre
```

### 构建

```shell
# 开发(dev)环境
# 构建时会生成 bundle-analyzer
pnpm build:dev

# 测试(test)环境开发
pnpm build:test

# 预发布(pre)环境开发
pnpm build:pre

# 生产(prod)环境开发
pnpm build
```

### 更新 Swagger API

```shell
pnpm api

# 注意：
# 为减少项目源码体积，需在`openapi.config.js`内添加对应接口的 Controller
```
