## bit-header 页头填充

为路由页面提供页头内容的信息填充

### 组件

`<bit-header back subTitle="subTitle">content</bit-header>`

其中组件内容元素将显示在 **PageHeader** 页头组件的 **nz-page-header-extra** 内

### 属性

`BitHeaderComponent` 组件包含以下属性指令：

| 属性       | 说明             | 类型                         | 默认值  |
| ---------- | ---------------- | ---------------------------- | ------- |
| `back`     | 是否显示返回按钮 | `boolean`                    | `false` |
| `subTitle` | 子标题           | `string | TemplateRef<void>` | -       |

### 使用说明

使用页头填充要配合 `BitSupportService` 使用，首先要在根应用组件中加入（通常包含主 `<router-outlet></router-outlet>`）：

```html
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
            <ng-container *ngIf="islast;else notLast">{{x.name|Locale:bit.locale}}</ng-container>
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
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription;

  constructor(
    public support: BitSupportService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

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