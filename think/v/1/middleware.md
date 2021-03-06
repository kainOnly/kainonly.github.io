# Middleware 中间件

## CORS 跨站访问

使用 CORS 中间定义跨站的请求策略，你需要在主配置或对应的模块下创建配置 `config/cors.php`，例如：

```php
return [
    'allow_origin' => [
        'https://api.developer.com'
    ],
    'with_credentials' => true,
    'option_max_age' => 2592000,
    'methods' => 'GET,OPTIONS,POST,PUT',
    'headers' => 'Content-Type,X-Requested-With,X-Token'
];
```

注册中间件，修改主配置目录下 `config/middleware.php`

```php
return [
    'cors' => \bit\middleware\Cors::class,
];
```

在控制器中使用

```php
namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    protected $middleware = ['cors'];

    public function index()
    {
        return 'index';
    }
}
```

在路由中使用

```php
Route::rule('index','index')->middleware('cors');
```

### 配置详情

| 名称             | 类型    | 说明                      |
| ---------------- | ------- | ------------------------- |
| allow_origin     | array   | 允许跨域的域名            |
| with_credentials | boolean | 允许 ajax 请求携带 Cookie |
| option_max_age   | boolean | 缓存 OPTIONS 请求         |
| methods          | string  | 允许请求类型              |
| headers          | string  | 允许定义的头部            |

如果允许所有域名跨域，则将 `allow_origin` 设置为 `[*]`，但 `with_credentials` 将失效，并且 ajax 请求不能携带 cookie。

## LogSystem 系统日志

使用 LogSystem 系统日志, 首先需要 `Rabbitmq` 配置 `config/rabbitmq.php` , 然后在主配置或对应的模块下设置配置 `config/log.php`

```php
return [
    'publish' => 'api.developer.com',
    'exchange' => 'log.system',
    'queue' => 'log.system'
];
```

- publish 发布域名
- exchange 交换器
- queue 队列

注册中间件，修改主配置目录下 `config/middleware.php`

```php
return [
    'log_system' => think\bit\middleware\LogSystem::class
];
```

在控制器中使用

```php
namespace app\system\controller;

use think\Controller;

class Base extends Controller
{
    protected $middleware = ['log_system'];
}
```

使用前对应配置队列写入服务 https://github.com/kainonly/collection-service