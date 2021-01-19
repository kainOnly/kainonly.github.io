## Empty 空判断

通过管道判断数值是否为空

```
{{ value_expression | Empty }}
```

### 输入值

- **value** `any` 任何

### 返回

- **Return** `boolean`

### 使用说明

假设存在一个空数组 `lists`（`undefined` `''` `0` `false` `null` `[]` `{}` 都被判断为空）

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: any[] = [];

  ngOnInit(): void {
  }
}

```

在模版中判断使用

```html
<div *ngIf="lists|Empty">
  <!-- 数组为空显示内容 -->
</div>
```