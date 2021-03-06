# Facade 门面

## Redis 缓存

PhpRedis 操作类，使用前请确实是否已安装 [Redis](http://pecl.php.net/package/redis) 扩展，你需要更新配置 `config/database.php`，例如：

```php
return [
    'redis' => [
        'host' => env('redis.host', '127.0.0.1'),
        'password' => env('redis.password', null),
        'port' => env('redis.port', 6379),
        'database' => env('redis.db', 0),
    ],
];
```

- host `string` 连接地址
- password `string` 验证密码
- port `int` 端口
- database `int` 缓存库

### 定义 Redis 操作模型

- model ($index)
  - index `int|null` 库号，默认 `null`
  - return `Redis`

设置一个字符串缓存

```php
use think\bit\facade\Redis;

Redis::model()->set('hello', 'world');
```

### 定义 Redis 事务处理

- transaction(Closure $closure)
  - closure `Closure`
  - return `boolean`

执行一段缓存事务设置

```php
use think\bit\facade\Redis;

Redis::transaction(function (\Redis $redis) {
    return (
        $redis->set('name1', 'js') &&
        $redis->set('name2', 'php')
    );
});
// true or false
```

## Mongo 数据库

MongoDB 数据库的操作类，使用前请确实是否已安装 [MongoDB](http://pecl.php.net/package/mongodb) 扩展，并安装操作库

```shell
composer require kain/think-mgo
```

你需要更新配置 `config/database.php`，例如：

```php
return [
    'mongodb' => [
        'uri' => env('mongodb.uri', 'mongodb://127.0.0.1:27017'),
        'database' => env('mongodb.database', null),
        'uriOptions' => [],
        'driverOptions' => []
    ]
];
```

- uri `string` 连接地址

```
mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
```

- uriOptions `array` 等于 `[?options]`
- driverOptions `array` 驱动参数
- database `string` 默认数据库

### 指向集合

- name($collection)
  - collection `string` 集合名称
  - return `\MongoDB\Collection`

查询数据

```php
$result = Mgo::name('api')->find();
return $result->toArray();
```

写入数据

```php
$result = Mgo::name('admin')->insertOne([
    'name' => 'kain',
    'status' => 1,
    'create_time' => new \MongoDB\BSON\UTCDateTime(time() * 1000),
    'update_time' => new \MongoDB\BSON\UTCDateTime(time() * 1000)
])->isAcknowledged();
return $result;
```

### 生成分页

- page($collection, $filter = [], $page = 1, $limit = 20, $sort = [])
  - collection `string` 集合名称
  - filter `array` 搜索条件
  - page 页码，默认 `1`
  - limit 分页数量，默认 `20`
  - sort 排序条件

```php
$data = Mgo::page('log', [
    'status' => true
], 1, 20, [
    'create_time' => -1
]);
```

更多操作可参考 [MongoDB PHP Library](https://docs.mongodb.com/php-library/current/reference/) Reference.

## Rabbit 消息队列

RabbitMQ 消息队列 AMQP 操作类，使用前请确实是否已安装 `php-amqplib/php-amqplib`，如未安装请手动执行

```shell
composer require php-amqplib/php-amqplib
```

当前 window 系统下需要使用 `"php-amqplib/php-amqplib": "^2.8.2-rc3"` 才可正常运行

### 连接参数 :id=args

默认下 rabbitmq 连接参数为：

| 配置名称            | 默认值    | 说明             |
| ------------------- | --------- | ---------------- |
| hostname            | localhost | AMQP 连接地址    |
| port                | 5672      | AMQP 连接端口    |
| username            | guest     | 连接用户         |
| password            | guest     | 连接用户口令     |
| virualhost          | /         | 虚拟主机         |
| insist              | false     | 不允许代理重定向 |
| login_method        | AMQPLAIN  | 登录方法         |
| login_response      | null      | 登录响应         |
| locale              | en_US     | 国际化           |
| connection_timeout  | 3.0       | 连接超时         |
| read_write_timeout  | 3.0       | 读写超时         |
| context             | null      | 内容             |
| keepalive           | false     | 保持连接         |
| heartbeat           | 0         | 连接心跳         |
| channel_rpc_timeout | 0.0       | 信道 RPC 超时    |

你需要在主配置或对应的模块下创建配置 `config/rabbitmq.php`，例如：

```php
return [
    'hostname' => 'localhost',
    'port' => 5672,
    'username' => 'guest',
    'password' => 'guest',
];
```

也可以配合 Env 实现开发、生产分离配置：

```php
return [
    'hostname' => env('rabbitmq.host', 'localhost'),
    'port' => env('rabbitmq.port', 5672),
    'virualhost' => env('rabbitmq.virualhost', '/'),
    'username' => env('rabbitmq.username', 'guest'),
    'password' => env('rabbitmq.password', 'guest'),
];
```

### 创建默认信道

- start($closure, $args = [], $config = [])
  - closure `Closure` 信道处理
  - args `array` 连接参数
  - config `array` 操作配置

| 操作配置名称 | 类型    | 默认值 | 说明        |
| ------------ | ------- | ------ | ----------- |
| transaction  | boolean | false  | 开启事务    |
| channel_id   | string  | null   | 定义信道 ID |
| reply_code   | int     | 0      | 回复码      |
| reply_text   | string  | ''     | 回复文本    |
| method_sig   | array   | [0,0]  | -           |

```php
Rabbit::start(function () {
    Rabbit::queue('hello')->create();
});
```

### 创建自定义信道

- connect($closure, $args = [], $config = [])
  - closure `Closure` 信道处理
  - args `array` 连接参数
  - config `array` 操作配置

| 操作配置名称 | 类型    | 默认值 | 说明        |
| ------------ | ------- | ------ | ----------- |
| transaction  | boolean | false  | 开启事务    |
| channel_id   | string  | null   | 定义信道 ID |
| reply_code   | int     | 0      | 回复码      |
| reply_text   | string  | ''     | 回复文本    |
| method_sig   | array   | [0,0]  | -           |

```php
Rabbit::connect(function () {
    Rabbit::queue('hello')->create();
}, [
    'hostname' => 'developer.com',
    'port' => 5672,
    'username' => 'kain',
    'password' => '******'
]);
```

### 获取连接对象

- native()
  - return `AMQPStreamConnection`

```php
Rabbit::start(function () {
    dump(Rabbit::native());
    dump(Rabbit::native()->getChannelId());
});
```

### 获取信道

- channel()
  - return `AMQPChannel`

```php
Rabbit::start(function () {
    dump(Rabbit::native());
    dump(Rabbit::native()->getChannelId());
});
```

### 创建消息对象

- message($text = '', $config = [])
  - text `string|array` 消息
  - config `array` 操作配置
  - return `AMQPMessage`

```php
Rabbit::start(function () {
    Rabbit::message('test');
});
```

### 发布消息

- publish($text = '', $config = [])
  - text `string|array` 消息
  - config `array` 操作配置

```php
 Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
    Rabbit::queue('hello')->create();
    Rabbit::queue('hello')->bind('extest', [
        'routing_key' => 'rtest'
    ]);
    Rabbit::publish('test', [
        'exchange' => 'extest',
        'routing_key' => 'rtest'
    ]);
});
```

### 交换器操作类

- exchange($exchange)
  - exchange `string` 交换器名称
  - return `Exchange` 交换器类

```php
Rabbit::start(function () {
    $exchange = Rabbit::exchange('extest');
});
```

#### 声明交换器

- ->create($type, $config = [])
  - type `string` 交换器类型 (direct、headers、fanout、topic)
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| passive      | boolean | false  | 检验队列是否存在 |
| durable      | boolean | false  | 是否持久化       |
| auto_delete  | boolean | true   | 自动删除         |
| internal     | boolean | false  | 仅交换绑定有效   |
| nowait       | boolean | false  | 客户端不等待回复 |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
});
```

#### 起源交换器绑定交换器

- ->bind($destination, $config = [])
  - destination `string` 绑定交换器
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| routing_key  | string  | ''     | 路由键           |
| nowait       | boolean | false  | 客户端不等待回复 |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
    Rabbit::exchange('newtest')->create('direct');
    Rabbit::exchange('newtest')->bind('extest');
});
```

#### 起源交换器解除绑定的交换器

- ->unbind($destination, $config = [])
  - destination `string` 绑定交换器
  - config `array` 操作配置
  - return `mixed`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| routing_key  | string  | ''     | 路由键           |
| nowait       | boolean | false  | 客户端不等待回复 |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
    Rabbit::exchange('newtest')->create('direct');
    Rabbit::exchange('newtest')->bind('extest');
    Rabbit::exchange('newtest')->unbind('extest');
});
```

#### 删除交换器

- ->delete($config = [])
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明                       |
| ------------ | ------- | ------ | -------------------------- |
| if_unused    | boolean | false  | 仅删除没有队列绑定的交换器 |
| nowait       | boolean | false  | 客户端不等待回复           |
| ticket       | string  | null   | -                          |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->delete();
});
```

