# 公共模块

## BitConfig 统一配置

BitConfig 是助手库的全局配置服务，可以将它增加至 `environment` 内管理，例如：

```typescript
import { en_US, zh_CN } from "ng-zorro-antd/i18n";
import { BitConfig } from "ngx-bit";

const bit: BitConfig = {
  url: {
    api: "https://api.kainonly.com",
    static: "https://cdn.kainonly.com/",
    icon: "https://cdn.kainonly.com/",
  },
  api: {
    namespace: "/system",
    withCredentials: true,
    upload: "https://cdn-1252852151.cos.ap-guangzhou.myqcloud.com",
    uploadStorage: "cos",
    uploadFetchSigned: "/system/main/presigned",
    uploadFetchSignedMethod: "POST",
    uploadSize: 102400,
  },
  curd: {
    get: "/get",
    lists: "/lists",
    originLists: "/originLists",
    add: "/add",
    edit: "/edit",
    status: "/edit",
    delete: "/delete",
  },
  col: {
    label: {
      nzXXl: 4,
      nzXl: 5,
      nzLg: 6,
      nzMd: 7,
      nzSm: 24,
    },
    control: {
      nzXXl: 8,
      nzXl: 9,
      nzLg: 10,
      nzMd: 14,
      nzSm: 24,
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 },
    },
  },
  locale: {
    default: "zh_cn",
    mapping: ["zh_cn", "en_us"],
    bind: [zh_CN, en_US],
  },
  i18n: {
    default: "zh_cn",
    contain: ["zh_cn", "en_us"],
    switch: [
      {
        i18n: "zh_cn",
        name: {
          zh_cn: "中文",
          en_us: "Chinese",
        },
      },
      {
        i18n: "en_us",
        name: {
          zh_cn: "英文",
          en_us: "English",
        },
      },
    ],
  },
  page: 10,
  query: "sql-orm",
};

export const environment = {
  production: false,
  bit,
};
```

### 配置详情

| 属性                          | 说明                                      | 类型                        | 默认值      |
| ----------------------------- | ----------------------------------------- | --------------------------- | ----------- |
| `url.api`                     | 接口地址                                  | `string`                    | `''`        |
| `url.static`                  | 静态资源地址                              | `string`                    | `''`        |
| `url.icon`                    | icon 路径                                 | `string`                    | `undefined` |
| `api.namespace`               | 接口命名空间                              | `string`                    | `''`        |
| `api.withCredentials`         | 是否携带 cookie                           | `bool`                      | `false`     |
| `api.upload`                  | 统一上传路径                              | `string`                    | `''`        |
| `api.uploadStorage`           | 上传存储                                  | `UploadStorage`             | `'default'` |
| `api.uploadFetchSigned`       | 获取对象存储签名参数的请求                | `string`                    | `''`        |
| `api.uploadFetchSignedMethod` | 获取对象存储签名参数的请求 Method         | `string`                    | `''`        |
| `api.uploadSize`              | 上传文件大小限制                          | `number`                    | `5120`      |
| `curd`                        | 请求处理默认 path                         | `CurdOption`                | `''`        |
| `col[<key>]`                  | 定义统一栅格                              | `object`                    | `{}`        |
| `locale.default`              | 本地语言包标识默认状态                    | `string`                    | `''`        |
| `locale.mapping`              | 本地语言包标识与语言包文件索引映射        | `string[]`                  | `null`      |
| `locale.bind`                 | 本地语言包标识与 ng-zorro-antd 语言包映射 | `any[]`                     | `null`      |
| `i18n.default`                | 多语言输入标识默认状态                    | `string`                    | `''`        |
| `i18n.contain`                | 多语言输入包含标识                        | `string[]`                  | `[]`        |
| `i18n.switch`                 | 多语言输入标识详情                        | `I18nOption[]`              | `[]`        |
| `page`                        | 分页请求的默认数量                        | `number`                    | `0`         |
| `query`                       | CURD 查询模式                             | `'sql-orm' 'mongo' 'cloud'` | `'sql-orm'` |

### 关于 URL

- 如果 `url.icon` 不被定义，则会加载本地的 icon 路径；如果被定义则会加载远程地址，例如 `https://cdn.kainonly.com/`
- 假设 `url.api` 接口地址定义为 `https://api.kainonly.com`，`api.namespace` 接口命名空间定义为 `/v1`，那么请求路径为 `https://api.kainonly.com/v1`；同理如果 `api.upload` 定义为 `/system/main/uploads`，那么上传路径则为 `https://api.kainonly.com/system/main/uploads`

