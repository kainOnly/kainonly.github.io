## bitI18nUpdate 多语言输入更新

协助应用表单的多语言输入组件更新状态，为 `bit-i18n-tooltip` 多语言提示提供支持

### 选择器

`[bitI18nUpdate]`

### 使用说明

为 FormGroup 为 name 的多语言输入组件进行状态更新

```html
<nz-card>
    <form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
        <!-- 这里使用 -->
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