# Middleware 中间件

## CORS 跨站设置

使用CORS中间定义跨站的请求策略，你需要在主配置或对应的模块下创建配置 `config/cors.php`，例如：

```php
return [

    'allow_origin' => [
        'http://localhost:3000',
    ],
    'allow_credentials' => false,
    'allow_methods' => ['GET', 'OPTIONS', 'POST', 'PUT'],
    'expose_headers' => [],
    'allow_headers' => ['Content-Type', 'X-Requested-With', 'X-Token'],
    'max_age' => 0,

];
```

- allow_origin `array` 允许访问该资源的外域 URI，对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符 `['*']`
- allow_credentials `boolean` 允许浏览器读取response的内容
- expose_headers `array` 允许浏览器访问的头放入白名单
- allow_headers `string` 允许携带的首部字段
- allow_methods `array` 允许使用的 HTTP 方法
- max_age `int` preflight请求的结果能够被缓存多久


注册中间件 `config/middleware.php`

```php
return [
    'cors' => \think\bit\middleware\Cors::class
];
```

在控制器中引入

```php
abstract class BaseController
{

    protected $middleware = ['cors'];

}
```

## Auth 鉴权验证

AuthVerify 鉴权验证是一个抽象定义中间件，使用时需要根据场景继承定义，例如

```php
class SystemAuthVerify extends AuthVerify
{
    protected $scene = 'system';

    protected function hook(stdClass $symbol): bool
    {
        $data = AdminRedis::create()->get($symbol->user);
        if (empty($data)) {
            $this->hookResult = [
                'error' => 1,
                'msg' => 'freeze'
            ];
            return false;
        }
        return true;
    }
}
```

- scene `string` 场景标签
- hook(stdClass $symbol): bool 中间件钩子

然后在将中间件注册在应用的 `middleware.php` 配置下

```php
return [
    'auth' => \app\system\middleware\SystemAuthVerify::class
];
```

在控制器中重写 `$middleware`

```php
namespace app\system\controller;

class Index extends BaseController
{
    protected $middleware = ['auth'];

    public function index()
    {
        return [];
    }
}
```

## 全局返回 JSON

强制响应为 JSON，省略每个 Action 都要设置响应输出，首先加入 `middleware.php`

```php
return [
    'json' => \think\bit\middleware\JsonResponse::class,
];
```

在控制器中重写 `$middleware`

```php
namespace app\index\controller;

use app\index\BaseController;

class Index extends BaseController
{
    protected $middleware = ['json'];

    public function index()
    {
        return [];
    }
}
```

## 过滤 POST 请求

将 Restful API 请求全局统一为 `POST` 类型，首先加入 `middleware.php`

```php
return [
    'post' => \think\bit\middleware\FilterPostRequest::class,
];
```

在控制器中重写 `$middleware`

```php
namespace app\index\controller;

use app\index\BaseController;

class Index extends BaseController
{
    protected $middleware = ['post'];

    public function index()
    {
        return [];
    }
}
```