### 队列操作类

- queue($queue)
  - queue `string` 队列名称
  - return `Queue`

```php
Rabbit::start(function () {
    $queue = Rabbit::queue('hello');
    $queue->create();
});
```

#### 声明队列

- ->create($config = [])
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| passive      | boolean | false  | 检验队列是否存在 |
| durable      | boolean | false  | 是否持久化       |
| exclusive    | boolean | false  | 排除队列         |
| auto_delete  | boolean | true   | 自动删除         |
| nowait       | boolean | false  | 客户端不等待回复 |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

```php
Rabbit::start(function () {
    Rabbit::queue('hello')->create();
});
```

#### 绑定队列

- ->bind($exchange, $config = [])
  - exchange `string` 交换器名称
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| routing_key  | string  | ''     | 路由键           |
| nowait       | boolean | false  | 客户端不等待回复 |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
    $queue = Rabbit::queue('hello');
    $queue->create();
    $queue->bind('extest');
});
```

#### 解除绑定

- ->unbind($exchange, $config = [])
  - exchange `string`
  - config `array` 操作配置
  - return `mixed`

| 操作配置名称 | 类型   | 默认值 | 说明     |
| ------------ | ------ | ------ | -------- |
| routing_key  | string | ''     | 路由键   |
| arguments    | array  | []     | 扩展参数 |
| ticket       | string | null   | -        |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('direct');
    $queue = Rabbit::queue('hello');
    $queue->create();
    $queue->bind('extest');
    $queue->unbind('extest');
});
```

