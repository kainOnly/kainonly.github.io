## EmptyArray 空数组

通过管道判断数组是否为空

```
{{ value_expression | EmptyArray }}
```

- **value** `any[]` 数组
- **Return** `boolean`

假设存在一个空数组 `lists`

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
<div *ngIf="lists|EmptyArray">
  <!-- 数组为空显示内容 -->
</div>
```
