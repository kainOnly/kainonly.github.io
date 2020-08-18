## bitSearchChange 搜索监听

待更新

- **@Input() bitSearchChange** `string` 搜索命名
- **@Input() variable** `object` 局部搜索变量
- **@Output() after** `EventEmitter< any >` 搜索变动之后

监听包含 `NgModelChange` 的组件中

```html
<ng-container *ngIf="bit.hasSearch('name')">
  <nz-select [(ngModel)]="bit.search['name'].value"
      bitSearchChange="sys-index"
      (after)="getLists(true)">
      <nz-option [nzValue]="x.id" [nzLabel]="x.name"></nz-option>
  </nz-select>
</ng-container>
```