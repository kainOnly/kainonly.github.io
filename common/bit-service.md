## BitService 助手工具

BitService 是辅助架构中的助手工具，以下示例中 `bit` 为 `BitService` 服务的注入命名

## Property

`BitService` 服务所包含以下属性：

| 属性          | 说明                 | 类型                | 默认值 |
| ------------- | -------------------- | ------------------- | ------ |
| `static`      | 静态资源地址         | `string`            | `''`   |
| `uploads`     | 组合后的统一上传路径 | `string`            | `''`   |
| `locale`      | 多语言标识           | `string`            | `''`   |
| `l`           | 语言包索引           | `object`            | `{}`   |
| `i18n`        | 多语言输入标识       | `string`            | `''`   |
| `i18nTooltip` | 多语言输入提示       | `I18nTooltipOption` | `{}`   |
| `i18nContain` | 多语言输入类型集合   | `string[]`          | `[]`   |

- `uploads` 为组合后的统一上传路径（即接口地址+统一上传路径），通常可以直接使用在 `nz-upload` 组件中

```html
<!-- 使用在nzAction -->
<nz-upload 
    nzName="image"
    [nzAction]="bit.uploads"
    [nzWithCredentials]="config.api.withCredentials"
    [nzSize]="5120"
    [nzShowUploadList]="false">
</nz-upload>
<!-- 使用更简洁的方式实现相同定义 -->
<nz-upload 
    nzName="image"
    bitUpload
    [nzShowUploadList]="false">
</nz-upload>
```

- `locale` 为当前多语言标识状态通常使用在 `ObjectPipe`，例如：

```html
{{name|object:bit.locale}}
```

- `l` 为语言包索引，在组件完成语言包注册后可在模板中使用，例如：

```html
{{bit.l['dashboards']}}
```

- `i18nContain` 为多语言输入类型集合，通常可以用来筛选多语言输入的ID，例如：

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
        {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control 
        *ngIf="bit.equalI18n(x)" 
        bitFormControlCol 
        nzHasFeedback>
        <input 
            nz-input 
            [formControlName]="x"
        />
    </nz-form-control>
    </ng-container>
</nz-form-item>
```

## Method

`BitService` 服务所包含以下方法：

### open(urlTree: any[], extras?: NavigationExtras)

`navigate` 路由导航的扩展，为跨级导航作为基础持久记录其路由参数

- **urlTree** `any[]` urlTree
- **extras** `NavigationExtras` 修改导航策略的选项

```typescript
bit.open(['admin-edit', 1]);
```

### crossLevel(selector: string)

路由跨级导航，当执行跨越导航时没有更好的方式记录其参数，此时配合 `open` 与 `crossLevel` 就能解决问题，例如：

- **selector** `string` 路由标签

```typescript
// 假设导航至/{team-index}/1
bit.open(['team-index', 1]);
// 再从/{team-index}/1导航至/{team-index}/1/services/T100
bit.open(['team-index', 1, 'services', 'T100'])
// 此时使用crossLevel，可导航至/{team-index}/1
bit.crossLevel('team-index');
```

!> 当然这种场景是极少的，返回上一级有时可以解决问题，但特殊的面包屑就需要使用跨级导航，因此不建议采用这么深的层级构建导航路径

### back()

返回上一级，并重置 `i18n` 多语言输入标识

```typescript
// 导航至/{admin-index}
bit.open(['admin-index']);
// 再从/{admin-index}导航至/{admin-edit}/1
bit.open(['admin-edit', 1]);
// 返回至/{admin-index}
bit.back();
```

### registerLocales(packer: Promise< any >)

局部注册语言包，将局部语言包加工与公共语言包合并，再提供给 `bit.l`，通常文件定义在组件内 `language.ts`

- **packer** `Promise< any >` 导入的语言包文件

```typescript
import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
  }
}
```

### setLocale(locale: string)

设置多语言标识，即前端显示的多语言

- **locale** `string` 语言包标识

```typescript
import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
  }

  switchToEnglish() {
    this.bit.setLocale('en_us');
  }
}
```

### listByPage(option: ListByPageOption): ListByPage

生成分页列表对象，关于 [ListByPage](/factory/list-by-page) 的详情

- **option** `ListByPageOption` 分页列表参数

```typescript
import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'welcome',
      query: [
        { field: 'type', op: '=', value: 0 }
      ]
    });
  }
}
```

### equalI18n(i18n: string): boolean

判断多语言输入标识是否相等

- **i18n** `string` 多语言输入标识

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
        {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let ID of bit.i18nContain">
        <nz-form-control 
            *ngIf="bit.equalI18n(ID)" 
            bitFormControlCol 
            nzHasFeedback>
            <input 
                nz-input 
                [placeholder]="bit.l['namePlaceholder']"
                [formControlName]="ID"
            />
        </nz-form-control>
    </ng-container>
</nz-form-item>
```

### resetI18n()

重置多语言输入标识，即恢复默认的i18n

```typescript
this.bit.resetI18n();
```

### i18nGroup(options: I18nGroupOption): any

多语言输入 `FormGroup` 初始化

- **options** `I18nGroupOptions` 多语言组件参数
    - **value** `object` 默认值
      - **${ID}** `array` 属于某个多语言标识的数值
    - **validate** `object` 同步验证器数组
      - **${ID}** `array` 属于某个多语言标识的同步验证器
    - **asyncValidate** `object` 异步验证器数组
      - **${ID}** `array` 属于某个多语言标识的异步验证器

```typescript
import { Component, OnInit } from '@angular/core';
import { BitService } from 'ngx-bit';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.group(this.bit.i18nGroup({
        value: {
          zh_cn: '测试',
          en_us: 'TEST'
        },
        validate: {
          zh_cn: [Validators.required],
          en_us: []
        },
        asyncValidate: {
          en_us: [this.fun1]
        }
      }))
    });
  }

  fun1: AsyncValidatorFn = (control: AbstractControl) => {
    return of({ error: true, duplicated: true });
  };
}
```