#### 清除队列

- ->purge($config = [])
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型   | 默认值 | 说明     |
| ------------ | ------ | ------ | -------- |
| arguments    | array  | []     | 扩展参数 |
| ticket       | string | null   | -        |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('fanout');
    $queue = Rabbit::queue('hello');
    $queue->create();
    $queue->bind('extest');
    Rabbit::publish('message', [
        'exchange' => 'extest',
    ]);
    $queue->purge();
});
```

#### 删除队列

- ->delete($config = [])
  - config `array` 操作配置
  - return `mixed|null`

| 操作配置名称 | 类型    | 默认值 | 说明                       |
| ------------ | ------- | ------ | -------------------------- |
| if_unused    | boolean | false  | 仅删除没有队列绑定的交换器 |
| if_empty     | boolean | false  | 完全清空队列               |
| arguments    | array   | []     | 扩展参数                   |
| ticket       | string  | null   | -                          |

`if_empty` 删除队列时，如果在服务器配置中定义了任何挂起的消息，则会将任何挂起的消息发送到死信队列，并且队列中的所有使用者都将被取消

```php
Rabbit::start(function () {
    $queue = Rabbit::queue('hello');
    $queue->create();
    $queue->delete();
});
```

#### 获取队列信息

- ->get($config = [])
  - config `array` 操作配置
  - return `mixed`

| 操作配置名称 | 类型    | 默认值 | 说明         |
| ------------ | ------- | ------ | ------------ |
| no_ack       | boolean | false  | 手动确认消息 |
| ticket       | string  | null   | -            |

```php
Rabbit::start(function () {
    Rabbit::exchange('extest')->create('fanout');
    $queue = Rabbit::queue('hello');
    $queue->create();
    $queue->bind('extest');
    Rabbit::publish('message', [
        'exchange' => 'extest',
    ]);
    dump($queue->get()->body);
});

