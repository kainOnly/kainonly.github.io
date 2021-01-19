## BitSwalService 提示确认

BitSwalService 是基于 sweetalert2 的提交反馈栏服务

## Method

`BitSwalService` 服务所包含以下方法：

### create(option: AlertOption): Observable< any >

创建提示确认框

- **title** `string` 标题
- **content** `string` 内容
- **type** `SweetAlertIcon` 图标类型
- **width** `number` 宽度
- **okText** `string` 确认按钮文字
- **okDanger** `boolean` 确认按钮是否为危险按钮
- **okShow** `boolean` 是否显示确认按钮
- **cancelText** `string` 取消按钮文字
- **cancelShow** `boolean` 是否显示取消按钮

```typescript
export class AclIndexComponent implements OnInit {

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
  ) {
  }

  ngOnInit(): void {
    this.swal.create({
      title: 'This is a success message',
      content: 'some messages...some messages...',
      type: 'success'
    }).subscribe(() => {
      
    });
  }
}
```

### addAlert(res: any, form: FormGroup, reset?: any): Observable< any >

新增返回反馈栏

- **res** `any` 请求响应结果
- **form** `FormGroup` 表单对象
- **reset** `any` FormGroup 重置值

例如, 在新增操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AclAddComponent implements OnInit {

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private aclService: AclService
  ) {
  }

  submit(data): void {
    this.aclService.add(data).pipe(
      switchMap(res =>
        this.swal.addAlert(res, this.form, {
          status: true
        })
      )
    ).subscribe(() => {
    });
  }
}
```

### editAlert(res: any): Observable< any >

修改返回反馈栏

- **res** `any` 请求响应结果

例如, 在修改操作下组件表单提交中使用, `status` 为 `true` 表示确认提示框

```typescript
export class AclEditComponent implements OnInit {
  private id: any;

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private aclService: AclService
  ) {
  }

  submit(data): void {
    Reflect.set(data, 'id', this.id);
    this.aclService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe(status => {
      if (status) {
        this.getData();
      }
    });
  }
}
```

### deleteAlert(observable: Observable< any >): Observable< any >

删除返回反馈栏

- **observable** `Observable< any >` 异步处理

例如, 在删除操作下使用, 订阅返回删除请求对象的响应值

```typescript
export class AclIndexComponent implements OnInit {

  constructor(
    public bit: BitService,
    private swal: BitSwalService,
    private message: NzMessageService,
    public aclService: AclService,
  ) {
  }

  deleteData(id: any[]): void {
    this.swal.deleteAlert(
      this.aclService.delete(id)
    ).subscribe(res => {
      if (!res.error) {
        this.message.success(this.bit.l.deleteSuccess);
        this.getLists(true);
      } else {
        this.message.error(this.bit.l.deleteError);
      }
    });
  }
}
```