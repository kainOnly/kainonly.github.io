## router 平行路由

平行路由是一套自定义的路由匹配规则，其路由通过数据节点生成层级关系而不是通过默认的路由层级，首先加入 `BitRouterModule`

### 基本属性

`BitRouterService` 服务所包含以下属性：

| 属性             | 说明                 | 类型                 | 默认值      |
| ---------------- | -------------------- | -------------------- | ----------- |
| `navActive`      | 被激活的导航         | `any[]`              | `[]`        |
| `back`           | 允许返回             | `boolean`            | `false`     |
| `title`          | 当前路由的标题       | `any`                | `null`      |
| `subTitle`       | 当前路由的子标题     | `any`                | `null`      |
| `breadcrumbRoot` | 面包屑默认最高级标识 | `any`                | `0`         |
| `breadcrumb`     | 面包屑数组           | `BreadcrumbOption[]` | `[]`        |
| `banner`         | 当前路由全局通知模板 | `TemplateRef<any>`   | `undefined` |
| `tags`           | 当前路由页头标签模板 | `TemplateRef<any>`   | `undefined` |
| `actions`        | 当前路由操作项模板   | `TemplateRef<any>[]` | `[]`        |
| `content`        | 当前路由页头内容模板 | `TemplateRef<any>`   | `undefined` |
| `footer`         | 当前路由页头底部模板 | `TemplateRef<any>`   | `undefined` |
| `changed`        | 路由状态             | `Subject<any>`       | `Subject()` |

### 初始化平行路由

- setup(): `void`

```typescript
ngOnInit(): void {
  this.bit.registerLocales({});
  this.bitRouter.setup();
}
```

### 设置平行路由数据，同步导航与页头

- setData(data: `RouterData`): `void`
  - data `RouterData`
    - resource `object`
    - router `object`