### 栅格设置

表单中常常出现重复的栅格定义，此时就可以通过统一栅格解决问题

```typescript
const col = {
  label: {
    nzXXl: 4,
    nzXl: 5,
    nzLg: 6,
    nzMd: 7,
    nzSm: 24,
  },
  control: {
    nzXXl: 8,
    nzXl: 9,
    nzLg: 10,
    nzMd: 14,
    nzSm: 24,
  },
  submit: {
    nzXXl: { span: 8, offset: 4 },
    nzXl: { span: 9, offset: 5 },
    nzLg: { span: 10, offset: 6 },
    nzMd: { span: 14, offset: 6 },
    nzSm: { span: 24, offset: 0 },
  },
};
```

### 本地语言

设置语言包

- `locale.default` 则是在前端中默认显示的语言标识
- `locale.mapping` 代表在定义语言包文件中的索引映射，例如：

```typescript
// 当 `locale.mapping` 定义为
const mapping = ["zh_cn", "en_us"];

// 语言包则按照索引配置语言
export default {
  dashboard: ["仪表盘", "Dashboard"],
};
```

- `locale.bind` 则是绑定与 ng-zorro-antd 语言包映射，因为在语言切换时将同时触发 ng-zorro-antd 组件语言的切换，例如：

```typescript
import { en_US, zh_CN } from "ng-zorro-antd";

// 同样按照索引配置语言
const bind = [zh_CN, en_US];
```

### 多语言

多语言输入是为表单组件提供多种语言提交的方式

- `default` 是多语言输入组件的默认语言
- `contain` 代表辅助框架中包含的多语言输入类型数组集合
- `switch` 是多语言输入组件的显示条件

```typescript
const i18n = {
  default: "zh_cn",
  contain: ["zh_cn", "en_us"],
  switch: [
    {
      i18n: "zh_cn",
      name: {
        zh_cn: "中文",
        en_us: "Chinese",
      },
    },
    {
      i18n: "en_us",
      name: {
        zh_cn: "英文",
        en_us: "English",
      },
    },
  ],
};
```

## BitService 助手工具

BitService 是助手工具，以下示例中 `bit` 为 `BitService` 服务的注入命名

### 基本属性

| 属性            | 说明                                       | 类型                | 默认值                                     |
| --------------- | ------------------------------------------ | ------------------- | ------------------------------------------ |
| `static`        | 静态资源地址(readonly)                     | `string`            | `bitConfig.url.static`                     |
| `uploads`       | 上传地址(readonly)                         | `string`            | `bitConfig.url.api + bitConfig.api.upload` |
| `localeDefault` | 默认语言包 ID(readonly)                    | `string`            | `bitConfig.locale.default`                 |
| `localeMapping` | 语言包 ID 索引(readonly)                   | `string[]`          | `bitConfig.locale.mapping`                 |
| `localeBind`    | 语言包 ID 与 NG-ZORRO 语言包关联(readonly) | `any[]`             | `bitConfig.locale.bind`                    |
| `locale`        | 多语言标识                                 | `string`            | `''`                                       |
| `localeChanged` | 语言包 ID 状态(readonly)                   | `Subject<string>`   | `Subject()`                                |
| `l`             | 语言包索引                                 | `object`            | `{}`                                       |
| `i18nDefault`   | 默认国际化 ID(readonly)                    | `string`            | `bitConfig.i18n.default`                   |
| `i18n`          | 多语言输入标识                             | `string`            | `bitConfig.i18n.default`                   |
| `i18nChanged`   | 国际化 ID 状态(readonly)                   | `Subject<string>`   | `Subject()`                                |
| `i18nContain`   | 国际化包含语言 ID                          | `any[]`             | `bitConfig.i18n.contain`                   |
| `i18nSwitch`    | 国际化详情                                 | `I18nOption[]`      | `bitConfig.i18n.switch`                    |
| `i18nTooltip`   | 多语言输入提示                             | `I18nTooltipOption` | `{}`                                       |
| `pageDefault`   | 默认分页限制(readonly)                     | `number`            | `bitConfig.page`                           |

- `uploads` 为组合后的统一上传路径（即接口地址+统一上传路径），通常可以直接使用在 `nz-upload` 组件中

```html
<!-- 使用在nzAction -->
<nz-upload
  nzName="image"
  [nzAction]="bit.uploads"
  [nzWithCredentials]="config.api.withCredentials"
  [nzSize]="5120"
  [nzShowUploadList]="false"
>
</nz-upload>
<!-- 使用更简洁的方式实现相同定义 -->
<nz-upload nzName="image" bitUpload [nzShowUploadList]="false"> </nz-upload>
```

