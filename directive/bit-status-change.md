## bitStatusChange 状态切换

- **@Input() bitStatusChange** `Observable< any >` 状态切换请求
- **@Input() bitControl** `boolean` 是否手动处理返回提示，默认 `false`
- **@Output() response** `EventEmitter< any >` 获取请求的响应值

例如控制管理员的状态

```html
<nz-switch [(ngModel)]="data.status"
           [bitStatusChange]="ramService.status(data)"
           [bitControl]="true"
           (response)="status($event)">
</nz-switch>
```

自定义返回提示

```typescript
status(res: any) {
    switch (res.msg) {
        case 'error:self':
            this.notification.error(this.bit.l.operateError, this.bit.l.errorStatusSelf);
            break;
        default:
            this.notification.error(this.bit.l.operateError, this.bit.l.statusError);
    }
}
```