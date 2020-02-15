import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N, zh_CN, NgZorroAntdModule } from 'ng-zorro-antd';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NzResizableModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