- `locale` 为当前多语言标识状态通常使用在 `ObjectPipe`，例如：

```html
{{name|object:bit.locale}}
```

- `l` 为语言包索引，在组件完成语言包注册后可在模板中使用，例如：

```html
{{bit.l['dashboards']}}
```

- `i18nContain` 为多语言输入类型集合，通常可以用来筛选多语言输入的 ID，例如：

```html
<nz-form-item formGroupName="name">
  <nz-form-label bitFormLabelCol nzRequired> {{bit.l['name']}} </nz-form-label>
  <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)" bitFormControlCol nzHasFeedback>
      <input nz-input [formControlName]="x" />
    </nz-form-control>
  </ng-container>
</nz-form-item>
```

### 路由导航

- open(urlTree: `any[]`, extras?: `NavigationExtras`): `void`
  - urlTree `any[]` urlTree
  - extras `NavigationExtras` 修改导航策略的选项

`navigate` 路由导航的扩展，为跨级导航作为基础持久记录其路由参数

```typescript
bit.open(["admin-edit", 1]);
```

### 导航历史

- history(key: `string`): `void`
  - selector `string` 路由标签

路由历史导航，加载被历史缓存的参数导航，例如：

```typescript
// 假设导航至/{team-index}/1
bit.open(["team-index", 1]);
// 再从/{team-index}/1导航至/{team-index}/1/services/T100
bit.open(["team-index", 1, "services", "T100"]);
// 此时使用history，可导航至/{team-index}/1
bit.history("team-index");
```

### 导航返回

- back(): `void`

返回上一级，并重置 `i18n` 多语言输入标识

```typescript
// 导航至/{admin-index}
bit.open(["admin-index"]);
// 再从/{admin-index}导航至/{admin-edit}/1
bit.open(["admin-edit", 1]);
// 返回至/{admin-index}
bit.back();
```

### 初始化语言包

- setupLocale(): `void`

启动本地语言包，例如：

```typescript
@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService) {}

  ngOnInit(): void {
    this.bit.setupLocale();
  }
}
```

### 载入语言包

- registerLocales(packer: `object` | `Promise<any>`): `void`

将局部语言包加工与公共语言包合并，再提供给 `bit.l`，通常文件定义在组件内 `language.ts`

- packer `Promise<any>` 导入的语言包文件

```typescript
import { Component, OnInit } from "@angular/core";
import { BitService } from "ngx-bit";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.bit.registerLocales(import("./language"));
  }
}
```

### 设置语言包 ID

- setLocale(locale: `string`): `void`
  - locale `string` 语言包标识

```typescript
import { Component, OnInit } from "@angular/core";
import { BitService } from "ngx-bit";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  constructor(public bit: BitService) {}

  ngOnInit(): void {}

  switchToEnglish() {
    this.bit.setLocale("en_us");
  }
}
```

### 国际化 ID 是否相等

- equalI18n(i18n: `string`): `boolean`
  - i18n `string` 多语言输入标识

```html
<nz-form-item formGroupName="name">
  <nz-form-label bitFormLabelCol nzRequired> {{bit.l['name']}} </nz-form-label>
  <ng-container *ngFor="let ID of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(ID)" bitFormControlCol nzHasFeedback>
      <input
        nz-input
        [placeholder]="bit.l['namePlaceholder']"
        [formControlName]="ID"
      />
    </nz-form-control>
  </ng-container>
</nz-form-item>
```

### 重置国际化 ID

- resetI18n(): `void`

```typescript
this.bit.resetI18n();
```

### 生成 I18n FormGroup

- i18nGroup(options: `I18nGroupOption`): `any`
  - options `I18nGroupOptions` 多语言组件参数
    - value `object` 默认值
      - ${ID} `array` 属于某个多语言标识的数值
    - validate `object` 同步验证器数组
      - ${ID} `array` 属于某个多语言标识的同步验证器
    - asyncValidate `object` 异步验证器数组
      - ${ID} `array` 属于某个多语言标识的异步验证器

```typescript
import { Component, OnInit } from "@angular/core";
import { BitService } from "ngx-bit";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { of } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(public bit: BitService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.group(
        this.bit.i18nGroup({
          value: {
            zh_cn: "测试",
            en_us: "TEST",
          },
          validate: {
            zh_cn: [Validators.required],
            en_us: [],
          },
          asyncValidate: {
            en_us: [this.fun1],
          },
        })
      ),
    });
  }

  fun1: AsyncValidatorFn = (control: AbstractControl) => {
    return of({ error: true, duplicated: true });
  };
}
```