// message
```

### 消费者操作类

- consumer($consumer)
  - consumer `string` 消费者名称
  - return `Consumer`

#### 启用消费者

- ->start($queue, $config = [])
  - queue `string` 队列名称
  - config `array` 操作配置
  - return `mixed|string`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| no_local     | boolean | false  | 独占消费         |
| no_ack       | boolean | false  | 手动确认消息     |
| exclusive    | boolean | false  | 排除队列         |
| nowait       | boolean | false  | 客户端不等待回复 |
| callback     | Closure | null   | 回调函数         |
| arguments    | array   | []     | 扩展参数         |
| ticket       | string  | null   | -                |

`no_local` 请求独占消费者访问权限，这意味着只有此消费者才能访问队列

#### 结束消费者

- ->cancel($config = [])
  - config `array` 操作配置
  - return `mixed`

| 操作配置名称 | 类型    | 默认值 | 说明             |
| ------------ | ------- | ------ | ---------------- |
| nowait       | boolean | false  | 客户端不等待回复 |
| noreturn     | boolean | false  | -                |

### 确认消息

- ack($delivery_tag, $multiple = false)
  - delivery_tag `string` 标识
  - multiple `boolean` 批量

### 拒绝传入的消息

- reject($delivery_tag, $requeue = false)
  - delivery_tag `string` 标识
  - requeue `boolean` 重新发送

### 拒绝一个或多个收到的消息

- nack($delivery_tag, $multiple = false, $requeue = false)
  - delivery_tag `string` 标识
  - multiple `boolean` 批量
  - requeue `boolean` 重新发送

### 重新发送未确认的消息

- revover($requeue = false)
  - requeue `boolean` 重新发送
  - return `mixed`

## Hash 密码

Hash 是用于密码加密与验证的工具函数，需要配置 `app.app_hash`，默认使用 `argon2i` 也可以选择 `argon2id`

### 加密密码

- make($password, $options = [])
  - password `string` 密码
  - options `array` 加密参数 `['memory' => 1024,'time' => 2,'threads' => 2]`

```php
Hash::make('123456789');
```

### 验证密码

- check($password, $hashPassword)
  - password `string` 密码
  - hashPassword `string` 密码散列值

```php
$hash = Hash::make('123456789');
dump(Hash::check('12345678', $hash));
// false
dump(Hash::check('123456789', $hash));
// true
```

## Cipher 对称加密

Cipher 是将数据对称加密的工具，需要设定配置 `app.app_secret` 与 `app.app_id`

### 加密明文

- encrypt($context, $key, $iv)
  - context `string` 明文
  - key `string` 自定义密钥
  - iv `string` 自定义偏移量
  - return `string` 密文

```php
dump(Cipher::encrypt('123'));

// s7Tkeof7utaDU4tVsTSbyA==
```

### 解密密文

- decrypt($secret, $key, $iv)
  - secret `string` 密文
  - key `string` 自定义密钥
  - iv `string` 自定义偏移量
  - return `string` 明文

```php
$secret = Cipher::encrypt('123');

dump($secret);
// s7Tkeof7utaDU4tVsTSbyA==
dump(Cipher::decrypt($secret));
// 123
```

### 加密数组为密文

- encryptArray($data, $key, $iv)
  - data `array` 数组
  - key `string` 自定义密钥
  - iv `string` 自定义偏移量
  - return `string` 密文

```php
dump(Cipher::encryptArray([1, 2, 3]));

