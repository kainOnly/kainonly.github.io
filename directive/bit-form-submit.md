## bitFormSubmit 表单提交

协助应用表单提交时自动进行controls的 `markAsDirty` `updateValueAndValidity`

### 选择器

`[bitFormSubmit]`

### 属性

`BitFormSubmitDirective` 组件包含以下属性指令：

| 属性              | 说明         | 类型                | 默认值 |
| ----------------- | ------------ | ------------------- | ------ |
| `(bitFormSubmit)` | 监听表单提交 | `EventEmitter<any>` | -      |

### 使用说明

首先定义组件表单提交

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: []
    });
  }

  submit(data) {
    // output data
  }
}
```

再为组件定义模板

```html
<form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
  <nz-form-item>
    <nz-form-label bitCol="label">
      Name
    </nz-form-label>
    <nz-form-control bitCol="control" nzHasFeedback>
      <input nz-input formControlName="name"/>
    </nz-form-control>
  </nz-form-item>
  <nz-form-item>
    <nz-form-control bitCol="submit">
      <nz-space>
        <nz-space-item>
          <button nz-button nzType="primary" [disabled]="!form.valid">
            <i nz-icon nzType="check"></i> Submit
          </button>
        </nz-space-item>
      </nz-space>
    </nz-form-control>
  </nz-form-item>
</form>
```

当表单提交时将触发 `submit($event)`