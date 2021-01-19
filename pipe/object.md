## object 转换对象

通过管道转换对象，目标可以是JSON字符串或对象，也可作用语言包显示

```
{{ value_expression | object?: locale }}
```

### 输入值

- **value** `string | object` JSON字符串或JSON

### 参数

- **locale** `string` 语言包标识

### 返回

- **Return** `string`

### 使用说明

假设存在一个多语言JSON字符串 `lang`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lang = `{"zh_cn":"你好世界","en_us":"Hello World"}`;

  ngOnInit(): void {
  }
}
```

如果指定某个语言为默认的显示

```html
<p>{{lang|object:'zh_cn'}}</p>
<!-- display 你好世界 -->
<p>{{lang|object:'en_us'}}</p>
<!-- display Hello World -->
```

当然如果 `lang` 为相同的json对象也可以输出相同的内容，在项目中的某个多语言字段，通常配置 `bit.locale` 实现输出控制

```html
<p>{{data.name|object:bit.locale}}</p>
```

`object` 也可以用于JSON显示，有时数据返回并不是那么友好，例如返回的字段中JSON为字符串

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: any = [
    { id: 1, extra: '{"ttl":3600,"on":true,"plus":20}' },
    { id: 2, extra: '{"ttl":1800,"on":false,"plus":10}' }
  ];

  ngOnInit(): void {
  }
}
```

在这种情况下可直接使用管道

```html
<ng-container *ngFor="let x of lists">
  <p>{{(x.extra|object)['ttl']}}</p>
</ng-container>
```