import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCacheInterceptor } from './ngx-cache.interceptor';
import { NgxCacheEnum } from './ngx-cache.enum';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxCacheInterceptor,
      multi: true
    }
  ]
})
export class NgxCacheModule {
  static forRoot(options: { path: string, base: string, ttl: number, type?: NgxCacheEnum }[]): ModuleWithProviders<NgxCacheModule> {
    return {
      ngModule: NgxCacheModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS_CACHE',
          useValue: options,
        },
        NgxCacheInterceptor
      ]
    }
  }
}


