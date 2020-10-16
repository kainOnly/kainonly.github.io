## Privacy 字符串脱敏

通过管道对字符串脱敏

```
{{ value_expression | Privacy: range }}
```

### 输入值

- **value** `string` 字符串

### 参数

- **range** `string` 切片范围

### 返回

- **Return** `string`

### 使用说明

假设存在一个待脱敏的字符串 `text`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  text = '123456789';

  ngOnInit(): void {
  }
}
```

针对该字符串3到6的索引进行脱敏

```html
<p>{{text|Privacy:'3,6'}}</p>

<!-- display 123***789 -->
```