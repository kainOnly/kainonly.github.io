## BitEventsService 组件通讯

BitEventsService 为组件提供事件通讯功能，以下示例中 `events` 为 `BitEventsService` 服务的注入命名，例如多语言的切换基于：

```typescript
events.on('locale').subscribe(args => {
    console.log(args);
    // zh_cn or en_us
});
```

### exists(topic: string): boolean

判断组件通讯事件是否存在

- **topic** `string` 主题名称

```typescript
events.exists('test');
```

### publish(topic: string, args?: any)

发布组件通讯事件

- **topic** `string` 主题名称
- **args** `args` 发送参数

``` typescript
events.publish('any', {
    name: 'kain'
});
```

### on(topic: string): Observable< any >

订阅组件通讯事件

- **topic** `string` 主题名称
- **Return** `Observable< any >`

```typescript
events.on('any').subscribe(args => {
    console.log(args);
});
```

### off(topic: string)

取消订阅的组件通讯事件

- **topic** `string` 主题名称

```typescript
events.off('any');
```

!> 在每次路由组件 `OnDestory` 时，都需要将自定义事件取消订阅
