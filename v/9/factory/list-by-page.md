## ListByPage 分页列表

ListByPage 提供了分页列表结构所需的基本条件，创建通常需要 `BitService` 协助，例如：

```typescript
import { Component, OnInit } from '@angular/core';
import { ListByPage } from 'ngx-bit/factory';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  lists: ListByPage;

  constructor(
    public bit: BitService
  ) {
  }

  ngOnInit(): void {
    this.lists = this.bit.listByPage({
      id: 'test',
      limit: 10,
      query: [
        { field: 'username', op: '=', value: '' }
      ]
    });
  }

}
```

## Property

`ListByPage` 所包含以下属性：

| 属性            | 说明                     | 类型                                | 默认值  |
| --------------- | ------------------------ | ----------------------------------- | ------- |
| `search`        | 搜索字段定义             | `{ [field: string]: SearchOption }` | `{}`    |
| `data`          | 分页列表数据             | `any[]`                             | `[]`    |
| `loading`       | 分页列表加载状态         | `boolean`                           | `true`  |
| `limit`         | 分页记录数量             | `number`                            | `0`     |
| `totals`        | 分页总数                 | `number`                            | `0`     |
| `index`         | 分页页码                 | `number`                            | `1`     |
| `checked`       | 分页列表是否全被选中     | `boolean`                           | `false` |
| `indeterminate` | 分页列表是否不完全被选中 | `boolean`                           | `false` |
| `batch`         | 是否可进行批量处理       | `boolean`                           | `false` |
| `checkedNumber` | 分页列表被选中的数量     | `number`                            | `0`     |

## Method

`ListByPage` 所包含以下方法：

### setData(data: any[])

设置分页列表数据

- **data** `any[]` 数据源

当分页列表请求返回时设置

```typescript
getLists(refresh = false) {
    service.lists(
        this.lists,
        refresh,
        event !== undefined
    ).subscribe(data => {
        this.lists.setData(data);
    });
}
```

### hasSearch(field: string)

判断是否包含该字段的搜索条件

- **field** `string` 字段名称

通常这被使用在模板上

```html
<nz-space-item *ngIf="lists.hasSearch('username')">
    <nz-input-group nzSearch [nzAddOnAfter]="nzAddOnAfter" style="width: 320px">
    <input
        nz-input
        [bitSearchStart]="lists"
        [placeholder]="bit.l['search']"
        [(ngModel)]="lists.search['username'].value"
        (after)="getLists(true)"
    >
    </nz-input-group>
    <ng-template #nzAddOnAfter>
    <button
        nzSearch
        nz-button nzType="primary"
        [bitSearchStart]="lists"
        (after)="getLists(true)"
    >
        <i nz-icon nzType="search"></i>
    </button>
    </ng-template>
</nz-space-item>
```

### afterSearch(): Observable< any >

主动触发搜索变动之后

- **Return** `Observable<any>`

在不是 `bit-search-change` 与 `bit-search-start` 指令触发的情况下，就需要主动执行：

```typescript
this.lists.afterSearch().subscribe(status => {
    // ...
});
```

### clearSearch(reset: any = {}): Observable< any >

主动触发搜索清空之后

- **reset** `any` 重置的数值
- **Return** `Observable<any>`

在不是 `bit-search-clear` 指令触发的情况下，就需要主动执行：

```typescript
this.lists.clearSearch({
    username: ''
}).subscribe(status => {
    // ...
});
```

### refreshStatus()

更新分页列表状态，即是否全部选中、不完全选中、是否可执行批量与选中数量，通常列表数据中发生变化需主懂执行

```html
<nz-table
  #table
  [nzData]="lists.data"
  [nzLoading]="lists.loading"
  [nzTotal]="lists.totals"
  [nzPageSize]="lists.limit"
  [nzFrontPagination]="false"
  [(nzPageIndex)]="lists.index"
  (nzPageIndexChange)="getLists()"
  nzSize="middle"
>
  <thead>
  <tr>
    <th nzShowCheckbox nzWidth="65px"
        [(nzChecked)]="lists.checked"
        [nzIndeterminate]="lists.indeterminate"
        (nzCheckedChange)="lists.checkedAll($event)"></th>
    <th>{{bit.l['username']}}</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let data of table.data">
    <!-- 这里执行 -->
    <td nzShowCheckbox
        [(nzChecked)]="data.checked"
        (nzCheckedChange)="lists.refreshStatus()"></td>
    <td>{{data.username}}</td>
  </tr>
  </tbody>
</nz-table>
```

### checkedAll(event: boolean)

更改所有分页列表选中状态

- **event** `boolean` 选中状态

可附加在主选择器的状态监听中

```html
<nz-table
  #table
  [nzData]="lists.data"
  [nzLoading]="lists.loading"
  [nzTotal]="lists.totals"
  [nzPageSize]="lists.limit"
  [nzFrontPagination]="false"
  [(nzPageIndex)]="lists.index"
  (nzPageIndexChange)="getLists()"
  nzSize="middle"
>
  <thead>
  <tr>
    <!-- 这里执行 -->
    <th nzShowCheckbox nzWidth="65px"
        [(nzChecked)]="lists.checked"
        [nzIndeterminate]="lists.indeterminate"
        (nzCheckedChange)="lists.checkedAll($event)"></th>
    <th>{{bit.l['username']}}</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let data of table.data">
    <td nzShowCheckbox
        [(nzChecked)]="data.checked"
        (nzCheckedChange)="lists.refreshStatus()"></td>
    <td>{{data.username}}</td>
  </tr>
  </tbody>
</nz-table>
```

### getChecked(): any[]

返回所有被选中的列表

- **Return** `any[]`

```typescript
const checkedLists = this.lists.getChecked();
```

### getPage(): Observable< any >

获取当前的页码

- **Return** `Observable<any>`

```typescript
this.lists.getPage().subscribe(index => {
    // index
});
```

### persistence()

执行分页页码的持久化记录

```typescript
this.lists.persistence();
```

### toQuerySchema(): any[]

将 `search` 组合成 Laravel Query 的条件数组（ThinkPHP 同样支持）

```typescript
const schema = this.lists.toQuerySchema();

// console: []
```