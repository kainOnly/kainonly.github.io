# 主题相关接口

## 创建主题

- createTopic(options: CreateTopicOptions)
  - options `CreateTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - maxMsgSize `number` 消息最大长度
    - filterType `number` 用于指定主题的消息匹配策略，filterType =1 或为空， 表示该主题下所有订阅使用 filterTag 标签过滤，filterType =2 表示用户使用 bindingKey 过滤
  - return `Promise<CreateTopicResponse>`

```typescript
const res = await cmq.createTopic({
  topicName: "test-topic",
});
```

## 修改主题属性

- setTopicAttributes(options: SetTopicAttributesOptions):
  - options `SetTopicAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - maxMsgSize `number` 消息最大长度
  - return `Promise<SetTopicAttributesResponse>`

```typescript
const res = await cmq.setTopicAttributes({
  topicName: "test-topic",
  maxMsgSize: 131072,
});
```

## 获取主题列表

- listTopic(options: ListTopicOptions)
  - options `ListTopicOptions`
    - searchWord `string` 用于过滤主题列表，后台用模糊匹配的方式来返回符合条件的主题列表
    - offset `number` 分页时本页获取主题列表的起始位置
    - limit `number` 分页时本页获取主题的个数
  - return `Promise<ListTopicResponse>`

```typescript
const res = await cmq.listTopic({});
```

## 获取主题属性

- getTopicAttributes(options: GetTopicAttributesOptions)
  - options `GetTopicAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
  - return `Promise<GetTopicAttributesResponse>`

```typescript
const res = await cmq.getTopicAttributes({
  topicName: "test-topic",
});
```

## 删除主题

- deleteTopic(options: DeleteTopicOptions)
  - options `DeleteTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
  - return `Promise<DeleteTopicResponse>`

```typescript
const res = await cmq.deleteTopic({
  topicName: "test-topic",
});
```