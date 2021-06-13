# 更新日志

## 12.0.0-beta

该版本是 Angular 12 过渡版本，为满足扩展需要存在破坏性更新，且废弃了一些不重要的功能，调整如下：

- 统一配置 `BitConfigService` 变更为 `BitConfig`
- 废弃组件通讯 `BitEventsService`，如需状态定义可自行定义或使用状态管理库 `NGRX` `Akita`
- 拆分请求处理 `BitHttpService`，其中 CURD 功能将纳入新的 `BitCurdService` 便于扩展
- 废弃功能支持 `BitSupportService`，该功能将作为可选的**平行路由**模块 `BitRouterModule` 进行相似实现
- 提示确认 `BitSwalService` 变更为可选的**提示框**模块 `BitSwalModule` 且使用远程懒加载依赖库
- 迁移上传组件 `bit-transport` 至 `@van/framework`
- 页头填充组件 `bit-header` 整合至可选的**平行路由**模块 `BitRouterModule`
