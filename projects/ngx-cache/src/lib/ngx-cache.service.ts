import { Injectable } from '@angular/core';
import { NgxCacheEnum } from './ngx-cache.enum';

@Injectable({
  providedIn: 'root'
})
export class NgxCacheService {

  constructor() { }

  find(key: string, ttl: number, type: NgxCacheEnum = NgxCacheEnum.sessionstorage) {
    return this.validate(key, ttl, type) ? this.getCache(key, type) : undefined
  }

  save(key: string, data: string, type: NgxCacheEnum = NgxCacheEnum.sessionstorage, ttl: number = 0) {
    NgxCacheEnum.set(key, data, type, ttl)
  }

  remove(key: string, type: NgxCacheEnum = NgxCacheEnum.sessionstorage) {
    NgxCacheEnum.remove(key, type)
  }

  private validate(key: string, ttl: number, type: NgxCacheEnum) {
    let cache = this.getCache(key, type)

    if (type == NgxCacheEnum.cookie) { return cache ? true : false }

    let date = new Date(parseInt(this.getCache(key + "-cas", type)));
    date.setSeconds(date.getSeconds() + ttl);
    const now = new Date()

    return cache ? date >= now : false
  }

  private getCache(key: string, type: NgxCacheEnum) {
    const cache = NgxCacheEnum.get(key, type)
    return cache ? JSON.parse(cache) : undefined
  }
}
