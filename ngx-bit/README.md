# NGX-BIT

A flexible NG-ZORRO helper library

[![Github Actions](https://img.shields.io/github/workflow/status/kainonly/ngx-bit/bit_test?style=flat-square)](https://github.com/kainonly/ngx-bit/actions)
[![Coveralls github](https://img.shields.io/coveralls/github/kainonly/ngx-bit.svg?style=flat-square)](https://coveralls.io/github/kainonly/ngx-bit)
[![npm](https://img.shields.io/npm/v/ngx-bit.svg?style=flat-square)](https://ngx-bit.kainonly.com)
[![Downloads](https://img.shields.io/npm/dm/ngx-bit.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/github/license/kainonly/ngx-bit?style=flat-square)](https://raw.githubusercontent.com/kainonly/ngx-bit.js/main/LICENSE)

## 简介

**NGX-BIT** 是一个辅助 NG-ZORRO 的助手，目标是帮助项目解决前后端统一开发。如果你的团队正使用 Hyperf、ThinkPHP、Gin，那它会是个值得尝试的工具。`Bit` 名称只是个巧合，本意是希望轻巧方便，因为在 Angular （beta~4） 期间自研的组件断层且影响了项目迭代，恰好这个时间节点发现了 `NG-ZORRO` 并且一直从 `0.7.x` 同步更新至今。

## 快速开始

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