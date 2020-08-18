## JSONParse 字符串转对象

通过管道字符串转对象，字符串必须为json数据

```
{{ value_expression | JSONParse }}
```

- **value_expression** `string` JSON字符串
- **Return** `any`

有时数据并不是那么友好，例如返回的字段中JSON为字符串

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: any = [
    { id: 1, extra: '{"ttl":3600,"on":true,"plus":20}' },
    { id: 2, extra: '{"ttl":1800,"on":false,"plus":10}' }
  ];

  ngOnInit(): void {
  }
}
```

在这种情况下直接使用管道可以减少遍历处理

```html
<ng-container *ngFor="let x of lists">
  <p>{{(x.extra|JSONParse)['ttl']}}</p>
</ng-container>
```