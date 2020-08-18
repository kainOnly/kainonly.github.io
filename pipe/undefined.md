## Undefined 未定义

通过管道判断变量是否被定义

```
{{ value_expression | Undefined }}
```

- **value_expression** `any` 数值
- **Return** `boolean`

假设存在一个未定义变量 `data`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  data: any;

  ngOnInit(): void {
  }
}
```

在模版中判断使用

```html
<div *ngIf="data|Undefined">
  <!-- 未定义显示内容 -->
</div>
```
