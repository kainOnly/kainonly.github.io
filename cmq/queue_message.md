# 消息相关接口

## 发送消息

- sendMessage(options: SendMessageOptions)
  - options `SendMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - msgBody `string|object` 消息正文，数组时会自动转为 json 字符串
    - delaySeconds `number` 需要延时多久用户才可见该消息
  - return `Promise<SendMessageResponse>`

```typescript
const res = await cmq.sendMessage({
  queueName: "send",
  msgBody: {
    name: "kain",
  },
});
```

## 批量发送消息

- batchSendMessage(options: BatchSendMessageOptions)
  - options `BatchSendMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - msgBody `array` 消息正文
    - delaySeconds `number` 需要延时多久用户才可见该消息
  - return `Promise<BatchSendMessageResponse>`

```typescript
const res = await cmq.batchSendMessage({
  queueName: "send",
  msgBody: [
    { type: "a1", name: "cc" },
    { type: "a2", name: "xy" },
  ],
});
```

## 消费消息

- receiveMessage(options: ReceiveMessageOptions)
  - options `ReceiveMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - pollingWaitSeconds `number` 本次请求的长轮询等待时间
  - return `Promise<ReceiveMessageResponse>`

```typescript
const res = await cmq.receiveMessage({
  queueName: "send",
});
```

## 批量消费消息

- batchReceiveMessage(options: BatchReceiveMessageOptions)
  - options `BatchReceiveMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - numOfMsg `number` 本次消费的消息数量，取值范围 1 - 16
    - pollingWaitSeconds `number` 本次请求的长轮询等待时间
  - return `Promise<BatchReceiveMessageResponse>`

```typescript
const res = await cmq.batchReceiveMessage({
  queueName: "send",
  numOfMsg: 16,
});
```

## 删除消息

- deleteMessage(options: DeleteMessageOptions)
  - options `DeleteMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - receiptHandle `string` 上次消费返回唯一的消息句柄，用于删除消息
  - return `Promise<DeleteMessageResponse>`

```typescript
const res1 = await cmq.receiveMessage({
  queueName: "send",
});
if (res1.code !== 0) return;
const res2 = await cmq.deleteMessage({
  queueName: "send",
  receiptHandle: res1.receiptHandle,
});
```

## 批量删除消息

- batchDeleteMessage(options: BatchDeleteMessageOptions)
  - options `BatchDeleteMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - receiptHandle `array` 上次消费返回唯一的消息句柄，用于删除消息
  - return `Promise<BatchDeleteMessageResponse>`

```typescript
const res1 = await cmq.batchReceiveMessage({
  queueName: "send",
  numOfMsg: 16,
});
if (res1.code !== 0) return;
const receiptHandles = res1.msgInfoList.map((v) => v.receiptHandle);
const res2 = await cmq.batchDeleteMessage({
  queueName: "send",
  receiptHandle: receiptHandles,
});
```