## bitI18nUpdate 多语言联动验证

待更新

```html
<nz-form-item formGroupName="name">
    <nz-form-label bitFormLabelCol nzRequired>
    {{bit.l['name']}}
    </nz-form-label>
    <ng-container *ngFor="let x of bit.i18nContain">
    <nz-form-control *ngIf="bit.equalI18n(x)"
                        nzHasFeedback
                        bitFormControlCol
                        [nzErrorTip]="name.ref">
        <input nz-input
                bitI18nUpdate
                [nz-tooltip]="tooltip.ref"
                [formControlName]="x"
                [placeholder]="bit.l['namePlaceholder']"/>
        <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
        <bit-error-tip #name [hasError]="{
            required:bit.l['nameRequire']
        }"></bit-error-tip>
    </nz-form-control>
    </ng-container>
</nz-form-item>
```