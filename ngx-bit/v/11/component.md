# 组件

## bit-i18n-switch 多语言切换器

提供应用表单多语言切换器，使表单组件具备多语言输入

`<bit-i18n-switch (i18nChange)="change($event)"></bit-i18n-switch>`

| 属性           | 说明               | 类型                   | 默认值 |
| -------------- | ------------------ | ---------------------- | ------ |
| `(i18nChange)` | 监听 i18n 值的变化 | `EventEmitter<string>` | -      |

控制表单内所有多语言输入组件，在页头加入 `bit-i18n-switch`

```html
<nz-page-header
  nzBackIcon
  (nzBack)="bit.back()"
  [nzTitle]="bit.support.title|Locale:bit.locale"
>
  <nz-page-header-extra>
    <!-- 这里使用 -->
    <bit-i18n-switch></bit-i18n-switch>
  </nz-page-header-extra>
</nz-page-header>

<nz-card>
  <form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    <nz-form-item formGroupName="name" bitI18nUpdate>
      <nz-form-label bitCol="label" nzRequired>
        <span>
          {{bit.l['name']}}
          <i
            nz-icon
            nz-tooltip
            [nzTooltipTitle]="bit.l['i18n']"
            nzType="translation"
            nzTheme="outline"
          >
          </i>
        </span>
      </nz-form-label>
      <ng-container *ngFor="let x of bit.i18nContain">
        <nz-form-control
          *ngIf="bit.equalI18n(x)"
          nzHasFeedback
          bitCol="control"
          [nzValidatingTip]="bit.l['validating']"
          [nzErrorTip]="name.ref"
        >
          <input
            nz-input
            [nz-tooltip]="tooltip.ref"
            [formControlName]="x"
            [placeholder]="bit.l['namePlaceholder']"
          />
          <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
          <bit-error-tip
            #name
            [hasError]="{
                    required:bit.l['nameRequire'],
                    duplicated:bit.l['nameDuplicated']
                }"
          ></bit-error-tip>
        </nz-form-control>
      </ng-container>
    </nz-form-item>
  </form>
</nz-card>
```

---

## bit-i18n-tooltip 多语言提示

提供应用表单多语言输入的语言输入缺失提示

`<bit-i18n-tips #i18nTips groupName="name_expression"></bit-i18n-tips>`

| 属性        | 说明                 | 类型               | 默认值 |
| ----------- | -------------------- | ------------------ | ------ |
| `ref`       | 多语言提示模板       | `TemplateRef<any>` | -      |
| `groupName` | 多语言 FormGroupName | `string`           | -      |

将 `tooltip` 提供给 `[nz-tooltip]`

```html
<nz-card>
  <form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    <nz-form-item formGroupName="name" bitI18nUpdate>
      <nz-form-label bitCol="label" nzRequired>
        <span>
          {{bit.l['name']}}
          <i
            nz-icon
            nz-tooltip
            [nzTooltipTitle]="bit.l['i18n']"
            nzType="translation"
            nzTheme="outline"
          >
          </i>
        </span>
      </nz-form-label>
      <ng-container *ngFor="let x of bit.i18nContain">
        <nz-form-control
          *ngIf="bit.equalI18n(x)"
          nzHasFeedback
          bitCol="control"
          [nzValidatingTip]="bit.l['validating']"
          [nzErrorTip]="name.ref"
        >
          <input
            nz-input
            [nz-tooltip]="tooltip.ref"
            [formControlName]="x"
            [placeholder]="bit.l['namePlaceholder']"
          />
          <!-- 这里使用 -->
          <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
          <bit-error-tip
            #name
            [hasError]="{
                    required:bit.l['nameRequire'],
                    duplicated:bit.l['nameDuplicated']
                }"
          ></bit-error-tip>
        </nz-form-control>
      </ng-container>
    </nz-form-item>
  </form>
</nz-card>
```

---

## bit-error-tip 验证错误提示

提供应用表单组件的验证错误提示方式

`<bit-error-tip #errorTip [hasError]="{}"></bit-error-tip>`

| 属性       | 说明             | 类型               | 默认值 |
| ---------- | ---------------- | ------------------ | ------ |
| `ref`      | 验证错误提示模板 | `TemplateRef<any>` | -      |
| `hasError` | errors 错误信息  | `object`           | -      |

将验证错误提示提供给 `nz-form-control` 的 `[nzErrorTip]`

```html
<nz-card>
  <form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    <nz-form-item formGroupName="name" bitI18nUpdate>
      <nz-form-label bitCol="label" nzRequired>
        <span>
          {{bit.l['name']}}
          <i
            nz-icon
            nz-tooltip
            [nzTooltipTitle]="bit.l['i18n']"
            nzType="translation"
            nzTheme="outline"
          >
          </i>
        </span>
      </nz-form-label>
      <ng-container *ngFor="let x of bit.i18nContain">
        <nz-form-control
          *ngIf="bit.equalI18n(x)"
          nzHasFeedback
          bitCol="control"
          [nzValidatingTip]="bit.l['validating']"
          [nzErrorTip]="name.ref"
        >
          <input
            nz-input
            [nz-tooltip]="tooltip.ref"
            [formControlName]="x"
            [placeholder]="bit.l['namePlaceholder']"
          />
          <bit-i18n-tooltip #tooltip groupName="name"></bit-i18n-tooltip>
          <!-- 这里使用 -->
          <bit-error-tip
            #name
            [hasError]="{
                    required:bit.l['nameRequire'],
                    duplicated:bit.l['nameDuplicated']
                }"
          ></bit-error-tip>
        </nz-form-control>
      </ng-container>
    </nz-form-item>
  </form>
</nz-card>
```

