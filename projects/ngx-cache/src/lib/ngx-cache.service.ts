import { Injectable } from '@angular/core';
import { NgxCacheEnum } from './ngx-cache.enum';

@Injectable({
  providedIn: 'root'
})
export class NgxCacheService {

  constructor() { }

  find(key: string, ttl: number, type: NgxCacheEnum = NgxCacheEnum.sessionstorage) {
    const keycas = key + "-cas"
    return this.validate(key, keycas, ttl, type) ? this.getCache(key, type) : undefined
  }

  save(key: string, data: string, type: NgxCacheEnum = NgxCacheEnum.sessionstorage) {
    NgxCacheEnum.set(key, data, type)
    NgxCacheEnum.set(key + "-cas", new Date().getTime().toString(), type)
  }

  remove(key: string, type: NgxCacheEnum = NgxCacheEnum.sessionstorage) {
    NgxCacheEnum.remove(key, type)
    NgxCacheEnum.remove(key + "-cas", type)
  }

  private validate(key: string, keycas: string, ttl: number, type: NgxCacheEnum) {
    let cache = this.getCache(key, type)

    let date = new Date(parseInt(this.getCache(keycas, type)));
    date.setSeconds(date.getSeconds() + ttl);
    const now = new Date()

    return cache ? date >= now : false
  }

  private getCache(key: string, type: NgxCacheEnum) {
    const cache = NgxCacheEnum.get(key, type)
    return cache ? JSON.parse(cache) : undefined
  }
}
