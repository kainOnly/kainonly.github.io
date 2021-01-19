## Operates 操作库

辅助框架还提供一些常用到的操作库

### asyncValidator(handle: Observable<boolean>, field = 'duplicated', dueTime = 500): Observable< any >

创建异步验证器

- **handle** `Observable<boolean>` 返回验证结果
- **field** `string` 自定义返回
- **dueTime** `number` 防抖动延时，默认 `500` ms

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
    const handle = of(true);
    return asyncValidator(handle);
  };
}
```

### empty(value: any): boolean

判断是否为空

- **value** `any` 数值
- **Return** `boolean`

``` typescript
empty(undefined);
// true
empty('');
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

### print(str: string, ...vars: any): string

字符串模板，可适用于多语言模板

- **str** `string` 字符串文本
- **vars** `any[]` 变量，替换$0,$1,$2....$N

```typescript
print('$0 是遵循 $1 设计规范的 $2 组件库','ng-zorro-antd', 'Ant Design', 'Angular UI');

// ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库
```

### privacy(text: string, start: number, end: number): string

字符串脱敏

- **text** `string` 文本
- **start** `number` 起始索引
- **end** `number` 结束索引

```typescript
privacy('123456789', 3, 6);

// 123***789
```