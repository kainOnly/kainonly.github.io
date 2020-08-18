## bitFormSubmit 表单提交

待更新

- **@Output() bitFormSubmit** `EventEmitter< any >` 监听表单提交

在表单中使用

```html
<form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    ....
</form>
```

```typescript
form: FormGroup;

constructor(private fb: FormBuilder) {
}

this.form = this.fb.group({...});

submit(data) {...}
```