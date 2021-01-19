## bit-print 模板组件

配合多语言包提供更多的变量类型支持，例如 `TemplateRef<any>`

### 组件

`<bit-print #print [text]="''" [vars]="[]"></bit-print>`

### 属性

`BitPrintComponent` 组件包含以下属性指令：

| 属性   | 说明       | 类型               | 默认值 |
| ------ | ---------- | ------------------ | ------ |
| `ref`  | 打印模板   | `TemplateRef<any>` | -      |
| `text` | 字符串模板 | `string`           | -      |
| `vars` | 模板变量   | `any[]`            | -      |

### 使用说明

例如，使用 `TemplateRef<any>` 模板变量

```html
<nz-alert bitBanner nzBanner nzType="info" nzCloseable [nzMessage]="nzMessage.ref">
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