### 解析国际化数据

- i18nParse(text: `string`): `any`
  - text `string` JSON 字符串

### 生产分页数据对象

- listByPage(option: `ListByPageOption`): `ListByPage`
  - option `ListByPageOption` 分页列表参数

```typescript
import { Component, OnInit } from "@angular/core";
import { BitService } from "ngx-bit";
import { ListByPage } from "ngx-bit/factory";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  lists: ListByPage;

  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: "welcome",
      query: [{ field: "type", op: "=", value: 0 }],
    });
  }
}
```

### 清除应用本地存储

- clear(): `void`

## BitHttpService 请求处理

BitHttpService 请求处理是对 `HttpClient` 的封装，以下示例中 `http` 为 `BitHttpService` 服务的注入命名

### 基本属性

| 属性              | 说明               | 类型      | 默认值                                              |
| ----------------- | ------------------ | --------- | --------------------------------------------------- |
| `baseUri`         | 基础路径(readonly) | `string`  | `bitConfig.url.api + bitConfig.api.namespace + '/'` |
| `withCredentials` | 是否同源(readonly) | `boolean` | `bitConfig.api.withCredentials`                     |

### 设置请求拦截器

- setupInterceptor(operate: `OperatorFunction<any, any>`): `void`
  - operate `OperatorFunction<any, any>` RxJS 操作

```typescript
@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(
    private bit: BitService,
    private http: BitHttpService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bit.setupLocale();
    this.bit.registerLocales(import("./app.language"));
    this.http.setupInterceptor(
      map((res) => {
        if (res.error) {
          switch (res.msg) {
            case "refresh token verification expired":
              this.notification.warning(
                this.bit.l.auth,
                this.bit.l.authInvalid,
                {
                  nzKey: "authInvalid",
                }
              );
              this.router.navigateByUrl("/login");
              break;
          }
        }
        return res;
      })
    );
  }
}
```

### 创建请求对象

- req(url: `string`, body: `any` = {}, method = 'post'): `Observable<any>`
  - url `string` 请求路由
  - body `any` 发送数据
  - method `string` 请求类型, 默认为 `post` 请求
  - Return `Observable<any>`

```typescript
// 例如：请求资源接口
http.req("main/resource").subscribe((res) => {
  console.log(res);
});
```

## BitCurdService CURD 适配

BitCurdService 是一个抽象定义服务，它可以快捷对接后端 CURD 接口，你可以使用 BitCurdCommonService 直接配套已有的后端组件，也可以继承它重写符合的服务

### 获取查询语句

- getQuerySchema(options: `SearchOption[]`): `any[]`
  - options `SearchOption[]` 查询条件

通过 `SearchOption[]` 组合成条件数组

```typescript
let schema = getQuerySchema([{ field: "username", op: "=", value: "" }]);

// console: []

schema = getQuerySchema([
  { field: "username", op: "=", value: "", exclude: [0, null] },
]);

// console: ['username', '=', '']]

schema = getQuerySchema([{ field: "username", op: "=", value: "kain" }]);

// console: [['username', '=', 'kain']]

schema = getQuerySchema([
  { field: "username", op: "=", value: null },
  { field: "type", op: "=", value: 0 },
  { field: "ids", op: "in", value: [] },
  { field: "error", op: "=", value: {} },
]);

// console: []
```

### 获取单条数据请求

