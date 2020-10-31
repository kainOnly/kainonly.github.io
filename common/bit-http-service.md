## BitHttpService 请求处理

BitHttpService 请求处理是对 `HttpClient` 的封装，可以通过它快捷对接后端 CURD 接口，以下示例中 `http` 为 `BitHttpService` 服务的注入命名

## Method

`BitHttpService` 服务所包含以下方法：

### req(url: string, body: any = {}, method = 'post'): Observable< any >

创建请求对象

- **url** `string` 请求路由
- **body** `any` 发送数据
- **method** `string` 请求类型, 默认为 `post` 请求
- **Return**  `Observable< any >`

```typescript
// 例如：请求资源接口
http.req('main/resource').subscribe(res => {
    console.log(res);
});
```

### get(model: string, condition: number | string | SearchOption[], order?: OrderOption, path?: string): Observable< any >

创建获取单条数据的请求

- **model** `string` 模块名称
- **condition** `number | string | SearchOptions[]` 查询条件，当类型为 `number` 或 `string` 是将作为主键返回后端，若为 `SearchOptions[]` 则会组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
- **order** `OrderOption` 排序条件
- **path** `string` 自定义路径

```typescript
// 主键查询
http.get(this.model, id);
// 条件查询
http.get(this.model, [
  {field: 'username', op: '=', value: 'kain'}
])
```

### lists(model: string, factory: ListByPage, option: ListsOption, path?: string): Observable< any >

创建分页列表数据的请求

- **model** `string` 模块名称
- **factory** `ListByPage` 分页列表对象
- **option** `ListsOption`
  - **refresh** `boolean` 刷新，即重置分页
  - **persistence** `boolean` 持久存储，即记录分页历史
- **path** `string` 自定义路径

```typescript
const search = bit.listByPage({
  id: 'admin-index',
  query: [
    { field: 'sex', op: '=', value: 1 }
  ]
});

http.lists('admin', search, {
  refresh: true,
  persistence: true
})
```

### originLists(model: string, condition: SearchOption[] = [], order?: OrderOption, path?: string): Observable<any>

创建列表数据的处理

- **model** `string` 模块名称
- **condition** `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
- **order** `OrderOption` 排序条件
- **path** `string` 自定义路径

```typescript
http.originLists('admin');
```

### add(model: string, data: any, path?: string): Observable< any >

创建一个新增的处理

- **model** `string` 模块名称
- **data** `any` body 数据
- **path** `string` 自定义路径

```typescript
const data = {
  username: 'kain',
  email: 'zhangtqx@vip.qq.com'
};

http.add('admin', data);
```

### edit(model: string, data: any, condition?: SearchOptions[], path?: string): Observable< any >

创建一个编辑的处理

- **model** `string` 模块名称
- **data** `any` body 数据
- **condition** `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
- **path** `string` 自定义路径

```typescript
const data = {
  id: 1,
  username: 'kain',
  email: 'kainonly@qq.com'
};

http.edit('admin', data);

// 当没有主键时，需要设置 condition
const condition = [
  {field: 'username', op: '=', value: 'kain'}
];
const data = {
  email: 'kainonly@qq.com'
};

http.edit('admin', data, condition);
```

### status(model: string, data: any, field = 'status', extra?: any, path?: string): Observable< any >

创建状态切换的请求，状态将以相反的数值提交给后端

- **model** `string` 模块名称
- **data** `any` body 数据
- **field** `string` 状态字段，默认 `status`
- **extra** `any` 扩展字段
- **path** `string` 自定义路径

```typescript
const data = {
  id: 1,
  status: true
};
// 此时将为后端传递的 status 为 false
http.status('admin', data);

// 如果状态字段为线上 online 可以这样设定
const data = {
  id: 1,
  online: true
};

http.status('admin', data, 'online');

// 假设它必须要增加一段关键的字段，则可以
const data = {
  id: 1,
  online: true
};
// 此时 {key:'a123'} 将合并入 body 内提交后端
http.status('admin', data, 'online', {
  key:'a123'
});
```

### delete(model: string, id?: any[], condition?: SearchOption[], path?: string): Observable< any >

创建删除的请求，`id` 与 `condition` 两者必须选一种

- **model** `string` 模块名称
- **id** `any[]` 主键数组
- **condition** `SearchOptions[]` 条件数组，组合成 Laravel Query 的条件数组以 `where` 返回后端（ThinkPHP 同样支持）
- **path** `string` 自定义路径

```typescript
// 使用主键数组删除
http.delete('admin', [1]);
// 使用条件数组删除
http.delete('admin', undefined, [
  { field: 'username', op: '=', value: 'kain' }
]);
```
