# M-log

### 关于本项目

本Blog，基于 vue 2.x、vue-router 2.x、(vuex 2.x 已基本去除,感觉用了还不如不用) 构建

外壳部分用了Electron好直接调试,用得是一个vue2模版

完全抛弃后端,使用[GitHub Pages](https://pages.github.com/)提供服务

核心的部分就是用的Github Api提供的文件列表然后在本地生成一个List 之后都由该List 进一步渲染出需要的md文档

具体请看开源代码

#### 项目还会继续更新吗？

只要有好的想法,该项目会一直更新的

#### 近期的打算

* [x] 渐进式App设计

使用的是webpack插件[offline-plugin](https://github.com/NekR/offline-plugin)

需要注意的是如果考虑route网络出错的跳转需配置navigateFallbackURL貌似我因为用的axios不是fetch所以不支持

一些路由的拦截,所以我就直接网络错误强行跳转的error路由

**用了之后好处是资源直接就本地缓存了,当然blog的文章也只是用Session Strong做的缓存当前有效**

* [ ] 考虑抽离出一些设置为配置文件,进一步提升通用性
