## bitUpload 上传

关联辅助配置，在上传组件中加入属性指令

```html
<nz-upload nzName="image" bitUpload
            nzListType="picture-card"
            (nzChange)="upload($event)">
    <ng-container *ngIf="!avatar">
    <i nz-icon type="plus"></i>
    <div class="ant-upload-text">{{bit.l['upload']}}</div>
    </ng-container>
    <img width="120" *ngIf="avatar" [src]="bit.static+avatar" class="avatar">
</nz-upload>
```