---

## bit-header 页头填充

为路由页面提供页头内容的信息填充

`<bit-header back subTitle="subTitle">content</bit-header>`

其中组件内容元素将显示在 **PageHeader** 页头组件的 **nz-page-header-extra** 内

| 属性       | 说明             | 类型                          | 默认值  |
| ---------- | ---------------- | ----------------------------- | ------- |
| `back`     | 是否显示返回按钮 | `boolean`                     | `false` |
| `subTitle` | 子标题           | `string \| TemplateRef<void>` | -       |

使用页头填充要配合 `BitSupportService` 使用，首先要在根应用组件中加入（通常包含主 `<router-outlet></router-outlet>`）：

```html
<ng-container *ngTemplateOutlet="support.banner"></ng-container>
<nz-page-header
  [nzTitle]="support.title|Locale:bit.locale"
  [nzSubtitle]="!support.subTitle?null:support.subTitle"
  [nzBackIcon]="!support.back?null:''"
  (nzBack)="bit.back()"
>
  <nz-breadcrumb [nzSeparator]="breadcrumbIcon" nz-page-header-breadcrumb>
    <ng-template #breadcrumbIcon>
      <i nz-icon nzType="right"></i>
    </ng-template>
    <nz-breadcrumb-item>
      <a routerLink="/">{{bit.l['dashboard']}}</a>
    </nz-breadcrumb-item>
    <nz-breadcrumb-item *ngFor="let x of support.breadcrumb;last as islast">
      <ng-container *ngIf="islast;else notLast"
        >{{x.name|Locale:bit.locale}}</ng-container
      >
      <ng-template #notLast>
        <a *ngIf="x.router;else notRouterlink" [bitCrossLevel]="x.key">
          {{x.name|Locale:bit.locale}}
        </a>
        <ng-template #notRouterlink>{{x.name|Locale:bit.locale}}</ng-template>
      </ng-template>
    </nz-breadcrumb-item>
  </nz-breadcrumb>
  <nz-page-header-extra>
    <ng-container *ngTemplateOutlet="support.actions"></ng-container>
  </nz-page-header-extra>
</nz-page-header>
```

然后为了根应用检测的正确性，还需要增加手动执行检测：

```typescript
@Component({
  selector: "app-dashboards",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.scss"],
})
export class DashboardsComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription;

  constructor(
    public support: BitSupportService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.statusSubscription = this.support.status.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }
}
```

接下来就可以在路由页面中做页头填充

```html
<bit-header>
  <button nz-button nzType="primary" [bitOpen]="['any-add']">
    <span>新增</span>
  </button>
</bit-header>
```

在页头上方设置顶部公告

```html
<nz-alert
  bitBanner
  nzBanner
  nzType="info"
  nzCloseable
  [nzMessage]="'some messages...some messages...'"
></nz-alert>
<bit-header>
  <button nz-button nzType="primary" [bitOpen]="['any-add']">
    <span>新增</span>
  </button>
</bit-header>
```

---

## bit-print 模板组件

配合多语言包提供更多的变量类型支持，例如 `TemplateRef<any>`

`<bit-print #print [text]="''" [vars]="[]"></bit-print>`

| 属性   | 说明       | 类型               | 默认值 |
| ------ | ---------- | ------------------ | ------ |
| `ref`  | 打印模板   | `TemplateRef<any>` | -      |
| `text` | 字符串模板 | `string`           | -      |
| `vars` | 模板变量   | `any[]`            | -      |

使用 `TemplateRef<any>` 模板变量

```html
<nz-alert
  bitBanner
  nzBanner
  nzType="info"
  nzCloseable
  [nzMessage]="nzMessage.ref"
>
  <bit-print #nzMessage [text]="bit.l['info']" [vars]="[vars0, vars1, vars2]">
    <ng-template #vars0>
      <nz-tag>
        <i nz-icon nzType="flag"></i>
      </nz-tag>
    </ng-template>
    <ng-template #vars1>
      <nz-tag>
        <i nz-icon nzType="file-done"></i>
      </nz-tag>
    </ng-template>
    <ng-template #vars2>
      <nz-tag>
        <i nz-icon nzType="control"></i>
      </nz-tag>
    </ng-template>
  </bit-print>
</nz-alert>
```

## bit-transport 上传提示组件

对上传对象进行全局提示，并列表展示每个文件上传动态进度与信息

`<bit-transport [action]="transport" (actionComplete)="transportComplete()"></bit-transport>`

| 属性             | 说明     | 类型                                         | 默认值 |
| ---------------- | -------- | -------------------------------------------- | ------ |
| `action`         | 上传监听 | `(files: NzUploadFile[]) => Observable<any>` | -      |
| `actionComplete` | 上传完毕 | ` EventEmitter<string>`                      | -      |

例如：在上传页面中加入

```html
<bit-transport
  [action]="transport"
  (actionComplete)="transportComplete()"
></bit-transport>
```

提供对应的函数

```typescript
export class MediaComponent {
  transport = (files: NzUploadFile[]): Observable<any> => {
    return this.mediaService.bulkAdd({
      type_id: !this.ds.lists.search.type_id.value
        ? 0
        : this.ds.lists.search.type_id.value,
      data: files.map((v) => ({
        name: v.originFileObj.name,
        url: Reflect.get(v.originFileObj, "key"),
      })),
    });
  };

  transportComplete(): void {
    this.ds.fetchData(true);
    this.getCount();
  }
}
```

> 详细使用可查看 van-skeleton/cms [Media 组件](https://github.com/van-skeleton/cms/tree/main/media)
