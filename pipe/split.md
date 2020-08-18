## Split 字符串分割为数组

通过管道使用字符串分割为数组

```
{{ value_expression | Split: symbol }}
```

- **value_expression** `string` 字符串
- **symbol** `string` 分割符号
- **Return** `string`

假设存在一个字符串集合 `text`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  text = '1|2|3|4|5|6';

  ngOnInit(): void {
  }
}
```

那么可以通过该管道进行字符串分割

```html
<ng-container *ngFor="let val of text|Split:'|'">
  <p>{{val}}</p>
</ng-container>
```