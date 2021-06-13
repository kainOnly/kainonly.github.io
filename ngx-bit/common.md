# 公共模块

## 统一配置 BitConfig

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

## 助手工具 BitService

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
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private bit: BitService,
  ) {
  }

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
  - text `string` JSON字符串

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

## 请求处理 BitHttpService



## CURD 适配 BitCurdService

## 分页列表 ListByPage
