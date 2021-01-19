## BitConfigService 统一配置

BitConfigService 是辅助框架统一配置管理的服务，配置则需要修改环境配置文件 `src\environments\environment.ts`

```typescript
import { en_US, zh_CN } from 'ng-zorro-antd';
import { BitConfig } from 'ngx-bit/types';

const bit: BitConfig = {
  url: {
    api: 'http://localhost:9501',
    static: 'https://cdn.example.com/',
    icon: 'https://cdn.example.com/'
  },
  api: {
    namespace: '/system',
    withCredentials: true,
    upload: '/system/main/uploads',
    uploadStorage: 'default',
    uploadFetchSigned: '<if oss obs cos>',
    uploadFetchSignedMethod: '<if oss obs cos>',
    uploadSize: 5120
  },
  curd: {
    get: '/get',
    lists: '/lists',
    originLists: '/originLists',
    add: '/add',
    edit: '/edit',
    status: '/edit',
    delete: '/delete'
  },
  col: {
    label: {
      nzXXl: 4,
      nzXl: 5,
      nzLg: 6,
      nzMd: 7,
      nzSm: 24
    },
    control: {
      nzXXl: 8,
      nzXl: 9,
      nzLg: 10,
      nzMd: 14,
      nzSm: 24
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 }
    }
  },
  locale: {
    default: 'zh_cn',
    mapping: new Map<number, string>([
      [0, 'zh_cn'],
      [1, 'en_us']
    ]),
    bind: new Map<string, any>([
      ['zh_cn', zh_CN],
      ['en_us', en_US]
    ])
  },
  i18n: {
    default: 'zh_cn',
    contain: ['zh_cn', 'en_us'],
    switch: [
      {
        i18n: 'zh_cn',
        name: {
          zh_cn: '中文',
          en_us: 'Chinese'
        }
      },
      {
        i18n: 'en_us',
        name: {
          zh_cn: '英文',
          en_us: 'English'
        }
      }
    ]
  },
  page: 20
};

export const environment = {
  production: false,
  bit
};
```

## BitConfig

`BitConfigService` 服务同样共有以下属性：


| 属性                          | 说明                                    | 类型                                | 默认值      |
| ----------------------------- | --------------------------------------- | ----------------------------------- | ----------- |
| `url.api`                     | 接口地址                                | `string`                            | `''`        |
| `url.static`                  | 静态资源地址                            | `string`                            | `''`        |
| `url.icon`                    | icon路径                                | `string`                            | `undefined` |
| `api.namespace`               | 接口命名空间                            | `string`                            | `''`        |
| `api.withCredentials`         | 是否携带 cookie                         | `bool`                              | `false`     |
| `api.upload`                  | 统一上传路径                            | `string`                            | `''`        |
| `api.uploadStorage`           | 上传存储                                | `'default' | 'oss' | 'obs' | 'cos'` | `'default'` |
| `api.uploadFetchSigned`       | 获取对象存储签名参数的请求              | `string`                            | `''`        |
| `api.uploadFetchSignedMethod` | 获取对象存储签名参数的请求Method        | `string`                            | `''`        |
| `api.uploadSize`              | 上传文件大小限制                        | `number`                            | `5120`      |
| `curd.*`                      | 请求处理默认 path                       | `string`                            | `''`        |
| `col.{$key}`                  | 定义统一栅格                            | `object`                            | `{}`        |
| `i18n.default`                | 多语言输入标识默认状态                  | `string`                            | `''`        |
| `i18n.contain`                | 多语言输入包含标识                      | `string[]`                          | `[]`        |
| `i18n.switch`                 | 多语言输入标识详情                      | `I18nOption[]`                      | `[]`        |
| `locale.default`              | 本地语言包标识默认状态                  | `string`                            | `''`        |
| `locale.mapping`              | 本地语言包标识与语言包文件索引映射      | `Map<number, string>`               | `null`      |
| `locale.bind`                 | 本地语言包标识与ng-zorro-antd语言包映射 | `Map<string, string>`               | `null`      |
| `page`                        | 分页请求的默认数量                      | `number`                            | `0`         |

