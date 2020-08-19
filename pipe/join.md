## Join 数组拼接为字符串

通过管道使用数组拼接为字符串

```
{{ value_expression | Join: symbol }}
```

### 输入值

- **value** `string[]` 字符串数组

### 参数

- **symbol** `string` 拼接符号

### 返回

- **Return** `string`

### 使用说明

假设存在一个字符串数组 `lists`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: string[] = [
    'nodejs', 'php', 'golang', 'java', 'python'
  ];

  ngOnInit(): void {
  }
}
```

那么可以通过该管道进行字符串拼接

```html
<p>{{lists|Join:'+'}}</p>

<!-- display nodejs+php+golang+java+python -->
```