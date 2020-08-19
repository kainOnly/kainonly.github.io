## EmptyObject 空对象

通过管道判断对象是否为空

```
{{ value_expression | EmptyObject }}
```

### 输入值

- **value** `any` 对象

### 返回

- **Return** `boolean`

### 使用说明

假设存在一个空对象 `data`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  data: any = {};

  ngOnInit(): void {
  }
}

```

在模版中判断使用

```html
<div *ngIf="data|EmptyObject">
  <!-- 对象为空显示内容 -->
</div>
```

!> 当对象为空数组同样会返回 `false`