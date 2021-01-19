## Undefined 未定义

通过管道判断变量是否被定义

```
{{ value_expression | Undefined }}
```

### 输入值

- **value** `any` 数值

### 返回

- **Return** `boolean`

### 使用说明

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
