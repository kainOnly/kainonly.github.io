# Extra 扩展库

## Hash 密码

Hash 用于密码加密与验证，此服务必须安装 `kain/hyperf-extra`，需要添加配置 `config/autoload/hashing.php`

```php
return [

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default hash driver that will be used to hash
    | passwords for your application. By default, the bcrypt algorithm is
    | used; however, you remain free to modify this option if you wish.
    |
    | Supported: "bcrypt", "argon", "argon2id"
    |
    */

    'driver' => 'argon2id',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Bcrypt algorithm. This will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Argon algorithm. These will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

    'argon' => [
        'memory' => 1024,
        'threads' => 2,
        'time' => 2,
    ],

];
```

- driver `bcrypt|argon|argon2id` 加密算法
- bcrypt `array` bcrypt 的配置
- argon `array` argon2i 与 argon2id 的配置

在 `config/autoload/dependencies.php` 内完成关系配置

```php
return [
    Hyperf\Extra\Hash\HashInterface::class => Hyperf\Extra\Hash\HashFactory::class
];
```

即可注入使用

```php
use Hyperf\Extra\Hash\HashInterface;

class IndexController
{
    public function index(HashInterface $hash)
    {
        return [
            'hash' => $hash->create('test')
        ];
    }
}
```

也可以使用注解方式

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Hash\HashInterface;

class IndexController
{
    /**
     * @Inject()
     * @var HashInterface
     */
    private HashInterface $hash;

    public function index()
    {
        return [
            'hash' => $this->hash->create('test')
        ];
    }
}
```

### 加密密码

- create($password, $options = [])
  - password `string` 密码
  - options `array` 加密参数

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Hash\HashInterface;

class IndexController
{
    /**
     * @Inject()
     * @var HashInterface
     */
    private HashInterface $hash;

    public function index()
    {
        $hashPassword = $this->hash->create('test');
        // $argon2id$v=19$m=65536,t=4,p=1$Z09laTVhVWRnN1E0RzNqUg$XmHfnX0Kol3EOO5WnVTAWSnkstkDsEGfCCSbUWGgUMU
    }
}
```

### 验证密码

- check($password, $hashPassword)
  - password `string` 密码
  - hashPassword `string` 密码散列值

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Hash\HashInterface;

class IndexController
{
    /**
     * @Inject()
     * @var HashInterface
     */
    private HashInterface $hash;

    public function index()
    {
        $hashPassword = '$argon2id$v=19$m=65536,t=4,p=1$Z09laTVhVWRnN1E0RzNqUg$XmHfnX0Kol3EOO5WnVTAWSnkstkDsEGfCCSbUWGgUMU';
        $this->hash->check('test', $hashPassword);
        // true
    }
}
```

## Cipher 数据加密

Cipher 可以将字符串或数组进行加密解密的服务，此服务必须安装 `kain/hyperf-extra`，需要配置 `config/config.php`

```php
return [

    'app_name' => env('APP_NAME', 'skeleton'),
    'app_key' => env('APP_KEY', '123456'),

];
```

- app_name `string` Cipher 偏移量
- app_key `string` Cipher 密钥

在 `config/autoload/dependencies.php` 内完成关系配置

```php
return [
    Hyperf\Extra\Cipher\CipherInterface::class => Hyperf\Extra\Cipher\CipherFactory::class,
];
```

即可注入使用

```php
use Hyperf\Extra\Cipher\CipherInterface;

class IndexController
{
    public function index(CipherInterface $cipher)
    {
        $cipher->encrypt('123');
    }
}
```

也可以使用注解方式

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Cipher\CipherInterface;

class IndexController
{
    /**
     * @Inject()
     * @var CipherInterface
     */
    private CipherInterface $cipher;

    public function index()
    {
        $this->cipher->encrypt('123');
    }
}
```

### 加密数据

- encrypt($context)
  - context `string|array` 数据
  - Return `string` 密文

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Cipher\CipherInterface;

class IndexController
{
    /**
     * @Inject()
     * @var CipherInterface
     */
    private CipherInterface $cipher;

    public function index()
    {
        $this->cipher->encrypt(['name' => 'kain']);
        // XMqRFrrGduqqY3sEyKiHJQ==
    }
}
```

### 解密数据

- decrypt(string $ciphertext, bool $auto_conver = true)
  - ciphertext `string` 密文
  - auto_conver `bool` 数据属于数组时是否自动转换
  - Return `string|array` 明文

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Cipher\CipherInterface;

class IndexController
{
    /**
     * @Inject()
     * @var CipherInterface
     */
    private CipherInterface $cipher;

    public function index()
    {
        $this->cipher->decrypt('XMqRFrrGduqqY3sEyKiHJQ==');
        // array(1) {
        //     ["name"]=>
        //     string(4) "kain"
        // }
    }
}
```

