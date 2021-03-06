# 订阅相关接口

## 创建订阅

- subscribe(options: SubscribeOptions)
  - options `SubscribeOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
    - protocol `string` 订阅的协议，目前支持两种协议：HTTP、Queue
    - endpoint `string` 接收投递消息的 endpoint
    - notifyStrategy `string` 向 endpoint 推送消息出现错误时，CMQ 推送服务器的重试策略。BACKOFF_RETRY，退避重试；EXPONENTIAL_DECAY_RETRY，指数衰退重试
    - notifyContentFormat `string` 推送内容的格式。取值：（1）JSON。（2）SIMPLIFIED，即 raw 格式
    - filterTag `array` 消息标签（用于消息过滤)
    - bindingKey `array` 订阅接收消息的过滤策略
  - return `Promise<SubscribeResponse>`

```typescript
const res = await cmq.subscribe({
  topicName: "sub-topic",
  subscriptionName: "test",
  protocol: "queue",
  endpoint: "normal",
  filterTag: ["mytag"],
});
```

## 获取订阅列表

- listSubscriptionByTopic(options: ListSubscriptionByTopicOptions)
  - options `ListSubscriptionByTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - searchWord `string` 用于过滤订阅列表，后台用模糊匹配的方式来返回符合条件的订阅列表
    - offset `number` 分页时本页获取订阅列表的起始位置
    - limit `number` 分页时本页获取订阅的个数
  - return `Promise<ListSubscriptionByTopicResponse>`

```typescript
const res = await cmq.listSubscriptionByTopic({
  topicName: "sub-topic",
});
```

## 修改订阅属性

- setSubscriptionAttributes(options: SetSubscriptionAttributesOptions)
  - options `SetSubscriptionAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
    - notifyStrategy `string` 向 endpoint 推送消息出现错误时，CMQ 推送服务器的重试策略。BACKOFF_RETRY，退避重试；EXPONENTIAL_DECAY_RETRY，指数衰退重试
    - notifyContentFormat `string` 推送内容的格式。取值：（1）JSON。（2）SIMPLIFIED，即 raw 格式
    - filterTag `array` 消息标签（用于消息过滤)
    - bindingKey `array` 订阅接收消息的过滤策略
  - return `Promise<SetSubscriptionAttributesResponse>`

```typescript
const res = await cmq.setSubscriptionAttributes({
  topicName: "sub-topic",
  subscriptionName: "test",
  notifyStrategy: "BACKOFF_RETRY",
});
```

## 删除订阅

- unsubscribe(options: UnsubscribeOptions)
  - options `UnsubscribeOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<UnsubscribeResponse>`

```typescript
const res = await cmq.unsubscribe({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```

## 获取订阅属性

- getSubscriptionAttributes(options: GetSubscriptionAttributesOptions)
  - options `GetSubscriptionAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<GetSubscriptionAttributesResponse>`

```typescript
const res = await cmq.getSubscriptionAttributes({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```

## 清空订阅标签

- clearSubscriptionFilterTags(options: ClearSubscriptionFilterTagsOptions)
  - options `ClearSubscriptionFilterTagsOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<ClearSubscriptionFilterTagsResponse>`

```typescript
const res = await cmq.clearSubscriptionFilterTags({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```


