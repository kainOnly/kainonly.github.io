## bitUpload 上传

为文件上传组件提供配置绑定

### 选择器

`[bitUpload]`

### 使用说明

通常情况 `nz-upload` 需要这样定义

```html
<nz-upload 
    nzName="image"
    [nzAction]="bit.uploads"
    [nzWithCredentials]="config.api.withCredentials"
    [nzSize]="5120"
    [nzShowUploadList]="false">
</nz-upload>
```

为 `nz-upload` 创建配置绑定后可以更简洁的实现相同定义

```html
<nz-upload 
    nzName="image"
    bitUpload
    [nzShowUploadList]="false">
</nz-upload>
```

如果上传为对象存储，则 `nzName` 需要为 `file`

```html
<nz-upload class="upload" bitUpload nzName="file">
    <button nz-button>
        <i nz-icon [nzType]="'upload'"></i><span>{{ bit.l["upload"] }}</span>
    </button>
</nz-upload>
```

此时统一配置需要设置 `api.upload` `api.uploadStorage` `api.uploadFetchSigned` `api.uploadFetchSignedMethod`，`api.upload` 替换为对象存储的请求地址（`nzWithCredentials` 不会继承统一配置并为 `false`），`api.uploadStorage` 是对象存储类型可以设置为 `oss` 阿里云、`cos` 腾讯云、`obs` 华为云等，`api.uploadFetchSigned` `api.uploadFetchSignedMethod` 是后端为对象存储生成的签名请求（不同的服务商返回参数不同），例如：

- 阿里云
  - **filename** `string` 文件名（不加扩展名）
  - **option** 配置项
    - **policy** `string` 对象存储策略
    - **access_key_id** `string` AccessKeyId
    - **signature** `string` 签名

```http
GET /system/main/presigned HTTP/1.1
Content-Type: application/json
{
    filename: '...',
    option: {
        policy: '...',
        access_key_id: '...',
        signature: '...'
    }
}
```

- 腾讯云
  - **filename** `string` 文件名（不加扩展名）
  - **option** 配置项
    - **policy** `string` 对象存储策略
    - **sign_algorithm** `string` 签名算法
    - **ak** `string` AccessKey
    - **key_time** `string` 时间范围
    - **signature** `string` 签名

```http
GET /system/main/presigned HTTP/1.1
Content-Type: application/json
{
    policy: '...',
    sign_algorithm: 'sha1',
    ak: '...',
    key_time: '1610462610;1610463210',
    signature: '...'
}
```

- 华为云
  - **filename** `string` 文件名（不加扩展名）
  - **option** 配置项
    - **policy** `string` 对象存储策略
    - **access_key_id** `string` AccessKeyId
    - **signature** `string` 签名

```
GET /system/main/presigned HTTP/1.1
Content-Type: application/json
{
    key: '...',
    policy: '...',
    AccessKeyId: '...',
    signature: '...'
}
```