## Token 令牌

Token 是 JSON Web Token 方案的功能服务，此服务必须安装 `kain/hyperf-extra`，首先更新配置 `config/autoload/token.php`

```php
return [
    'system' => [
        'issuer' => 'api.kainonly.com',
        'audience' => 'console.kainonly.com',
        'expires' => 3600
    ],
];
```

当中 `system` 就是 `Token` 的 Label 标签，可以自行定义名称

- issuer `string` 发行者
- audience `string` 听众
- expires `int` 有效时间

在 `config/autoload/dependencies.php` 内完成关系配置

```php
return [
    Hyperf\Extra\Token\TokenInterface::class => Hyperf\Extra\Token\TokenFactory::class,
];
```

即可注入使用

```php
use Hyperf\Extra\Token\TokenInterface;
use Hyperf\Utils\Str;
use stdClass;

class IndexController
{

    public function index(TokenInterface $token)
    {
        $token->create('system', Str::random(), Str::random(8), [
            'role' => '*'
        ]);
    }
}
```

也可以使用注解方式

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Token\TokenInterface;
use Hyperf\Utils\Str;
use stdClass;

class IndexController
{
    /**
     * @Inject()
     * @var TokenInterface
     */
    private TokenInterface $token;

    public function index()
    {
        $this->token->create('system', Str::random(), Str::random(8), [
            'role' => '*'
        ]);
    }
}
```

### 生成令牌

- create(string $scene, string $jti, string $ack, array $symbol = []): Plain
  - scene `string` 场景标签
  - jti `string` Token ID
  - ack `string` Token 确认码
  - symbol `array` 标识组
  - Return `Lcobucci\JWT\Token\Plain`

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Token\TokenInterface;
use Hyperf\Utils\Str;
use stdClass;

class IndexController
{
    /**
     * @Inject()
     * @var TokenInterface
     */
    private TokenInterface $token;

    public function index()
    {
        $symbol = new stdClass();
        $symbol->role = '*';
        $token = $this->token->create('system', Str::random(), Str::random(8), [
            'role' => '*'
        ]);
        var_dump($token->toString());
    }
}
```

### 获取令牌对象

- get(string $jwt): Plain
  - jwt `string` 字符串令牌
  - Return `Lcobucci\JWT\Token\Plain`

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Token\TokenInterface;

class IndexController
{
    /**
     * @Inject()
     * @var TokenInterface
     */
    private TokenInterface $token;

    public function index()
    {
        $tokenString = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6InNMYW1vdkRMcFpMaTBKMzIifQ.eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiJzTGFtb3ZETHBaTGkwSjMyIiwiYWNrIjoiZlUxeUN6U2ciLCJzeW1ib2wiOnsicm9sZSI6IioifSwiZXhwIjoxNTg1MzY1MDUzfQ.zkamZXgUaqOTZEn8JBBo-8k3oZAzuU7zWH-ZtNJjagA';
        $token = $this->token->get($tokenString);
        assert($token instanceof Plain);
        var_dump($token);
    }
}
```

### 验证令牌有效性

- verify(string $scene, string $jwt): stdClass
  - scene `string` 场景标签
  - jwt `string` 字符串令牌
  - Return `stdClass`
    - expired `bool` 是否过期
    - token `\Lcobucci\JWT\Token` 令牌对象

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Token\TokenInterface;

class IndexController
{
    /**
     * @Inject()
     * @var TokenInterface
     */
    private TokenInterface $token;

    public function index()
    {
        $tokenString = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6InNMYW1vdkRMcFpMaTBKMzIifQ.eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiJzTGFtb3ZETHBaTGkwSjMyIiwiYWNrIjoiZlUxeUN6U2ciLCJzeW1ib2wiOnsicm9sZSI6IioifSwiZXhwIjoxNTg1MzY1MDUzfQ.zkamZXgUaqOTZEn8JBBo-8k3oZAzuU7zWH-ZtNJjagA';
        $result = $this->token->verify('system', $tokenString);
        var_dump($result);
    }
}
```

## Utils 工具集

Utils 常用工具集合，此服务必须安装 `kain/hyperf-extra`，在 `config/autoload/dependencies.php` 内完成关系配置

```php
return [
    Hyperf\Extra\Utils\UtilsInterface::class => Hyperf\Extra\Utils\UtilsFactory::class,
];
```

### 设置 Cookie

