# 管道

## Undefined 未定义

通过管道判断变量是否被定义

```
{{ value_expression | Undefined }}
```

- value `any` 数值
- Return `boolean`

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

## EmptyArray 空数组

通过管道判断数组是否为空

```
{{ value_expression | EmptyArray }}
```

- value `any[]` 数组
- Return `boolean`

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

## EmptyObject 空对象

通过管道判断对象是否为空

```
{{ value_expression | EmptyObject }}
```

- value `any` 对象
- Return `boolean`

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

当对象为空数组同样会返回 `false`

## Split 字符串分割为数组

通过管道使用字符串分割为数组

```
{{ value_expression | Split: symbol }}
```

- value `string` 字符串
- symbol `string` 分割符号
- Return `string`

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

## Join 数组拼接为字符串

通过管道使用数组拼接为字符串

```
{{ value_expression | Join: symbol }}
```

- value `string[]` 字符串数组
- symbol `string` 拼接符号
- Return `string`

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

## Locale 语言包显示

通过管道选择语言包显示

```
{{ value_expression | Locale: locale }}
```

- value `string | object` JSON字符串或JSON
- locale `string` 语言包标识
- Return `string`

假设存在一个多语言JSON字符串 `lang`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lang = `{"zh_cn":"你好世界","en_us":"Hello World"}`;

  ngOnInit(): void {
  }
}
```

如果指定某个语言为默认的显示

```html
<p>{{lang|Locale:'zh_cn'}}</p>
<!-- display 你好世界 -->
<p>{{lang|Locale:'en_us'}}</p>
<!-- display Hello World -->
```

!>当然如果 `lang` 为相同的json对象也可以输出相同的内容

在项目中的某个多语言字段，通常配置 `bit.locale` 实现输出控制

```html
<p>{{data.name|Locale:bit.locale}}</p>
```

## JSONParse 字符串转对象

通过管道字符串转对象，字符串必须为json数据

```
{{ value_expression | JSONParse }}
```

- value `string` JSON字符串
- Return `any`

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

## Privacy 字符串脱敏

通过管道对字符串脱敏

```
{{ value_expression | Privacy: range }}
```

- value `string` 字符串
- range `string` 切片范围
- Return `string`

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