- get(model: `string`, condition: `number` | `string` | `SearchOption[]`, order?: `OrderOption`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - condition `number | string | SearchOptions[]` 查询条件，当类型为 `number` 或 `string` 是将作为主键返回后端，若为 `SearchOptions[]` 则会组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
  - order `OrderOption` 排序条件
  - path `string` 自定义路径

```typescript
// 主键查询
curd.get(this.model, id);
// 条件查询
curd.get(this.model, [{ field: "username", op: "=", value: "kain" }]);
```

### 获取分页数据请求

- lists(model: `string`, factory: `ListByPage`, option: `ListsOption`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - factory `ListByPage` 分页列表对象
  - option `ListsOption`
    - refresh `boolean` 刷新，即重置分页
    - persistence `boolean` 持久存储，即记录分页历史
  - path `string` 自定义路径

```typescript
const search = bit.listByPage({
  id: "admin-index",
  query: [{ field: "sex", op: "=", value: 1 }],
});

curd.lists("admin", search, {
  refresh: true,
  persistence: true,
});
```

### 获取原始列表数据请求

- originLists(model: `string`, condition: `SearchOption[]` = [], order?: `OrderOption`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - condition `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
  - order `OrderOption` 排序条件
  - path `string` 自定义路径

```typescript
curd.originLists("admin");
```

### 新增数据请求

- add(model: `string`, data: `any`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - data `any` body 数据
  - path `string` 自定义路径

```typescript
const data = {
  username: "kain",
  email: "zhangtqx@vip.qq.com",
};

curd.add("admin", data);
```

### 修改数据请求

- edit(model: `string`, data: `any`, condition?: `SearchOptions[]`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - data `any` body 数据
  - condition `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
  - path `string` 自定义路径

```typescript
const data = {
  id: 1,
  username: "kain",
  email: "kainonly@qq.com",
};

curd.edit("admin", data);

// 当没有主键时，需要设置 condition
const condition = [{ field: "username", op: "=", value: "kain" }];
const data = {
  email: "kainonly@qq.com",
};

curd.edit("admin", data, condition);
```

### 状态切换请求

- status(model: `string`, data: `any`, field = 'status', extra?: `any`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - data `any` body 数据
  - field `string` 状态字段，默认 `status`
  - extra `any` 扩展字段
  - path `string` 自定义路径

状态将以相反的数值提交给后端

```typescript
const data = {
  id: 1,
  status: true,
};
// 此时将为后端传递的 status 为 false
curd.status("admin", data);

// 如果状态字段为线上 online 可以这样设定
const data = {
  id: 1,
  online: true,
};

curd.status("admin", data, "online");

// 假设它必须要增加一段关键的字段，则可以
const data = {
  id: 1,
  online: true,
};
// 此时 {key:'a123'} 将合并入 body 内提交后端
curd.status("admin", data, "online", {
  key: "a123",
});
```

### 删除数据请求

- delete(model: `string`, id?:` any[]`, condition?: `SearchOption[]`, path?: `string`): `Observable<any>`
  - model `string` 模块名称
  - id `any[]` 主键数组
  - condition `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
  - path `string` 自定义路径

`id` 与 `condition` 两者必须选一种

```typescript
// 使用主键数组删除
curd.delete("admin", [1]);
// 使用条件数组删除
curd.delete("admin", undefined, [
  { field: "username", op: "=", value: "kain" },
]);
```

## ListByPage 分页列表 

ListByPage 提供了分页列表结构所需的基本条件，创建通常需要 `BitService` 协助，例如：

```typescript
import { Component, OnInit } from "@angular/core";
import { BitService, ListByPage } from "ngx-bit";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  lists: ListByPage;

  constructor(public bit: BitService) {}

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: "index",
      limit: 10,
      query: [{ field: "username", op: "=", value: "" }],
    });
  }
}
```

### 基本属性

| 属性            | 说明                     | 类型                                | 默认值           |
| --------------- | ------------------------ | ----------------------------------- | ---------------- |
| `ready`         | 完成初始化               | `AsyncSubject<any>`                 | `AsyncSubject()` |
| `search`        | 搜索字段定义             | `{ [field: string]: SearchOption }` | `{}`             |
| `order`         | 排序字段定义             | `OrderOption`                       | `undefined`      |
| `data`          | 分页列表数据             | `any[]`                             | `[]`             |
| `loading`       | 分页列表加载状态         | `boolean`                           | `true`           |
| `limit`         | 分页记录数量             | `number`                            | `0`              |
| `totals`        | 分页总数                 | `number`                            | `0`              |
| `index`         | 分页页码                 | `number`                            | `1`              |
| `checked`       | 分页列表是否全被选中     | `boolean`                           | `false`          |
| `indeterminate` | 分页列表是否不完全被选中 | `boolean`                           | `false`          |
| `batch`         | 是否可进行批量处理       | `boolean`                           | `false`          |
| `checkedNumber` | 分页列表被选中的数量     | `number`                            | `0`              |

### 设置数据

- setData(data: `any[]`): `void`
  - data `any[]` 数据源

当分页列表请求返回时设置，`getLists` 因酌情处理，这里 `event` 代表分页页码，可直接供 Table 组件使用

```typescript
getLists(refresh = false, event?:any) {
    service.lists(
        this.lists,
        refresh,
        event !== undefined
    ).subscribe(data => {
        this.lists.setData(data);
    });
}
```

### 判断是否包含该字段的搜索条件

- hasSearch(field: `string`): `void`
  - field `string` 字段名称

通常这被使用在模板上

```html
<nz-space-item *ngIf="lists.hasSearch('username')">
  <nz-input-group nzSearch [nzAddOnAfter]="nzAddOnAfter" style="width: 320px">
    <input
      nz-input
      [bitSearchStart]="lists"
      [placeholder]="bit.l['search']"
      [(ngModel)]="lists.search['username'].value"
      (after)="getLists(true)"
    />
  </nz-input-group>
  <ng-template #nzAddOnAfter>
    <button
      nzSearch
      nz-button
      nzType="primary"
      [bitSearchStart]="lists"
      (after)="getLists(true)"
    >
      <i nz-icon nzType="search"></i>
    </button>
  </ng-template>