- cookie(string $name, string $value, array $options = []): Cookie
  - name `string` Cookie 名称
  - value `string` 值
  - options `array` 配置

配置将以 `config/autoload/cookie.php` 作为基础

```php
return [
    'expire' => (int)env('COOKIE_EXPIRE', 0),
    'path' => env('COOKIE_PATH', '/'),
    'domain' => env('COOKIE_DOMAIN', ''),
    'secure' => (bool)env('COOKIE_SECURE', false),
    'httponly' => (bool)env('COOKIE_HTTPONLY', false),
    'raw' => true,
    'samesite' => env('COOKIE_SAMESITE', null),
];
```

返回携带 Cookie 的请求

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Extra\Utils\UtilsInterface;
use Hyperf\HttpServer\Contract\ResponseInterface;

class IndexController
{
    /**
     * @Inject()
     * @var ResponseInterface
     */
    private ResponseInterface $response;
    /**
     * @Inject()
     * @var UtilsInterface
     */
    private UtilsInterface $utils;

    public function index()
    {
        $cookie = $this->utils->cookie('name', 'kain');
        return $this->response->withCookie($cookie)->json([
            'error' => 0,
            'msg' => 'ok'
        ]);
    }
}
```

## Helper 助手

Helper 助手函数扩展，此服务必须安装 `kain/hyperf-extra`

### 路由绑定

- AutoController(string $controller, array $options = [])
  - controller `string` 控制器
  - options `array`
    - middleware `array` 中间件

```php
AutoController(App\Controller\System\AclController::class, [
    'middleware' => [
        App\Middleware\System\AuthVerify::class,
        App\Middleware\System\RbacVerify::class
    ]
]);
```

例如 **AclController** 控制器中存在 `originLists()` `lists()` `add()` `get()` `edit()` `delete()`
等公有函数，他们分别被绑定为 `/acl/originLists` `/acl/lists` `/acl/add` `/acl/get` `/acl/edit` `/acl/delete` 的 POST
路由。当然肯定还会存在不想绑定的函数，可以通过配置 `config/autoload/curd.php` 忽略它们

```php
return [
    'auto' => [
        'ignore' => [
            '__construct',
            'addAfterHooks',
            'addBeforeHooks',
            'deleteAfterHooks',
            'deleteBeforeHooks',
            'deletePrepHooks',
            'editAfterHooks',
            'editBeforeHooks',
            'getBeforeHooks',
            'getCustomReturn',
            'listsBeforeHooks',
            'listsCustomReturn',
            'originListsBeforeHooks',
            'originListsCustomReturn'
        ]
    ]
];
```

可以通过数组集合来限定需要运行中间件的路由

```php
AutoController(App\Controller\System\MainController::class, [
    'middleware' => [
        App\Middleware\System\AuthVerify::class => [
            'resource', 'information', 'update', 'uploads'
        ]
    ]
]);
```

### 生成 uuid v4

- uuid()
  - return `UuidInterface`

```php
$uuid = uuid();
dump($uuid->toString());

// "a2bcf1d5-2be3-4dc6-8cd4-937835a18a8b"
```

### Stringy 字符串工具

- stringy($str = '', $encoding = null)
  - str `string`
  - encoding `string`
  - return `Stringy\Stringy` 对象说明，https://github.com/danielstjules/Stringy

```php
stringy('abc');
```

## CORS 跨站设置

使用 CORS 中间定义跨站的请求策略，你需要在主配置或对应的模块下创建配置 `config/autoload/cors.php`，例如：

```php
return [
    'allowed_methods' => explode(',', env('CORS_METHODS', '*')),
    'allowed_origins' => explode(',', env('CORS_ORIGINS', '*')),
    'allowed_headers' => explode(',', env('CORS_HEADERS', 'CONTENT-TYPE,X-REQUESTED-WITH')),
    'exposed_headers' => explode(',', env('CORS_EXPOSED_HEADERS', '')),
    'max_age' => (int)env('CORS_MAX_AGE', 0),
    'allowed_credentials' => env('CORS_CREDENTIALS', false),
];
```

- allowed_methods `array` 允许使用的 HTTP 方法
- allowed_origins `array` 允许访问该资源的外域 URI，对于不需要携带身份凭证的请求
- allowed_headers `string` 允许携带的首部字段
- exposed_headers `array` 允许浏览器访问的头放入白名单
- max_age `int` preflight 请求的结果能够被缓存多久
- allowed_credentials `boolean` 允许浏览器读取 response 的内容

在 `config/autoload/dependencies.php` 内完成关系配置

```php
return [
    Hyperf\Extra\Cors\CorsInterface::class => Hyperf\Extra\Cors\CorsFactory::class
];
```

加入 `/system` 的路由组

```php
Router::addGroup('/system', function () {

}, [
    'middleware' => [
        Hyperf\Extra\Cors\CorsMiddleware::class
    ]
]);
```

## Auth 鉴权验证

AuthMiddleware 鉴权验证是一个抽象定义中间件，使用时需要根据场景继承定义，例如

```php
<?php
declare(strict_types=1);

