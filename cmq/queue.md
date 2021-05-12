# 队列相关接口

## 创建队列

- createQueue(options: CreateQueueOptions)
  - options `CreateQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - maxMsgHeapNum `number` 最大堆积消息数
    - pollingWaitSeconds `number` 消息接收长轮询等待时间
    - visibilityTimeout `number` 消息可见性超时
    - maxMsgSize `number` 消息最大长度
    - msgRetentionSeconds `number` 消息保留周期
    - rewindSeconds `number` 队列是否开启回溯消息能力
  - return `Promise<CreateQueueResponse>`

```typescript
const res = await cmq.createQueue({
  queueName: "test",
});
```

## 获取队列列表

- listQueue(options: ListQueueOptions)
  - options `ListQueueOptions`
    - searchWord `string` 用于过滤队列列表，后台用模糊匹配的方式来返回符合条件的队列列表
    - offset `number` 分页时本页获取队列列表的起始位置
    - limit `number` 分页时本页获取队列的个数
  - return `Promise<ListQueueResponse>`

```typescript
const res = await cmq.listQueue({});
```

## 获取队列属性

- getQueueAttributes(options: GetQueueAttributesOptions)
  - options `GetQueueAttributesOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
  - return `Promise<GetQueueAttributesResponse>`

```typescript
const res = await cmq.getQueueAttributes({
  queueName: "test",
});
```

## 修改队列属性

- setQueueAttributes(options: SetQueueAttributesOptions)
  - options `SetQueueAttributesOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - maxMsgHeapNum `number` 最大堆积消息数
    - pollingWaitSeconds `number` 消息接收长轮询等待时间
    - visibilityTimeout `number` 消息可见性超时
    - maxMsgSize `number` 消息最大长度
    - msgRetentionSeconds `number` 消息保留周期
    - rewindSeconds `number` 队列是否开启回溯消息能力
  - return `Promise<SetQueueAttributesResponse>`

```typescript
const res = await cmq.setQueueAttributes({
  queueName: "test",
  maxMsgHeapNum: 5000000,
});
```

## 删除队列

- deleteQueue(options: DeleteQueueOptions)
  - options `DeleteQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
  - return `Promise<DeleteQueueResponse>`

```typescript
const res = await cmq.deleteQueue({
  queueName: "test",
});
```

## 回溯队列

- rewindQueue(options: RewindQueueOptions)
  - options `RewindQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - startConsumeTime `number(unixtime)` 设定该时间，则（Batch）receiveMessage 接口，会按照生产消息的先后顺序消费该时间戳以后的消息
  - return `Promise<RewindQueueResponse>`

```typescript
// 需要在消息删除后执行
const time = parseInt((new Date().getTime() / 1000).toString());
const res = await cmq.rewindQueue({
  queueName: "test",
  startConsumeTime: time - 1800,
});
```