</nz-space-item>
```

### 主动触发搜索变动之后

- afterSearch(): `Observable<any>`

在不是 `bit-search-change` 与 `bit-search-start` 指令触发的情况下，就需要主动执行：

```typescript
this.lists.afterSearch().subscribe((status) => {
  // ...
});
```

### 主动触发搜索清空之后

- clearSearch(reset: `any` = {}): `Observable<any>`
  - reset `any` 重置的数值
  - Return `Observable<any>`

在不是 `bit-search-clear` 指令触发的情况下，就需要主动执行：

```typescript
this.lists
  .clearSearch({
    username: "",
  })
  .subscribe((status) => {
    // ...
  });
```

### 更新分页列表状态

- refreshStatus(): `void`

即是否全部选中、不完全选中、是否可执行批量与选中数量，通常列表数据中发生变化需主动执行

```html
<nz-table
  #table
  [nzData]="lists.data"
  [nzLoading]="lists.loading"
  [nzTotal]="lists.totals"
  [nzPageSize]="lists.limit"
  [nzFrontPagination]="false"
  [(nzPageIndex)]="lists.index"
  (nzPageIndexChange)="getLists()"
  nzSize="middle"
>
  <thead>
    <tr>
      <th
        nzShowCheckbox
        nzWidth="65px"
        [(nzChecked)]="lists.checked"
        [nzIndeterminate]="lists.indeterminate"
        (nzCheckedChange)="lists.checkedAll($event)"
      ></th>
      <th>{{bit.l['username']}}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of table.data">
      <!-- 这里执行 -->
      <td
        nzShowCheckbox
        [(nzChecked)]="data.checked"
        (nzCheckedChange)="lists.refreshStatus()"
      ></td>
      <td>{{data.username}}</td>
    </tr>
  </tbody>
</nz-table>
```

### 更改所有分页列表选中状态

- checkedAll(event: `boolean`): `void`
  - event `boolean` 选中状态

可附加在主选择器的状态监听中

```html
<nz-table
  #table
  [nzData]="lists.data"
  [nzLoading]="lists.loading"
  [nzTotal]="lists.totals"
  [nzPageSize]="lists.limit"
  [nzFrontPagination]="false"
  [(nzPageIndex)]="lists.index"
  (nzPageIndexChange)="getLists()"
  nzSize="middle"
>
  <thead>
    <tr>
      <!-- 这里执行 -->
      <th
        nzShowCheckbox
        nzWidth="65px"
        [(nzChecked)]="lists.checked"
        [nzIndeterminate]="lists.indeterminate"
        (nzCheckedChange)="lists.checkedAll($event)"
      ></th>
      <th>{{bit.l['username']}}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of table.data">
      <td
        nzShowCheckbox
        [(nzChecked)]="data.checked"
        (nzCheckedChange)="lists.refreshStatus()"
      ></td>
      <td>{{data.username}}</td>
    </tr>
  </tbody>
</nz-table>
```

### 返回所有被选中的列表

- getChecked(): `any[]`

```typescript
const checkedLists = this.lists.getChecked();
```

### 获取当前的页码

- getPage(): `Observable<any>`

```typescript
this.lists.getPage().subscribe((index) => {
  // index
});
```

### 主动执行分页页码的持久化记录

- persistence(): `void`

```typescript
this.lists.persistence();
```

### 返回查询定义数组

- toQuery(): `SearchOption[]`

```typescript
const search = this.lists.toQuery();
```

### 返回查询语句

- toQuerySchema(): `any[]`

将 `search` 组合成 Laravel Query 的条件数组（ThinkPHP 同样支持）

```typescript
const schema = this.lists.toQuerySchema();

// console: []
```
