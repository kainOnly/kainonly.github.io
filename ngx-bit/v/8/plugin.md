# 插件扩展

## StorageService 本地存储

### clear()

清除框架使用的本地存储

```typescript
this.storage.clear();
```

### putResource(resource: Map< string, any >, router: Map< string, any >)

将资源数据保存在本地存储中

- resource `Map< string, any >` 资源数据
- router `Map< string, any >` 路由数据

```typescript
this.mainService.resource().subscribe((data) => {
  this.storageService.putResource(data.resource, data.router);
});
```

### setup(router: Router, match = ['%7B', '%7D'])

安装框架存储支持：计算面包屑、存储历史分页等

- router `Router` 应用 `Router` 对象
- match `string[]` 路由标签获取符，默认`['%7B', '%7D']`

```typescript
this.storageService.setup(this.router);
```

### destory()

销毁框架存储支持

```typescript
this.storageService.destory();
```

---

## SwalService 提示框

基于 sweetalert2 的提交反馈栏

### addAlert(res: any, form: FormGroup, reset?: any, customize?: AlertCustomize)

新增返回反馈栏

- res `any` 请求响应结果
- form `FormGroup` 表单对象
- reset `any` FormGroup 重置值
- customize `AlertCustomize` 自定义文本
  - text `string` 提示文本
  - error_text `string` 返回错误提示文本
  - confirmButtonText `string` 确认按钮文本
  - cancelButtonText `string` 取消按钮文本
- return `Observable<any>`

例如, 在新增操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript

export class AdminAddComponent implements OnInit {

    ...

    submit(data) {
        this.adminService.add(data).pipe(
            switchMap(res => this.swal.addAlert(res, this.form, {
                status: true
            }))
        ).subscribe((status) => {
            // status => true or false
        });
    }
}
```

### editAlert(res: any, customize?: AlertCustomize)

修改返回反馈栏

- res `any` 请求响应结果
- customize `AlertCustomize` 自定义文本
  - text `string` 提示文本
  - error_text `string` 返回错误提示文本
  - confirmButtonText `string` 确认按钮文本
  - cancelButtonText `string` 取消按钮文本
- return `Observable<any>`

例如, 在修改操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AdminEditComponent implements OnInit {
    private id: any;

    ...

    submit(data) {
        data.id = this.id;
        this.adminService.edit(data).pipe(
            switchMap(res => this.swal.editAlert(res))
        ).subscribe((status) => {
            // status => true or false
        });
    }
}
```

### deleteAlert(service: Observable<any>, customize?: AlertCustomize)

删除返回反馈栏

- service `Observable<any>` 删除请求对象
- customize `AlertCustomize` 自定义文本
  - text `string` 提示文本
  - confirmButtonText `string` 确认按钮文本
  - cancelButtonText `string` 取消按钮文本
- return `Observable<any>`

例如, 在删除操作下使用, 订阅返回删除请求对象的响应值

```typescript
export class AdminIndexComponent implements OnInit {
    ...

  deleteData(id: any) {
    this.swal.deleteAlert(this.adminService.delete(id)).subscribe(res => {
      if (!res.error) {
        this.notification.success(this.bit.l['operate_success'], this.bit.l['delete_success']);
        this.getLists(true);
      } else {
        switch (res.msg) {
          case 'error:self':
            this.notification.error(this.bit.l['operate_error'], this.bit.l['error_delete_self']);
            break;
          default:
            this.notification.error(this.bit.l['operate_error'], this.bit.l['delete_error']);
        }
      }
    });
  }
}
```
