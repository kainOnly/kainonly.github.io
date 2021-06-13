# NGX-BIT

易用的 Angular 辅助层框架

[![npm](https://img.shields.io/npm/v/ngx-bit/v11-lts.svg?style=flat-square)](https://ngx-bit.kainonly.com/v/10)

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
