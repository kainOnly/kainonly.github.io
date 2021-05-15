# NGX-BIT

易用的 Angular 辅助层框架

[![Github Actions](https://img.shields.io/github/workflow/status/kainonly/ngx-bit/test?style=flat-square)](https://github.com/kainonly/ngx-bit/actions)
[![Coveralls github](https://img.shields.io/coveralls/github/kainonly/ngx-bit.svg?style=flat-square)](https://coveralls.io/github/kainonly/ngx-bit)
[![npm](https://img.shields.io/npm/v/ngx-bit.svg?style=flat-square)](https://ngx-bit.kainonly.com)
[![Downloads](https://img.shields.io/npm/dm/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![npm](https://img.shields.io/npm/dt/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/kainonly/ngx-bit.js/master/LICENSE)

初始化案例，创建本地项目 bit-example（仅展示前端必须的正确配置，不启动后端则不能正常加载）

```shell
ng new bit-example

# ? Would you like to add Angular routing? Yes
# ? Which stylesheet format would you like to use? SCSS
```

首先为项目安装组件依赖 ng-zorro-antd （Ant Design 的 Angular 实现）

```shell
ng add ng-zorro-antd

# ? Enable icon dynamic loading [ Detail: https://ng.ant.design/components/icon/en ] Yes
# ? Set up custom theme file [ Detail: https://ng.ant.design/docs/customize-theme/en ] No
# ? Choose your locale code: zh_CN
# ? Choose template to create project: blank
```

然后安装辅助框架 ngx-bit

```shell
ng add ngx-bit
```

还可以设置为 PWA 项目

```shell
ng add @angular/pwa
```

按需安装第三方组件，示例用到 `BitSupportService` `BitSwalService`

```shell
npm install @ngx-pwa/local-storage sweetalert2 -S
```

!> 新组件整合中，文档待更新... 也可查看 [项目案例](https://github.com/kainonly/ngx-bit)
