## bit-i18n-switch 多语言切换器

提供应用表单多语言切换器，使表单组件具备多语言输入

### 组件

`<bit-i18n-switch (i18nChange)="change($event)"></bit-i18n-switch>`

### 属性

`BitI18nSwitchComponent` 组件包含以下属性指令：

| 属性           | 说明               | 类型                   | 默认值 |
| -------------- | ------------------ | ---------------------- | ------ |
| `(i18nChange)` | 监听 i18n 值的变化 | `EventEmitter<string>` | -      |

### 使用说明

例如，控制表单内所有多语言输入组件，在页头加入 `bit-i18n-switch`

```html
<nz-page-header nzBackIcon (nzBack)="bit.back()" [nzTitle]="bit.support.title|Locale:bit.locale">
    <nz-page-header-extra>
        <!-- 这里使用 -->
        <bit-i18n-switch></bit-i18n-switch>
    </nz-page-header-extra>
</nz-page-header>

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