namespace App\Middleware\System;

use Hyperf\Extra\Auth\AuthMiddleware;

class AuthVerify extends AuthMiddleware
{
    protected string $scene = 'system';
}
```

- scene `string` 场景标签

然后在将中间件注册在路由中

```php
AutoController(App\Controller\System\MainController::class, [
    'middleware' => [
        App\Middleware\System\AuthVerify::class => [
            'resource', 'information', 'update', 'uploads'
        ]
    ]
]);
```

Auth 创建登录后将 Token 字符串存储在 Cookie 中，使用它需要引用该特性与部分依赖，以 `app/Controller/System/MainController.php` 为例

```php
class MainController extends BaseController
{
    use Auth;
    /**
     * @Inject()
     * @var RefreshToken
     */
    private RefreshToken $refreshToken;
    /**
     * @Inject()
     * @var AdminRedis
     */
    private AdminRedis $adminRedis;

    /**
     * User login
     */
    public function login(): ResponseInterface
    {
        try {
            $this->post = $this->request->post();
            $validator = $this->validation->make($this->post, [
                'username' => 'required|between:4,20',
                'password' => 'required|between:8,18',
            ]);

            if ($validator->fails()) {
                return $this->response->json([
                    'error' => 1,
                    'msg' => $validator->errors()
                ]);
            }

            $data = $this->adminRedis->get($this->post['username']);

            if (empty($data)) {
                return $this->response->json([
                    'error' => 1,
                    'msg' => 'username not exists'
                ]);
            }

            if (!$this->hash->check($body['password'], $data['password'])) {
                return $this->response->json([
                    'error' => 1,
                    'msg' => 'password incorrect'
                ]);
            }

            return $this->create('system', [
                'user' =>  $data['username'],
                'role' => explode(',', $data['role'])
            ]);
        } catch (Exception $e) {
            return $this->response->json([
                'error' => 1,
                'msg' => $e->getMessage()
            ]);
        }
    }

    /**
     * User verify
     */
    public function verify(): ResponseInterface
    {
        try {
            return $this->authVerify('system');
        } catch (Exception $e) {
            return $this->response->json([
                'error' => 1,
                'msg' => $e->getMessage()
            ]);
        }
    }

    /**
     * User logout
     */
    public function logout(): ResponseInterface
    {
        try {
            return $this->destory('system');
        } catch (Exception $e) {
            return $this->response->json([
                'error' => 1,
                'msg' => $e->getMessage()
            ]);
        }
    }
}
```

### 设置令牌自动刷新的总时效

- refreshTokenExpires(): int
  - return `int` 通过重写自定义，默认 `604800`，单位< 秒 >

### 创建登录鉴权

- create(string $scene, ?stdClass $symbol): Psr\Http\Message\ResponseInterface
  - scene `string` 场景标签
  - symbol `array` 标识

### 验证登录

- authVerify($scene): Psr\Http\Message\ResponseInterface
  - scene `string` 场景标签

### 销毁登录鉴权

- destory(string $scene): Psr\Http\Message\ResponseInterface
  - scene `string` 场景标签

## RBAC 权限验证

RbacMiddleware 权限验证是一个抽象定义中间件，使用时需要根据场景继承定义，例如

```php
declare(strict_types=1);

namespace App\Middleware\System;

use App\RedisModel\System\AclRedis;
use App\RedisModel\System\RoleRedis;
use Hyperf\Extra\Rbac\RbacMiddleware;

class RbacVerify extends RbacMiddleware
{
    protected string $prefix = 'system';
    protected array $ignore = [
        'valided*'
    ];

    public function __construct(RoleRedis $role, AclRedis $acl)
    {
        parent::__construct($role, $acl);
    }
}
```

- prefix `string` url 前缀
- ignore `array` 忽略的函数名

```php
AutoController(App\Controller\System\AclController::class, [
    'middleware' => [
        App\Middleware\System\AuthVerify::class,
        App\Middleware\System\RbacVerify::class
    ]
]);
```

## RedisModel 缓存模型

使用 RedisModel 定义缓存模型，目的是将分散的缓存操作统一定义，例如：设定 Acl 访问控制表的缓存模型

```php
class AclRedis extends RedisModel
{
    protected string $key = 'system:acl';

