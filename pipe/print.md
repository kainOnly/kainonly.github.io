## Print 字符串模板

通过管道打印字符串模板，可适用于多语言模板

```
{{ value_expression | print: vars }}
```

### 输入值

- **value** `string` 字符串文本

### 参数

- **vars** `any[]` 变量，替换$0,$1,$2....$N

### 返回

- **Return** `string`

### 使用说明

假设存在一个语言包模板

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lang = `$0 是遵循 $1 设计规范的 $2 组件库`;

  ngOnInit(): void {
  }
}
```

打印语言包

```html
<p>{{lang|print:['ng-zorro-antd', 'Ant Design', 'Angular UI']}}</p>
<!-- display ng-zorro-antd 是遵循 Ant Design 设计规范的 Angular UI 组件库 -->
```