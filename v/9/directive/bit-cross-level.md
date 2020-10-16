## bitCrossLevel 跨级导航

可以在应用中执行跨级导航，当执行跨越导航时没有更好的方式记录其参数，此时配合 `open` 与 `crossLevel` 就能解决问题

### 选择器

`[bitCrossLevel]`

### 属性

`BitCrossLevelDirective` 组件包含以下属性指令：

| 属性              | 说明         | 类型     | 默认值 |
| ----------------- | ------------ | -------- | ------ |
| `[bitCrossLevel]` | 跨级路由名称 | `string` | -      |

### 使用说明

假设导航至/{team-index}/1，再从/{team-index}/1导航至/{team-index}/1/services/T100

```html
<button nz-button type="button" bitCrossLevel="team-index">
  跨级导航
</button>
```

此时执行 button 将跨级跳转至/{team-index}/1