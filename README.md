# vue3-antdv-admin

基于 Vue3 + Vite + JS + Ant-Design-Vue + Pinia 搭建的后台管理系统模板

## 核心技术栈

* 前端框架：Vue3 + JS
* UI组件库：Ant-Design-Vue
* 状态管理：Pinia
* 构建工具：Vite
* 代码规范：ESLint + Prettier
* 样式：Less UnoCSS
* 网络请求：Axios
* Icon图标库：Iconify Ant-Design
* 动画库：Animate.css
* 时间库：Dayjs
* 工具函数库：Lodash VueUse
* 其他：qs nprogress ......

## 开发初衷

* 公司技术栈逐渐升级，慢慢从Vue2转为Vue3
* 老项目布局组件、业务组件相互耦合严重，架构混乱，代码冗余且不规范
* GitHub上存在许多优秀的模板，但大多数模板都是基于TypeScript，而且各种封装过于复杂，不是很适用于中小型项目
* 个人也想搭建一套可复用的模板，方便后续开发

## 技术选型的一些问题

* ### 为什么使用Ant-Design-Vue？

```text
1、个人认为 Ant-Design 的设计很漂亮，而且组件的API设计非常合理，文档也很详细，在国内很流行

2、提前预判：大多数人会在Vue项目中使用Element-UI，而在React项目中使用Ant-Design。 可是在大项目集成中，
不同的小项目之间都需要做到风格统一， 我提前预判React的项目使用Ant-Design, 那么我这Vue项目自然就和React项目风格一致了
```

* ### 为什么不使用TypeScript？

```text
1、TypeScript的语法糖和类型检查，在开发中会带来很多好处，但也是会增加开发成本，中小型项目没有太大必要强行上

2、在一些专业（行业，toB）项目中，业务逻辑比较复杂，后台返回的数据结构经常变动，所以使用TypeScript也会使得接口的维护成本增加

3、不可否认TypeScript的优秀，但是JavaScript更加灵活方便。相信你自己，在如今如此强大的IDE下，JavaScript的语法糖和代码提示，已经足够你写出高质量代码了
```

## 相比其他后台管理系统的优势

* 更加轻量级，都是一些简单封装，JS代码也比较好懂（能力有限😭）
* 布局和业务解耦，开发人员只用专注业务内容区域的开发，不用关心布局的细节
* 易拓展，移除后台管理系统中常见的的API接口封装、登录页面、权限管理等模块，方便根据自己的业务逻辑拓展

## 后续计划（有时间的话😅）

* 增加更多的示例页面
* 增加更多的布局方式
* 更加丰富页面显示配置项
