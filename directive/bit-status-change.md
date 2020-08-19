## bitStatusChange 状态切换

为开关选择器提供状态请求切换功能

### 选择器

`[bitStatusChange]`

### 属性

`BitStatusChangeDirective` 组件包含以下属性指令：

| 属性                | 说明                 | 类型                | 默认值  |
| ------------------- | -------------------- | ------------------- | ------- |
| `[bitStatusChange]` | 状态切换请求         | `Observable<any>`   | -       |
| `[bitControl]`      | 是否手动处理返回提示 | `boolean`           | `false` |
| `(response)`        | 获取请求的响应值     | `EventEmitter<any>` | -       |


### 使用说明

为 `nz-switch` 创建状态请求切换功能

```typescript
@Component({
  template: `
    <nz-switch
      [(ngModel)]="data.status"
      [bitStatusChange]="testService.status(data)"
      [bitControl]="true"
      (response)="statusFeedback($event)"
    >
    </nz-switch>
  `
})
class TestComponent {
  data: any = {
    id: 1,
    status: true
  };

  constructor(
    public testService: TestService
  ) {
  }

  statusFeedback(event) {
  }
}
```
