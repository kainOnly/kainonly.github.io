## bitSearchStart 搜索触发

为分页列表提供搜索触发功能，触发事件为 `click` 与 `keydown.enter`

### 选择器

`[bitSearchStart]`

### 属性

`BitSearchStartDirective` 组件包含以下属性指令：

| 属性               | 说明         | 类型                    | 默认值 |
| ------------------ | ------------ | ----------------------- | ------ |
| `[bitSearchStart]` | 分页列表对象 | `ListByPage`            | -      |
| `(after)`          | 搜索变动之后 | `EventEmitter<any>` | -      |

### 使用说明

为 `input` 与 `button` 创建分页列表搜索触发功能

```typescript
@Component({
  template: `
    <ng-container *ngIf="lists.hasSearch('username')">
      <input
        [bitSearchStart]="lists"
        [(ngModel)]="lists.search['username'].value"
        (after)="after()"
      />
      <button
        [bitSearchStart]="lists"
        (after)="after()"
      >
        搜索
      </button>
    </ng-container>
  `
})
class TestComponent implements OnInit {
  lists: ListByPage;

  constructor(
    private bit: BitService
  ) {
  }

  ngOnInit() {
    this.lists = this.bit.listByPage({
      id: 'test',
      query: [
        { field: 'username', op: '=', value: '' }
      ]
    });
  }

  after() {
  }
}
```