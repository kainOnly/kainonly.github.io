## 操作库

辅助框架还提供一些常用到的操作库

### asyncValidator(req: Observable<any>, field = 'duplicated'): Observable< any > 

创建异步验证器

- **req** `Observable<any>` 请求对象
- **field** `string` 自定义返回

假设验证key字段是否唯一，`response` 是模拟请求的响应值，通常这样使用请求服务

```typescript
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { asyncValidator } from 'ngx-bit/operates';
import { of } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      key: [null, [], [this.existsKey]]
    });
  }

  existsKey = (control: AbstractControl) => {
    const response = of({
      error: 0,
      data: true
    });
    return asyncValidator(response);
  };
}
```

### emptyArray(array: any[])

判断数组是否为空

- **array** `any[]` 数组
- **Return** `boolean`

``` typescript
const data = [];

emptyArray(data);
// true
```

### emptyObject(object: any)

判断对象是否为空

- **object** `any` 对象
- **Return** `boolean`

``` typescript
const data = {};

emptyObject(data);
// true

emptyObject([]);
// false
```

### factoryBitConfig(config: BitConfig)

生产 `BitConfigService` 所需的必要配置，通常使用在环境配置文件中，例如 `src\environments\environment.ts`

- **config** `BitConfig` 详情查看 [BitConfigService 统一配置](common/bit-config-service?id=bitconfig)

```typescript
import { en_US, zh_CN } from 'ng-zorro-antd';
import { factoryBitConfig } from 'ngx-bit/operates';

const bit = factoryBitConfig({
  url: {
    api: 'http://localhost:9501',
    static: 'https://cdn.example.com/',
    icon: 'https://cdn.example.com/'
  },
  api: {
    namespace: '/system',
    upload: '/system/main/uploads',
    withCredentials: true
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
});

export const environment = {
  production: false,
  bit
};
```

### factoryLocales(dataset: object, mapping: Map< number, string >)

生产语言包工具

- **dataset** `object` 语言包数据源
- **mapping** `Map<number, string>` 语言包文件中的索引映射

```typescript
import('../common.language').then(result => {
    const lang = factoryLocales(result.default, environment.bit.locale.mapping);
});
```

### getQuerySchema(options: SearchOption[]): any[]

通过 `SearchOption[]` 组合成 Laravel Query 的条件数组（ThinkPHP 同样支持）

- **options** `SearchOption[]` 条件数组

```typescript
let schema = getQuerySchema([
    { field: 'username', op: '=', value: '' }
]);

// console: []

schema = getQuerySchema([
    { field: 'username', op: '=', value: '', must: true }
]);

// console: ['username', '=', '']]

schema = getQuerySchema([
    { field: 'username', op: '=', value: 'kain' }
]);

// console: [['username', '=', 'kain']]

schema = getQuerySchema([
    { field: 'username', op: '=', value: null },
    { field: 'type', op: '=', value: 0 },
    { field: 'ids', op: 'in', value: [] },
    { field: 'error', op: '=', value: {} }
]);

// console: []
```

### getSelectorFormUrl(url: string, match: any[])

通过URL获取路由标签

- **url** `string` URL地址
- **match** `any[]` 筛选规则

```typescript
let key = getSelectorFormUrl('/%7Bacl-index%7D', ['%7B', '%7D']);

// console: acl-index

key = getSelectorFormUrl('/%7Bacl-edit%7D/1', ['%7B', '%7D']);

// console: acl-edit

key = getSelectorFormUrl('/%7Bacl-edit%7D/1/2', ['%7B', '%7D']);

// console: acl-edit
```

### validate(schema: string | boolean | object, data: any): any

JSONSchema 验证器

- **schema** `string | boolean | object` 验证规则
- **data** `any` 验证数据

```typescript
let valid = validate({
    enum: [1, 2, 3, 4]
}, 1);

// console: valid.error false

valid = validate({
    enum: [1, 2, 3, 4]
}, 5);

// console: valid.error true
```