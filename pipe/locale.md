## Locale 语言包显示

通过管道选择语言包显示

```
{{ value_expression | Locale: locale }}
```

- **value_expression** `string | object` JSON字符串或JSON
- **locale** `string` 语言包标识
- **Return** `string`

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
<p>{{lang|Locale:'zh_cn'}}</p>
<!-- display 你好世界 -->
<p>{{lang|Locale:'en_us'}}</p>
<!-- display Hello World -->
```

!>当然如果 `lang` 为相同的json对象也可以输出相同的内容

在项目中的某个多语言字段，通常配置 `bit.locale` 实现输出控制

```html
<p>{{data.name|Locale:bit.locale}}</p>
```