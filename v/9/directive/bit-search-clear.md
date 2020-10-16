## bitSearchClear 搜索清除

为分页列表提供搜索清除功能

### 选择器

`[bitSearchClear]`

### 属性

`BitSearchClearDirective` 组件包含以下属性指令：

| 属性               | 说明         | 类型                    | 默认值 |
| ------------------ | ------------ | ----------------------- | ------ |
| `[bitSearchClear]` | 分页列表对象 | `ListByPage`            | -      |
| `[reset]`          | 重置的数值   | `any`                   | -      |
| `(after)`          | 搜索变动之后 | `EventEmitter<any>` | -      |


### 使用说明

为 `button` 创建分页列表搜索清除功能

```typescript
@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('type')">
      <select
        [bitSearchChange]="lists"
        [(ngModel)]="lists.search['type'].value"
      >
        <ng-container *ngFor="let option of options">
          <option [label]="option.label" [value]="option.value"></option>
        </ng-container>
      </select>
      <button
        [bitSearchClear]="lists"
        (after)="after()"
      >
        测试清除
      </button>
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