// eFIs2OR2/IXC3vv3febOVA==
```

### 解密密文为数组

- decryptArray($secret, $key, $iv)
  - secret `string` 密文
  - key `string` 自定义密钥
  - iv `string` 自定义偏移量
  - return `array`

```php
$secret = Cipher::encryptArray([1, 2, 3]);

dump($secret);
// eFIs2OR2/IXC3vv3febOVA==
dump(Cipher::decryptArray($secret));
// array (size=3)
//   0 => int 1
//   1 => int 2
//   2 => int 3
```

## Tools 工具

### 数组二进制序列化

- pack($array)
  - array `array` 数组
  - return 二进制

### 二进制反序列化数组

- unpack($byte)
  - byte 二进制
  - return 数组

### 生成 uuid

- uuid($version, $namespace, $name)
  - version `string` 为 uuid 型号，其中包含 `v1`、`v3`、`v4`、`v5`，默认 `v4`
  - namespace `string` 命名空间，使用在 `v3`、`v5`
  - name `string` 名称，使用在 `v3`、`v5`
  - return `string`

```php
dump(Tools::uuid());
// '4f38cd10-3518-4656-95a3-9cbb4d5a8f25'
dump(Tools::uuid('v1'));
// '3fe018b6-1f89-11e9-863d-aa151017e551'
dump(Tools::uuid('v3', Uuid::NAMESPACE_DNS, 'van'));
// '88124da6-a376-3c77-8fb1-456250a33254'
dump(Tools::uuid('v5', Uuid::NAMESPACE_DNS, 'van'));
// '72ca19ff-6897-5a8e-80c4-ed5d3b753115'
```

| UUID Version | 说明                    |
| ------------ | ----------------------- |
| v1           | 基于时间的 UUID         |
| v3           | 基于名字的 UUID（MD5）  |
| v4           | 随机 UUID               |
| v5           | 基于名字的 UUID（SHA1） |

### 生产订单号

- orderNumber($service_code, $product_code, $user_code)
  - service_code `string` 业务码
  - product_code `string` 产品码
  - user_code `string` 用户码
  - return `string`

```php
dump(Tools::orderNumber('2', '100', '555'));

// 28100154830173082555
```

### 随机数 16 位

- random()

```php
dump(Tools::random());

// 3nnoIk3XbVphym4k
```

### 随机数 8 位

- randomShort()

```php
dump(Tools::randomShort());

// 2maJYwas
```

## Lists 列表数组

ArrayLists 列表数组操作类

### 列表数组初始化

- data($lists)
  - lists `array` 传入初始化的数组
  - return `BitLists`

```php
$lists = Lists::data([1, 2, 3, 4, 5, 6]);

dump($lists->toArray());
// array (size=6)
//   0 => int 1
//   1 => int 2
//   2 => int 3
//   3 => int 4
//   4 => int 5
//   5 => int 6
```

### 获取数组大小

- size()
  - return `int`

```php
$lists = Lists::data([1, 2, 3, 4, 5, 6]);
$size = $lists->size();

dump($size);
// 6
```

### 设置键值

- set($key, $value)
  - key `string` 键名
  - value `string` 键值

```php
$lists = Lists::data([1, 2, 3, 4, 5, 6]);
$lists->set('name', 'test');

dump($lists->toArray());
// array (size=7)
//   0 => int 1
//   1 => int 2
//   2 => int 3
//   3 => int 4
//   4 => int 5
//   5 => int 6
//   'name' => string 'test' (length=4)
```

### 数组加入元素

- add(...$data)
  - data `mixed` 加入的元素

```php
$lists = Lists::data([1, 2, 3, 4, 5, 6]);
$lists->add(7, 8, 9);

dump($lists->toArray());
// array (size=9)
//   0 => int 1
//   1 => int 2
//   2 => int 3
//   3 => int 4
//   4 => int 5
//   5 => int 6
//   6 => int 7
//   7 => int 8
//   8 => int 9
```

### 向前数组加入元素

- unshift(...$data)
  - data `mixed` 加入的元素

```php
$lists = Lists::data([1, 2, 3, 4, 5, 6]);
 $lists->unshift(-1, 0);

