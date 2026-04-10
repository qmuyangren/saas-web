# 项目框架文档

## 1. 项目概述

本项目是一个 SaaS 平台的后台管理系统前端项目，采用 Vue 3 + TypeScript + Vite 技术栈构建。

| 属性 | 值 |
|------|------|
| 项目名称 | web |
| 项目类型 | SaaS 后台管理前端 |
| 版本 | 0.0.0 |
| 包管理器 | npm |
| 模块系统 | ESM (ES Modules) |

---

## 2. 技术栈

### 2.1 核心框架

| 模块 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| 前端框架 | Vue 3 | ^3.5.30 | 使用 Composition API + `<script setup>` |
| 构建工具 | Vite | ^8.0.1 | 快速开发服务器和构建 |
| 语言 | TypeScript | ~5.9.3 | 严格类型检查 |
| 路由 | Vue Router | ^5.0.4 | 客户端路由管理 |
| 状态管理 | Pinia | ^3.0.4 | 轻量级状态管理 |

### 2.2 UI 组件库

| 模块 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| 组件库 | Ant Design Vue | ^4.2.6 | 企业级 UI 组件 |
| 图标 | @ant-design/icons-vue | ^7.0.1 | Ant Design 图标集 |
| CSS 工具类 | UnoCSS | - | 原子化 CSS 框架 |

### 2.3 工具库

| 模块 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| HTTP 客户端 | Axios | ^1.14.0 | API 请求封装 |
| CSS 预处理器 | Less | ^4.6.4 | Ant Design 主题定制 |

### 2.4 测试工具

| 模块 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| 测试框架 | Vitest | ^4.1.2 | 单元测试 |
| 组件测试 | @vue/test-utils | ^2.4.6 | Vue 组件测试 |
| DOM 模拟 | jsdom | ^29.0.1 | 浏览器环境模拟 |
| Pinia 测试 | @pinia/testing | ^1.0.3 | 状态管理测试 |

---

## 3. 项目结构

```
web/
├── .env                    # 环境变量配置
├── .env.example            # 环境变量示例
├── .gitignore              # Git 忽略规则
├── package.json            # 项目依赖和脚本
├── package-lock.json       # 依赖锁定文件
├── vite.config.ts          # Vite 构建配置
├── uno.config.ts           # UnoCSS 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # 应用 TypeScript 配置
├── tsconfig.node.json      # Node TypeScript 配置
├── index.html              # HTML 入口文件
├── README.md               # 项目说明
│
├── openspec/               # 项目规范文档
│   ├── base/               # 基础规范
│   │   ├── project.md      # 技术规范和编码规范
│   │   ├── api-style.md    # API 设计规范
│   │   └── development-boundary.md  # 开发边界规范
│   ├── changes/            # 变更记录
│   │   ├── 001-user-login/ # 用户登录模块
│   │   ├── 002-user-register/ # 用户注册模块
│   │   ├── 003-password-reset/ # 密码重置模块
│   │   ├── 004-ui-theme/   # UI 主题模块
│   │   ├── 005-enterprise-mgmt/ # 企业管理模块
│   │   ├── 006-dict-mgt/   # 字典管理模块
│   │   └── 007-auth-module/ # 认证模块
│   └── TEAM_GUIDE.md       # 团队指南
│
├── public/                 # 静态资源
├── dist/                   # 构建输出目录
├── flags/                  # 功能标志
│
└── src/                    # 源代码目录
    ├── main.ts             # 应用入口文件
    ├── App.vue             # 根组件
    ├── env.d.ts            # 类型声明文件
    ├── router/             # 路由配置
    │   └── index.ts        # 路由定义
    ├── views/              # 页面视图
    │   ├── dashboard/      # 仪表盘页面
    │   │   └── index.vue
    │   ├── login/          # 登录页面
    │   │   └── index.vue
    │   ├── user/           # 用户管理页面
    │   │   └── index.vue
    │   ├── error/          # 错误页面
    │   │   └── 404.vue
    │   └── 404/            # 404 页面 (备用)
    │       └── Index.vue
    └── styles/             # 样式文件目录 (待创建)
```

---

## 4. 核心配置

### 4.1 Vite 配置 (`vite.config.ts`)

| 配置项 | 值 | 说明 |
|--------|------|------|
| 开发端口 | 3000 | 本地开发服务器端口 |
| 主机绑定 | true | 允许外部访问 |
| API 代理 | `/api` → `localhost:8080` | 后端 API 代理 |
| 路径别名 | `@` → `./src` | 简化导入路径 |
| 构建目标 | ES2015 | 浏览器兼容性 |
| 输出目录 | `dist/` | 构建产物位置 |
| Source Map | 开发环境启用 | 调试支持 |

