## bitHistory 历史导航

加载被历史缓存的参数导航

### 选择器

`[bitHistory]`

### 属性

`bitHistoryDirective` 组件包含以下属性指令：

| 属性           | 说明         | 类型     | 默认值 |
| -------------- | ------------ | -------- | ------ |
| `[bitHistory]` | 跨级路由名称 | `string` | -      |

### 使用说明

假设导航至/{team-index}/1，再从/{team-index}/1导航至/{team-index}/1/services/T100

```html
<button nz-button type="button" bitHistory="team-index">
  历史导航
</button>
```

此时执行 button 将跳转至/{team-index}/1