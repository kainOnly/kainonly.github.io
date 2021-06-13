## Operates 操作库

辅助框架还提供一些常用到的操作库

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