### 4.2 UnoCSS 配置 (`uno.config.ts`)

| 配置项 | 说明 |
|--------|------|
| Presets | Uno、Attributify、Icons、Typography、WebFonts |
| 主题色 | primary (#1890ff)、success、warning、error、info |
| 字体 | Inter (sans-serif)、Fira Code (mono) |
| 快捷方式 | btn、card、flex-center 等常用类组合 |
| 自定义规则 | 动画、间距、字体大小 |

### 4.3 TypeScript 配置

| 配置文件 | 用途 |
|----------|------|
| `tsconfig.json` | 根配置，引用其他配置 |
| `tsconfig.app.json` | 应用代码类型检查 |
| `tsconfig.node.json` | Node/Vite 配置类型检查 |

---

## 5. 路由结构

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/` | - | 重定向到 `/dashboard` | 默认首页 |
| `/dashboard` | Dashboard | `@/views/dashboard/index.vue` | 仪表盘 |
| `/login` | Login | `@/views/login/index.vue` | 登录页 |
| `/users` | Users | `@/views/user/index.vue` | 用户管理 |
| `/404` | NotFound | `@/views/error/404.vue` | 404 页面 |
| `/:pathMatch(.*)*` | - | 重定向到 `/404` | 通配符路由 |

---

## 6. API 规范

### 6.1 基础信息

| 属性 | 值 |
|------|------|
| 基础路径 | `/api/v1` |
| 认证方式 | Bearer Token (JWT) |
| 请求头 | `Authorization: Bearer <JWT_TOKEN>` |

### 6.2 响应格式

```typescript
interface ApiResponse<T> {
  code: number;      // 0=成功，其他=错误码
  data: T;           // 业务数据
  message: string;   // 提示信息
}
```

### 6.3 错误码规范

| 范围 | 类型 | 示例 |
|------|------|------|
| 0 | 成功 | `{"code": 0, "message": "success"}` |
| 1001-1999 | 客户端错误 | 1001=参数错误，1002=认证失败 |
| 2001-2999 | 服务端错误 | 2001=数据库错误，2002=缓存错误 |
| 3001-3999 | 业务错误 | 3001=用户不存在，3002=密码错误 |

---

## 7. 开发规范

### 7.1 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件名 | kebab-case | `user-login.vue` |
| 类/组件 | PascalCase | `UserLogin` |
| 函数/变量 | camelCase | `getUserInfo` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |

### 7.2 编码规范

- Vue 3 使用 Composition API
- 使用 TypeScript 严格模式
- 组件遵循单一职责原则
- 使用 `<script setup>` 语法

### 7.3 开发边界

| 规则 | 说明 |
|------|------|
| 只创建新模块 | 不改动已有模块 |
| 只创建新页面 | 不改动已有页面 |
| 只添加新文件 | 不删除已有文件 |
| 修改已有文件 | 需在 task 中明确说明 |

---

## 8. 端口规划

| 服务 | 技术 | 端口 | 测试地址 |
|------|------|------|----------|
| 后端 | NestJS | 8081 | http://localhost:8081 |
| 前端 | Vue3 | 3100 | http://localhost:3100 |
| 移动端 | uni-app H5 | 3200 | http://localhost:3200 |

---

## 9. NPM 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run test` | 运行测试 |

---

## 10. 功能模块状态

| 模块 | 状态 | 说明 |
|------|------|------|
| 001-user-login | ✅ 已完成 | 用户登录功能 |
| 002-user-register | ✅ 已完成 | 用户注册功能 |
| 003-password-reset | ✅ 已完成 | 密码重置功能 |
| 004-ui-theme | ✅ 已完成 | UI 主题定制 |
| 005-enterprise-mgmt | 🔄 框架已完成 | 企业管理模块 |
| 006-dict-mgt | 🔄 进行中 | 字典管理模块 |
| 007-auth-module | 🔄 进行中 | 认证模块 |

---

## 11. 待完善项

| 项目 | 状态 | 说明 |
|------|------|------|
| `src/styles/` | 空目录 | 需创建样式文件 |
| `src/stores/` | 缺失 | main.ts 引用但未创建 |
| `src/assets/` | 缺失 | main.ts 引用但未创建 |
| `src/utils/` | 缺失 | 工具函数目录 |
| `src/api/` | 缺失 | API 请求封装 |
| `src/components/` | 缺失 | 公共组件目录 |
| `src/types/` | 缺失 | 类型定义目录 |
| `src/composables/` | 缺失 | 组合式函数目录 |

---

_文档生成时间：2026-04-02_
_最后更新：2026-04-02_
