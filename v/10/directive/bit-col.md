## bitCol 栅格标识

为应用定义统一栅格

### 选择器

`[bitCol]`

### 属性

`BitColDirective` 组件包含以下属性指令：

| 属性       | 说明         | 类型     | 默认值 |
| ---------- | ------------ | -------- | ------ |
| `[bitCol]` | 统一栅格索引 | `string` | -      |


### 使用说明

首先要确保 `src\environments\environment.ts` 中配置完整并将配置加载入模块中，假设统一栅格定义为：

```typescript
const col = {
  label: {
    nzXXl: 4,
    nzXl: 5,
    nzLg: 6,
    nzMd: 7,
    nzSm: 24
  },
  control: {
    nzXXl: 8,
    nzXl: 9,
    nzLg: 10,
    nzMd: 14,
    nzSm: 24
  },
  submit: {
    nzXXl: { span: 8, offset: 4 },
    nzXl: { span: 9, offset: 5 },
    nzLg: { span: 10, offset: 6 },
    nzMd: { span: 14, offset: 6 },
    nzSm: { span: 24, offset: 0 }
  }
};
```

那么就可以在组件中使用 `[bitCol]` 分配统一栅格

```html
<nz-form-item>
  <nz-form-label bitCol="label" nzRequired>
    {{bit.l['status']}}
  </nz-form-label>
  <nz-form-control bitCol="control">
    <nz-switch 
        formControlName="status"
        [nzCheckedChildren]="bit.l['on']"
        [nzUnCheckedChildren]="bit.l['off']">
    </nz-switch>
  </nz-form-control>
</nz-form-item>

<nz-form-item>
  <nz-form-control bitCol="submit">
    <nz-space>
      <nz-space-item>
        <button nz-button nzType="primary" [disabled]="!form.valid">
          <i nz-icon nzType="check"></i> {{bit.l['submit']}}
        </button>
      </nz-space-item>
      <nz-space-item>
        <button nz-button type="button" bitBack>
          <i nz-icon nzType="close"></i> {{bit.l['cancel']}}
        </button>
      </nz-space-item>
    </nz-space>
  </nz-form-control>
</nz-form-item>
```

