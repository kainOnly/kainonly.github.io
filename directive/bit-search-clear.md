## bitSearchClear 搜索清除

待更新

- **@Input() bitSearchClear** `string` 搜索命名
- **@Input() variable** `object` 局部搜索变量
- **@Input() reset** `any` 清除重置的数值
- **@Output() after** `EventEmitter< any >` 清空搜索之后

注册搜索字段

```typescript
this.bit.registerSearch('api-index',
  {field: 'tag', op: '=', value: 0}, 
  {field: 'name', op: 'like', value: ''}
).subscribe(() => {
  
});
```

清空搜索绑定在按钮 `click` 事件

```html
<button nz-button
        bitSearchClear="api-index"
        (after)="getLists(true)">
  {{bit.l['clearSearch']}}
</button>

<button nz-button
        bitSearchClear="api-index"
        [reset]="{tag:0}"
        (after)="getLists(true)">
  {{bit.l['clearSearch']}}
</button>
```