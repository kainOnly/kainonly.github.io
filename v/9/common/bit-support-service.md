## BitSupportService 功能支持

BitSupportService 作为附加的功能支持，以下示例中 `support` 为 `BitSupportService` 服务的注入命名

## Property

`BitSupportService` 服务所包含以下属性：

| 属性            | 说明             | 类型                 | 默认值 |
| --------------- | ---------------- | -------------------- | ------ |
| `title`         | 当前路由的标题   | `any`                | `''`   |
| `breadcrumb`    | 面包屑数组       | `BreadcrumbOption[]` | `[]`   |
| `breadcrumbTop` | 面包屑默认最高级 | `any`                | `0`    |
| `navActive`     | 被激活的导航     | `any[]`              | `[]`   |

- `title` 可以使用在组件模板的页头中，显示当前路由的标题

```html
<nz-page-header [nzTitle]="bit.support.title|Locale:bit.locale"></nz-page-header>
```

- `breadcrumb` 为仪表盘面包屑提供数据

```html
<nz-breadcrumb class="app-breadcrumb" [nzSeparator]="breadcrumbIcon">
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
```

- `breadcrumbTop` 用于定义面包屑默认最高级，这取决于面包屑数据对父节点的定义
- `navActive` 为仪表盘导航菜单提供激活状态

```html
<ul nz-menu
    [nzInlineCollapsed]="collapsed"
    [nzMode]="collapsed?'vertical':'inline'">
    <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: navLists}"></ng-container>
    <ng-template #navTpl let-navs>
        <ng-container *ngFor="let x of navs">
        <ng-container *ngIf="x.router;else notRouter">
            <li nz-menu-item
                [nzSelected]="support.navActive.indexOf(x.key)!==-1"
                [bitOpen]="[x.key]">
            <i nz-icon [nzType]="x.icon"></i>
            <span class="nav-text">{{x.name|Locale:bit.locale}}</span>
            </li>
        </ng-container>
        <ng-template #notRouter>
            <li nz-submenu [nzOpen]="support.navActive.indexOf(x.key)!==-1">
            <span title><i nz-icon [nzType]="x.icon"></i><span>{{x.name|Locale:bit.locale}}</span></span>
            <ul>
                <ng-container *ngTemplateOutlet="navTpl; context: {$implicit: x.children}"></ng-container>
            </ul>
            </li>
        </ng-template>
        </ng-container>
    </ng-template>
</ul>
```

## Method

`BitSupportService` 服务所包含以下方法：

### setBreadcrumb(...breadcrumb: BreadcrumbOption[])

手动设置面包屑

- **breadcrumb** `BreadcrumbOption[]` 面包屑参数
  - **$.name** `any` 面包屑名称
  - **$.key** `string` 路由标签
  - **$.router** `0 | 1` 是否为路由

```typescript
const data: BreadcrumbOption[] = [
    {
        name: {
            zh_cn: '测试1'
        },
        key: 'test2',
        router: 1
    }, {
        name: {
            zh_cn: '测试2'
        },
        key: 'test2',
        router: 1
    }
];
support.setBreadcrumb(...data);
```

### setResource(resource: Map< string, any >, router: Map< string, any >)

设置资源，为辅助框架提供路由解析基础，后端数据可查看 https://github.com/kainonly/ngx-bit/blob/master/projects/ngx-bit/mock/resource.json

- **resource** `Map< string, any >` 资源数据
- **router** `Map< string, any >` 路由数据

```typescript
const resourceData: Map<string, any> = new Map<string, any>();
const routerData: Map<string, any> = new Map<string, any>();
const nav: any = [];

if (!res.error) {
for (const x of res.data) {
    resourceData.set(x.key, x);
    if (x.router === 1) {
        routerData.set(x.key, x);
    }
}
for (const x of res.data) {
    if (!x.nav) {
        continue;
    }

    if (x.parent === 'origin') {
        nav.push(x);
    } else {
        const parent = x.parent;
        if (resourceData.has(parent)) {
            const rows = resourceData.get(parent);
            if (!rows.hasOwnProperty('children')) {
                rows.children = [];
            }
            rows.children.push(x);
        }
    }
}
support.setResource(resourceData, routerData);
```

### setup(router: Router, match: string[] = ['%7B', '%7D'])

安装 support 支持

- **router** `Router` 应用 `Router` 对象
- **match** `string[]` 路由标签获取符，默认`['%7B', '%7D']`

```typescript
support.setup(this.router);
```

### clearStorage()

清除辅助框架相关本地存储

```typescript
support.clearStorage();
```

### unsubscribe()

取消 support 订阅

```typescript
support.unsubscribe();
```