dump($lists->toArray());
// array (size=8)
//   0 => int -1
//   1 => int 0
//   2 => int 1
//   3 => int 2
//   4 => int 3
//   5 => int 4
//   6 => int 5
//   7 => int 6
```

### 数组是否为空

- isEmpty()
  - return `boolean`

```php
$lists = Lists::data([]);

dump($lists->isEmpty());
// true
```

### 判断是否存在键名

- has($key)
  - key `string` 键名
  - return `boolean`

```php
$lists = Lists::data([
    'name' => 'test'
]);

dump($lists->has('name'));
// true
```

### 判断是否存在键值

- contains($value)
  - value `mixed` 键值
  - return `boolean`

```php
$lists = Lists::data([
    'name' => 'test'
]);

dump($lists->contains('test'));
// true
```

### 获取键值

- get($key)
  - key `mixed` 键名
  - return `mixed`

```php
$lists = Lists::data([
    'name' => 'test'
]);

dump($lists->get('name'));
// test
```

### 移除键值

- delete($key)
  - key `mixed` 键名

```php
$lists = Lists::data([
    'name' => 'test'
]);
$lists->delete('name');

dump($lists->toArray());
// array (size=0)
```

### 数组开头的单元移出元素

- shift()
  - return `mixed` 移出的元素

```php
$lists = Lists::data([1, 2, 3]);
$lists->shift();

dump($lists->toArray());
// array (size=2)
//   0 => int 2
//   1 => int 3
```

### 数组出栈

- pop()
  - return `mixed` 出栈的元素

```php
$lists = Lists::data([1, 2, 3]);
$lists->pop();

dump($lists->toArray());
// array (size=2)
//   0 => int 1
//   1 => int 2
```

### 去除重复

- unique()

```php
$lists = Lists::data([1, 1, 2, 2, 3]);
$lists->unique();

dump($lists->toArray());
// array (size=3)
//   0 => int 1
//   2 => int 2
//   4 => int 3
```

### 清除数据

- clear()

```php
$lists = Lists::data([1, 1, 2, 2, 3]);
$lists->clear();

dump($lists->toArray());
// array (size=0)
```

### 返回键名

- keys()
  - return `array` 所有键名

```php
$lists = Lists::data([
    'name' => 'van',
    'age' => 100,
    'sex' => 0
]);

dump($lists->keys());
// array (size=3)
//   0 => string 'name' (length=4)
//   1 => string 'age' (length=3)
//   2 => string 'sex' (length=3)
```

### 返回键值

- values()
  - return `array` 所有键值

```php
$lists = Lists::data([
    'name' => 'van',
    'age' => 100,
    'sex' => 0
]);

dump($lists->values());
// array (size=3)
//   0 => string 'van' (length=3)
//   1 => int 100
//   2 => int 0
```

### 搜索给定的值，返回键名

- indexOf($value)
  - value `mixed` 键值
  - return `string` 键名

```php
$lists = Lists::data([
    'name' => 'van',
    'age' => 100,
    'sex' => 0
]);

dump($lists->indexOf('van'));
// name
```

### 数组遍历返回

- map(Closure $closure)
  - closure `Closure` 闭包函数
  - return `array`

```php
$lists = Lists::data([
    [
        'product' => 'test1',
        'price' => 10
    ],
    [
        'product' => 'test2',
        'price' => 20
    ]
]);

$other_lists = $lists->map(function ($v) {
    $v['price'] += 10;
    return $v;
});

dump($other_lists);
// array (size=2)
//   0 =>
//     array (size=2)
//       'product' => string 'test1' (length=5)
//       'price' => int 20
//   1 =>
//     array (size=2)
//       'product' => string 'test2' (length=5)
//       'price' => int 30
```

### 数组过滤

- filter(Closure $closure)
  - closure `Closure` 闭包函数
  - return `array`

```php
$lists = Lists::data([
    [
        'product' => 'test1',
        'price' => 10
    ],
    [
        'product' => 'test2',
        'price' => 20
    ],
    [
        'product' => 'test3',
        'price' => 30
    ]
]);

