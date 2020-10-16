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