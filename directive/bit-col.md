## bitCol 栅格标识

在表单中使用

```html
<nz-form-item>
  <nz-form-label bitCol="label" nzRequired>
    {{bit.l['status']}}
  </nz-form-label>
  <nz-form-control bitCol="control">
    <nz-switch 
        formControlName="status"
        [nzCheckedChildren]="bit.l['on']"
        [nzUnCheckedChildren]="bit.l['off']">
    </nz-switch>
  </nz-form-control>
</nz-form-item>
```