> 生成方式参考 [main.service.ts](https://github.com/van-skeleton/framework/blob/main/common/main.service.ts)，
> 设置方式参考 [layout.component.ts](https://github.com/van-skeleton/framework/blob/main/layout/layout.component.ts)

### 取消平行路由逻辑

- uninstall(): `void`

### 设置导航栏目

在布局组件中引入 `bit-sider`，具体可参考 [layout.component.html](https://github.com/van-skeleton/framework/blob/main/layout/layout.component.html)

`<bit-sider [collapsed]="collapsed" [data]="data"></bit-sider>`

| 属性        | 说明         | 类型      | 默认值  |
| ----------- | ------------ | --------- | ------- |
| `collapsed` | 是否完整展开 | `boolean` | `false` |
| `data`      | 导航栏目数据 | `any[]`   | `[]`    |

### 设置布局页头

在布局组件中引入 `bit-page-header`，具体可参考 [layout.component.html](https://github.com/van-skeleton/framework/blob/main/layout/layout.component.html)

`<bit-page-header></bit-page-header>`

### 分配页头

在路由页面中分配页头，内容将填充至布局页头

`<bit-header></bit-header>`

| 属性       | 说明             | 类型      | 默认值 |
| ---------- | ---------------- | --------- | ------ |
| `subTitle` | 自定义子标题     | `any`     | -      |
| `back`     | 是否显示页头返回 | `boolean` | -      |

```html
<bit-header>
  <!-- 全局通知模板 -->
  <nz-alert
    *bitHeaderBanner
    nzBanner
    nzType="info"
    nzCloseable
    [nzMessage]="bit.l['uploadTip']"
  ></nz-alert>
  <!-- 全局通知模板 -->

  <!-- 页头标签模板 -->
  <div *bitHeaderTags>
    <nz-tag>Tag 1</nz-tag>
  </div>
  <!-- 页头标签模板 -->

  <!-- 操作项模板 -->
  <button *bitHeaderAction nz-button nzType="primary" [bitOpen]="['role-add']">
    <i nz-icon nzType="plus"></i>
    <span>{{ bit.l["add"] }}</span>
  </button>
  <button *bitHeaderAction nz-button nzType="primary">
    <i nz-icon nzType="plus"></i>
    <span>{{ bit.l["next"] }}</span>
  </button>
  <!-- 操作项模板 -->

  <!-- 页头内容模板 -->
  <div>Content</div>
  <!-- 页头内容模板 -->

  <!-- 页头底部模板 -->
  <div *bitHeaderFooter>Footer</div>
  <!-- 页头底部模板 -->
</bit-header>
```

## swal 提示框

将 sweetalert2 提示框适配至 NG-ZORRO，首先加入 `BitSwalModule.forRoot()`

- url `string` 加载地址，默认 `https://cdn.jsdelivr.net/npm/sweetalert2/dist/sweetalert2.all.min.js`

### 创建提示确认框

- create(option: `AlertOption`): `Observable<any>`
  - title `string` 标题
  - content `string` 内容
  - type `SweetAlertIcon` 图标类型
  - width `number` 宽度
  - okText `string` 确认按钮文字
  - okDanger `boolean` 确认按钮是否为危险按钮
  - okShow `boolean` 是否显示确认按钮
  - cancelText `string` 取消按钮文字
  - cancelShow `boolean` 是否显示取消按钮

```typescript
export class AclIndexComponent implements OnInit {
  constructor(public bit: BitService, private swal: BitSwalService) {}

  ngOnInit(): void {
    this.swal
      .create({
        title: "This is a success message",
        content: "some messages...some messages...",
        type: "success",
      })
      .subscribe(() => {});
  }
}
```

### 新增返回反馈栏

- addAlert(res: `any`, form: `FormGroup`, reset?: `any`): `Observable<any>`
  - res `any` 请求响应结果
  - form `FormGroup` 表单对象
  - reset `any` FormGroup 重置值

例如, 在新增操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AclAddComponent implements OnInit {
  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private aclService: AclService
  ) {}

  submit(data): void {
    this.aclService
      .add(data)
      .pipe(
        switchMap((res) =>
          this.swal.addAlert(res, this.form, {
            status: true,
          })
        )
      )
      .subscribe(() => {});
  }
}
```

### 修改返回反馈栏

- editAlert(res: `any`): `Observable<any>`
  - res `any` 请求响应结果

例如, 在修改操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AclEditComponent implements OnInit {
  private id: any;

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private aclService: AclService
  ) {}

  submit(data): void {
    Reflect.set(data, "id", this.id);
    this.aclService
      .edit(data)
      .pipe(switchMap((res) => this.swal.editAlert(res)))
      .subscribe((status) => {
        if (status) {
          this.getData();
        }
      });
  }
}
```

### 删除返回反馈栏

- deleteAlert(observable: `Observable<any>`): `Observable<any>`
  - observable `Observable<any>` 异步处理

例如, 在删除操作下使用, 订阅返回删除请求对象的响应值

```typescript
export class AclIndexComponent implements OnInit {
  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private message: NzMessageService,
    public aclService: AclService
  ) {}

  deleteData(id: any[]): void {
    this.swal.deleteAlert(this.aclService.delete(id)).subscribe((res) => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.message.error(this.bit.l.deleteError);
      }
    });
  }
}
```

## Operates 操作库

提供一些常用到的操作库

### 创建异步验证器

- asyncValidator(handle: `Observable<boolean>`, field = 'duplicated', dueTime = 500): `Observable<any>`
  - handle `Observable<boolean>` 返回验证结果
  - field `string` 自定义返回
  - dueTime `number` 防抖动延时，默认 `500` ms

假设验证 key 字段是否唯一，`response` 是模拟请求的响应值，通常这样使用请求服务

```typescript
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { asyncValidator } from "ngx-bit/operates";
import { of } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      key: [null, [], [this.existsKey]],
    });
  }

  existsKey = (control: AbstractControl) => {
    const handle = of(true);
    return asyncValidator(handle);
  };
}
```

### 脚本懒加载

- loadScript(doc: `Document`, url: `string`): `Observable<any>`
  - doc `Document`
  - url `string` 远程地址

```typescript
constructor(
  config: Config,
  swal: BitSwalService,
  @Inject(DOCUMENT) readonly document: Document
) {
  loadScript(document, config?.url || this.url).subscribe(_ => {
    swal.ready.next(window['Swal']);
    swal.ready.complete();
  });
}
```

### 判断是否为空

- empty(value: `any`): `boolean`
  - value `any` 数值
  - Return `boolean`

```typescript
empty(undefined);
// true
empty("");
// true
empty(0);
// true
empty(false);
// true
empty(null);
// true
empty([]);
// true
empty({});
// true
```

### 字符串模板

- print(str: `string`, ...vars: `any`): `string`
  - str `string` 字符串文本
  - vars `any[]` 变量，替换$0,$1,$2....$N

可适用于多语言模板

```typescript
print(
  "$0 是遵循 $1 设计规范的 $2 组件库",
  "ng-zorro-antd",
  "Ant Design",
  "Angular UI"
);

// ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库
```

### 字符串脱敏

- privacy(text: `string`, start: `number`, end: `number`): `string`
  - text `string` 文本
  - start `number` 起始索引
  - end `number` 结束索引

```typescript
privacy("123456789", 3, 6);

// 123***789
```
