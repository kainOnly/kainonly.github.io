## Privacy 字符串脱敏

通过管道对字符串脱敏

```
{{ value_expression | Privacy: range }}
```

- **value_expression** `string` 字符串
- **range** `string` 切片范围
- **Return** `string`

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