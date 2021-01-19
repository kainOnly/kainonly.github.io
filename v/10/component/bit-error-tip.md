## bit-error-tip 验证错误提示

提供应用表单组件的验证错误提示方式

### 组件

`<bit-error-tip #errorTip [hasError]="{}"></bit-error-tip>`

### 属性

`BitErrorTipComponent` 组件包含以下属性指令：

| 属性       | 说明             | 类型               | 默认值 |
| ---------- | ---------------- | ------------------ | ------ |
| `ref`      | 验证错误提示模板 | `TemplateRef<any>` | -      |
| `hasError` | errors 错误信息  | `object`           | -      |


### 使用说明

例如，将验证错误提示提供给 `nz-form-control` 的 `[nzErrorTip]`

```html
<nz-card>
    <form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
        <nz-form-item formGroupName="name" bitI18nUpdate>
            <nz-form-label bitCol="label" nzRequired>
                <span>
                    {{bit.l['name']}}
                    <i 
                        nz-icon
                        nz-tooltip
                        [nzTooltipTitle]="bit.l['i18n']"
                        nzType="translation"
                        nzTheme="outline">
                    </i>
                </span>
            </nz-form-label>
            <ng-container *ngFor="let x of bit.i18nContain">
            <nz-form-control 
                *ngIf="bit.equalI18n(x)"
                nzHasFeedback
                bitCol="control"
                [nzValidatingTip]="bit.l['validating']"
                [nzErrorTip]="name.ref"
            >
                <input 
                    nz-input
                    [nz-tooltip]="tooltip.ref"
                    [formControlName]="x"
                    [placeholder]="bit.l['namePlaceholder']"
                />
                <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
                <!-- 这里使用 -->
                <bit-error-tip #name [hasError]="{
                    required:bit.l['nameRequire'],
                    duplicated:bit.l['nameDuplicated']
                }"></bit-error-tip>
            </nz-form-control>
            </ng-container>
        </nz-form-item>
    </form>
</nz-card>
```