- 如果静态资源为远程加载，则可以配置 `url.static`，这样可以通过 `BitService` 快捷的调用远程路径
- 如果 `url.icon` 不被定义，则会加载本地的 icon 路径；如果被定义则会加载远程地址，例如 `https://cdn.example.com/`
- 假设 `url.api` 接口地址定义为 `http://localhost:9501`，`api.namespace` 接口命名空间定义为 `/v1`，那么请求路径为 `http://localhost:9501/v1`；同理如果 `api.upload` 定义为 `/system/main/uploads`，那么上传路径则为 `http://localhost:9501/system/main/uploads`

### 定义统一栅格

在表单中常常出现重复的栅格定义，如遇到修改则更是增大了维护难度，此时就可以通过统一栅格解决问题，例如 `col.{$key}`，`key` 是统一栅格的标识索引，其定义遵循 `ng-zorro-antd` 的对象栅格：

```typescript
const col = {
  label: {
    nzXXl: 4,
    nzXl: 5,
    nzLg: 6,
    nzMd: 7,
    nzSm: 24
  },
  control: {
    nzXXl: 8,
    nzXl: 9,
    nzLg: 10,
    nzMd: 14,
    nzSm: 24
  },
  submit: {
    nzXXl: { span: 8, offset: 4 },
    nzXl: { span: 9, offset: 5 },
    nzLg: { span: 10, offset: 6 },
    nzMd: { span: 14, offset: 6 },
    nzSm: { span: 24, offset: 0 }
  }
};
```

### 多语言输入

多语言输入并非前端中显示的多语言，而是为表单组件提供多种语言提交的方式

- `default` 是 `BitI18nSwitchComponent` 多语言输入组件的默认语言
- `contain` 代表辅助框架中包含的多语言输入类型数组集合
- `switch` 是 `BitI18nSwitchComponent` 多语言输入组件的显示条件

```typescript
const i18n ={
  default: 'zh_cn',
  contain: ['zh_cn', 'en_us'],
  switch: [
    {
      i18n: 'zh_cn',
      name: {
        zh_cn: '中文',
        en_us: 'Chinese'
      }
    },
    {
      i18n: 'en_us',
      name: {
        zh_cn: '英文',
        en_us: 'English'
      }
    }
  ]
};
```

### 语言包显示

语言包显示即在前端中对多语言的显示，由 `locale` 控制

- `locale.default` 则是在前端中默认显示的语言标识
- `locale.mapping` 代表在定义语言包文件中的索引映射，例如：

```typescript
// 当 `locale.mapping` 定义为
const mapping = new Map<number, string>([
  [0, 'zh_cn'],
  [1, 'en_us']
]);

// 语言包则按照索引配置语言
export default {
  dashboard: ['仪表盘', 'Dashboard']
}
```

- `locale.bind` 则是绑定与ng-zorro-antd语言包映射，因为在多语言切换时将同时触发ng-zorro-antd组件语言的切换，例如：

```typescript
import { en_US, zh_CN } from 'ng-zorro-antd';

const bind = new Map<string, any>([
  ['zh_cn', zh_CN],
  ['en_us', en_US]
]);
```

## Method

`BitConfigService` 服务包含以下方法：

### setupLocales(packer: Promise< any >)

安装公共语言包，通常项目中需要定义公共语言包文件 `app.language.ts`，然后在根组件 `app.component.ts` 初始安装

- **packer** `Promise< any >` 导入的语言包文件

```typescript
import { Component, OnInit } from '@angular/core';
import { BitConfigService } from 'ngx-bit';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private config: BitConfigService
  ) {
  }

  ngOnInit() {
    this.config.setupLocales(import('./app.language'));
  }
}
```

### getLang(locale: string)

获取公共语言包中的一种语言

- **locale** `string` 语言标识

### setupHttpInterceptor(operate: OperatorFunction< any, any >)

设置请求拦截器

- **operate** `OperatorFunction< any, any >` Rxjs的operate工具

```typescript
import { Component, OnInit } from '@angular/core';
import { BitConfigService } from 'ngx-bit';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private config: BitConfigService
  ) {
  }

  ngOnInit() {
    this.config.setupHttpInterceptor(
      map(res => {
        return res;
      })
    );
  }
}
```

### getHttpInterceptor()

获取请求拦截器

- **return** `OperatorFunction< any, any >` Rxjs的operate工具