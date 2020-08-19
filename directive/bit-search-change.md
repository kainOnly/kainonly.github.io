## bitSearchChange 搜索监听

为分页列表提供搜索监听功能

### 选择器

`[bitSearchChange]`

### 属性

`BitSearchChangeDirective` 组件包含以下属性指令：

| 属性                | 说明         | 类型                    | 默认值 |
| ------------------- | ------------ | ----------------------- | ------ |
| `[bitSearchChange]` | 分页列表对象 | `ListByPage`            | -      |
| `(after)`           | 搜索变动之后 | `EventEmitter<any>` | -      |

### 使用说明

监听包含 `NgModelChange` 的组件中

```typescript
@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('type')">
      <select
        [bitSearchChange]="lists"
        [(ngModel)]="lists.search['type'].value"
        (after)="after()"
      >
        <ng-container *ngFor="let option of options">
          <option [label]="option.label" [value]="option.value"></option>
        </ng-container>
      </select>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists: ListByPage;
  options: any[] = [
    { label: 'type1', value: 0 },
    { label: 'type1', value: 1 },
    { label: 'type2', value: 2 }
  ];

  constructor(
    private bit: BitService
  ) {
  }

  ngOnInit() {
    this.lists = this.bit.listByPage({
      id: 'test',
      query: [
        { field: 'type', op: '=', value: 0 }
      ]
    });
  }

  after() {
  }
}
```