    /**
     * Clear Cache
     */
    public function clear(): void
    {
        $this->redis->del($this->key);
    }

    /**
     * Get Cache
     * @param string $key
     * @param int $policy
     * @return array
     */
    public function get(string $key, int $policy): array
    {
        if (!$this->redis->exists($this->key)) {
            $this->update();
        }

        $raws = $this->redis->hGet($this->key, $key);
        $data = !empty($raws) ? json_decode($raws, true) : [];

        switch ($policy) {
            case 0:
                return explode(',', $data['read']);
            case 1:
                return [
                    ...explode(',', $data['read']),
                    ...explode(',', $data['write'])
                ];
            default:
                return [];
        }
    }

    /**
     * Refresh Cache
     */
    private function update(): void
    {
        $query = Db::table('acl')
            ->where('status', '=', 1)
            ->get(['key', 'write', 'read']);

        if ($query->isEmpty()) {
            return;
        }

        $lists = [];
        foreach ($query->toArray() as $value) {
            $lists[$value->key] = json_encode([
                'write' => $value->write,
                'read' => $value->read
            ]);
        }
        $this->redis->hMSet($this->key, $lists);
    }
}
```

当对应的 `acl` 表数据发生变更时，执行 `clear()` 来清除缓存

```php
use App\RedisModel\System\AclRedis;
use Hyperf\Di\Annotation\Inject;

class IndexController
{
    /**
     * @Inject()
     * @var AclRedis
     */
    private AclRedis $aclRedis;

    public function index()
    {
        $this->aclRedis->clear();
    }
}
```

通过缓存模型自定义的获取规则获取对应的数据，例如：查访问键 `admin` 对应的数据，如缓存不存在则生成缓存并返回数据

```php
use App\RedisModel\System\AdminRedis;
use Hyperf\Di\Annotation\Inject;

class IndexController
{
    /**
     * @Inject()
     * @var AdminRedis
     */
    private AdminRedis $adminRedis;

    public function index()
    {
        $data = $this->adminRedis->get('kain');
    }
}
```

### SMS 短信验证

`*手机短信验证码缓存类*`

#### 设置手机验证码缓存

- factory(string $phone, string $code, int $timeout = 120): bool
  - phone `string` 手机号
  - code `string` 验证码
  - timeout `int` 超时时间，默认 60 秒

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Support\RedisModel\Sms;

class IndexController
{
    /**
     * @Inject()
     * @var Sms
     */
    private Sms $smsRedis;

    public function index()
    {
        $this->smsRedis->factory('12345678910', '13125');
    }
}
```

#### 验证手机验证码

- check(string $phone, string $code, bool $once = false): bool
  - phone `string` 手机号
  - code `string` 验证码
  - once `bool` 验证成功后失效，默认`false`

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Support\RedisModel\Sms;

class IndexController
{
    /**
     * @Inject()
     * @var Sms
     */
    private Sms $smsRedis;

    public function index()
    {
        $this->smsRedis->check('12345678910', '13125');
    }
}

```

#### 获取验证时间

- time(string $phone): array
  - phone `string` 手机号

```php
use Hyperf\Di\Annotation\Inject;
use Hyperf\Support\RedisModel\Sms;

class IndexController
{
    /**
     * @Inject()
     * @var Sms
     */
    private Sms $smsRedis;

    public function index()
    {
        $this->smsRedis->time('12345678910');
    }
}
```

- publish_time `int` 指发布时间
- timeout `int` 指有效时间

### Refresh Token 缓存

`*Refresh Token 是用于自动刷新、验证对应 Token 的缓存模型*`

#### 生产 Refresh Token

- factory(string $jti, string $ack, int $expires): bool
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码
  - expires `int` 有限时间，单位<秒>

#### Refresh Token 续约

- renewal(string $jti, int $expires): void
  - jti `string` JSON Web Token ID
  - expires `int` 有限时间，单位<秒>

#### 验证 Token 的 Token ID 有效性

- verify(string $jti, string $ack): bool
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码

#### 清除 Token 对应的 Refresh Token

- clear(string $jti, string $ack): int
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码

### Lock 锁定

`*适用于用户名或IP等验证锁定*`

#### 锁定清零

- remove(string $name): void
  - name `string` 索引

#### 锁定验证

- check(string $name, int $limit = 5): bool
  - name `string` 索引
  - limit `int` 固定上限
  - Return `bool`

#### 锁定自增

- inc(string $name): void
  - name `string` 索引

#### 锁定延长，延长锁定 15 分钟

- lock(string $name): void
  - name `string` 索引
