## bitOpen 路由导航

`navigate` 路由导航的扩展，为跨级导航作为基础持久记录其路由参数

### 选择器

`[bitOpen]`

### 属性

`BitOpenDirective` 组件包含以下属性指令：

| 属性        | 说明               | 类型             | 默认值 |
| ----------- | ------------------ | ---------------- | ------ |
| `[bitOpen]` | urlTree            | `any[]`          | -      |
| `[extras]`  | 修改导航策略的选项 | NavigationExtras | -      |

### 使用说明

`bitOpen` 在使用中与 `routerlink` 基本相同

```html
<button nz-button nzType="primary" nzSize="small" [bitOpen]="['admin-index']">
  导航至管理员列表
</button>

<a [bitOpen]="['admin-edit', 1]">
  <i nz-icon type="edit"></i> 导航至管理员修改
</a>

<button nz-button nzType="primary" nzSize="small" [bitOpen]="['team-index']" [extras]="{queryParams:{key:'abc'}}">
  导航附加 extras
</button>
```