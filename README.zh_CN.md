<div align="center">
    <img width="100" src="https://unpkg.com/arco-static@0.0.3/source/logo.png" alt="LOGO" />
</div>

<div align="center">
    <a href="https://www.oscs1024.com/project/oscs/LLiuHuan/arco-design-pro-vue?ref=badge_small" alt="OSCS Status"><img src="https://www.oscs1024.com/platform/badge/LLiuHuan/arco-design-pro-vue.svg?size=small"/></a>
    <a href="https://github.com/LLiuHuan/qin-admin"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
    <a href="https://github.com/LLiuHuan/qin-admin/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
</div>

<div align="center">
    <span><a href="./README.md">English</a> | 中文</span>
</div>

---

> 前端菜鸟，也没啥时间，随便写写，对付看吧，喜欢的话可以点个 Start

> 预计24年内全部完善，最少最少最少开发一套前端+一套后端

> 鉴于时间方面的限制，经过全面考量与分析，本项目决定对基础架构做出调整，选用 vue-vben-admin 作为基础架构。重构过程中，会全面采用当下最新的技术，确保项目在功能实现、性能优化以及技术架构上都能紧跟行业前沿，以满足项目在不同场景下的多样化需求，同时提升项目的整体质量与可维护性。

## 1. 基本介绍

### 1.1 项目介绍

> 原本是打算实现 arco-design-pro 的vue版本，但是看官方说21年12月份就会推出vue版本的，所以这个项目就不会完全照搬arco-design-pro 了  
> 预想开发一个可以在生产环境使用的中后台前端项目，并且会开发多个后端供大家选择

- 旧版本
  - [在线预览](http://arco_legacy.0x3.cn/)  
    （请使用 Chrome 打开）
  - [Github 地址](https://github.com/LLiuHuan/qin-admin/tree/legacy)
- 新版本
  - [在线预览](http://demo.0x3.cn/)
  - [文档地址] 开发中

### 1.2 有什么好的想法和思路可以提Issues

## 2. 使用说明

### 2.1 开发

```
# 克隆项目
git clone https://github.com/LLiuHuan/qin-admin.git

# 进入项目目录
cd arco-design-pro-vue

# pnpm

# 安装依赖
pnpm install

# 启动服务
pnpm dev
```

## 3. 项目截图

还没弄，等功能完善了再弄

## 4. 后端

还没开始弄，准备弄多个后端，供大家选择

主要还是看时间吧，哈哈哈

按照以下顺序进行开发

1. 基于Go语言的后端，采用Gin框架
2. 基于Go语言的后端，微服务形式
3. 基于Java语言的后端，采用SpringBoot框架
4. 基于Java语言的后端，微服务形式
5. 基于Rust语言的后端，采用Actix框架
6. 基于Node.js语言的后端，采用Koa框架
7. 基于Python语言的后端，采用Flask/Django框架

## 5. 更新日志（不太会弄，不准，哈哈哈）

[CHANGELOG](CHANGELOG.md)

### 6. 计划

#### 0x00. 纠结

- [ ] 缓存页面

#### 0x01. 全部功能

##### 0x01.1 基础功能

- [x] 亮色/暗黑模式切换（需不需要加个跟随系统）
- [x] 国际化（中英文）
- [x] 全屏
- [x] 登陆页
- [x] 注册页
- [x] 忘记密码
- [x] 搜索
- [x] 消息通知
- [x] 锁定屏幕
- [x] 项目配置

##### 0x01.2 仪表盘

- [x] 分析页
- [ ] 监控页
- [ ] 工作台

##### 0x01.3 文档

- [ ] Vue文档
- [x] Vue文档（新版）
- [ ] Vite文档
- [x] 百度（外链）

##### 0x01.4 组件示例

- [ ] 按钮组件
- [ ] 卡片组件
- [ ] 表格组件
- [ ] 表单组件
- [x] 图表组件
  - [x] ECharts
  - [ ] D3
- [ ] 地图组件
- [ ] 视频组件
- [ ] 编辑器组件
  - [ ] 富文本组件
  - [ ] Markdown
  - [ ] Yarm
  - [ ] Json组件
- [ ] Swiper组件
- [ ] 图标组件
- [ ] 头像上传组件
- [ ] 图片裁剪组件
- [ ] 上传组件
- [ ] 二维码组件
- [ ] 密码强度组件
- [ ] 动画组件
- [ ] 数字动画组件
- [ ] 滚动组件
- [ ] 弹窗组件
- [ ] 懒加载组件
- [ ] 验证组件
  - [ ] 拖拽验证
  - [ ] 图片还原
- [ ] Loading组件
- [ ] 表格选择器组件

##### 0x01.5 功能示例

- [ ] websocket测试
- [ ] 登陆过期
- [ ] 错误日志
- [ ] 错误日志收集
- [ ] 打印
- [ ] 标签页操作
- [ ] 右键菜单
- [ ] 文件下载
- [ ] 图片预览
- [x] 水印
- [x] 全屏
- [ ] 二维码
- [x] 错误日志
- [ ] Tab带参
- [ ] 第三方登陆
- [ ] 动态换肤
- [ ] 断点续传

##### 0x01.6 权限示例

- [x] 基于前端权限
  - [x] 页面级权限
  - [x] 按钮级权限
  - [x] 前端权限测试页
- [ ] 基于后端权限
  - [ ] 页面级权限
  - [ ] 按钮级权限
  - [ ] 后端权限测试页

##### 0x01.7 系统管理

- [ ] 用户管理
- [ ] 角色管理
- [ ] 菜单管理
- [ ] 菜单管理2
- [ ] 部门管理
- [ ] 字典管理
- [ ] 参数管理
- [ ] 通知管理
- [ ] 操作日志
- [ ] 登录日志
- [ ] 在线用户
- [ ] 定时任务
- [ ] 服务监控
- [ ] 系统重启
- [ ] 修改密码
- [ ] Api管理

##### 0x01.8 页面

- [ ] 表单页
  - [ ] 基础表单
  - [ ] 分步表单
  - [ ] 高级表单
- [ ] 详情页
  - [ ] 基础详情页
  - [ ] 高级详情页
- [ ] 结果页
  - [ ] 成功页
  - [ ] 失败页
- [ ] 个人页
  - [ ] 个人中心
  - [ ] 个人设置
- [ ] 异常页
  - [ ] 403
  - [ ] 404
  - [ ] 500
  - [ ] 网络错误
  - [ ] 无数据
- [ ] 列表页
  - [ ] 标准列表
  - [ ] 卡片列表
  - [ ] 搜索列表

##### 0x01.9 图形编辑器

- [ ] 流程图

##### 0x01.10 引导页

- [ ] 引导页

##### 0x01.11 关于

## 7. 项目结构

```
后续添加吧，还没确定好，主要依据功能来弄
```

## License

Ths project is [MIT licensed](https://github.com/LLiuHuan/qin-admin/blob/master/LICENSE).
