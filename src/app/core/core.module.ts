import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {BASE_URL, BaseUrl} from './services/app.config';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './services/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [
    {
      provide: BASE_URL,
      useValue: BaseUrl
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule should be imported ONLY in AppModule.');
    }
  }
}