$other_lists = $lists->filter(function ($v) {
    return $v['price'] > 10;
});

dump($other_lists);
// array (size=2)
//   1 =>
//     array (size=2)
//       'product' => string 'test2' (length=5)
//       'price' => int 20
//   2 =>
//     array (size=2)
//       'product' => string 'test3' (length=5)
//       'price' => int 30
```

### 数组切片

- slice($offset, $length)
  - offset `int` 起始
  - length `int` 长度
  - return `array`

```php
$lists = Lists::data([1, 2, 3, 4, 5]);

dump($lists->slice(1, 3));
// array (size=3)
//   0 => int 2
//   1 => int 3
//   2 => int 4
```

### 获取数组

- toArray()
  - return `array`

```php
$lists = Lists::data([
    [
        'product' => 'test1',
        'price' => 10
    ],
    [
        'product' => 'test2',
        'price' => 20
    ],
    [
        'product' => 'test3',
        'price' => 30
    ]
]);

dump($lists->toArray());
// array (size=3)
//   0 =>
//     array (size=2)
//       'product' => string 'test1' (length=5)
//       'price' => int 10
//   1 =>
//     array (size=2)
//       'product' => string 'test2' (length=5)
//       'price' => int 20
//   2 =>
//     array (size=2)
//       'product' => string 'test3' (length=5)
//       'price' => int 30
```

### 转为 Json

- toJson()
  - return `string`

```php
$lists = Lists::data([
    [
        'product' => 'test1',
        'price' => 10
    ],
    [
        'product' => 'test2',
        'price' => 20
    ],
    [
        'product' => 'test3',
        'price' => 30
    ]
]);

dump($lists->toJson());
// [{"product":"test1","price":10},{"product":"test2","price":20},{"product":"test3","price":30}]
```

### 转为二进制

- toBinary()
  - return `string`

```php
$lists = Lists::data([
    [
        'product' => 'test1',
        'price' => 10
    ],
    [
        'product' => 'test2',
        'price' => 20
    ],
    [
        'product' => 'test3',
        'price' => 30
    ]
]);

dump($lists->toBinary());
// ���product�test1�price
// ��product�test2�price��product�test3�price
```

### 转为树形结构

- toTree($id_name = 'id', $parent_name = 'parent', $child_name = 'children', $top_parent = 0) :id=to_tree
  - id_name `string` 数组主键名称
  - parent_name `string` 数组父级关联名称
  - child_name `string` 树形子集名称定义
  - top_parent `int|string` 最高级父级
  - return `array`

```php
$lists = Lists::data([
    [
        'id' => 1,
        'name' => 'node1',
        'parent' => 0
    ],
    [
        'id' => 2,
        'name' => 'node2',
        'parent' => 0
    ],
    [
        'id' => 3,
        'name' => 'node3',
        'parent' => 1
    ],
    [
        'id' => 4,
        'name' => 'node4',
        'parent' => 1
    ],
    [
        'id' => 5,
        'name' => 'node5',
        'parent' => 4
    ],
    [
        'id' => 6,
        'name' => 'node6',
        'parent' => 2
    ],
]);

$tree = $lists->toTree();
```

## Logging 队列处理

是用于简化数据收集消息队列写入的函数, 首先需要配置 `Rabbitmq`，并安装库

```shell
composer require kain/think-logging
```

使用前需配置 Logging 队列写入服务 https://github.com/kainonly/amqp-logging-service

配置 `config/queue.php`

```php
return [
    'logging' => [
        'exchange' => 'app.logging.direct',
    ]
];
```

- exchange 交换器路径

### 日志收集队列写入

- push($namespace, $raws = [])
  - $namespace `string` 行为命名
  - raws `array` 原始数据

使用如下

```php
Logging::push('pay_order', [
    'order' => Tools::orderNumber('L1', 'A1', '1100'),
    'product' => Tools::uuid(),
    'user' => Tools::uuid(),
    'create_time' => time(),
    'update_time' => time()
]);
```