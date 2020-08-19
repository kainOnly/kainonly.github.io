## bit-i18n-tooltip 多语言提示

提供应用表单多语言输入的语言输入缺失提示

### 组件

`<bit-i18n-tips #i18nTips groupName="name_expression"></bit-i18n-tips>`

### 属性

`BitI18nTooltipComponent` 组件包含以下属性指令：

| 属性        | 说明                | 类型               | 默认值 |
| ----------- | ------------------- | ------------------ | ------ |
| `ref`       | 多语言提示模板      | `TemplateRef<any>` | -      |
| `groupName` | 多语言FormGroupName | `string`           | -      |

### 使用说明

例如，将 `tooltip` 提供给 `[nz-tooltip]`

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
                <!-- 这里使用 -->
                <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
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
