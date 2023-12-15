import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable, from, map } from "rxjs";
import { NgxCacheService } from "./ngx-cache.service";
import { NgxCacheEnum } from "./ngx-cache.enum";

@Injectable({
    providedIn: 'root'
})
export class NgxCacheInterceptor implements HttpInterceptor {

    constructor(
        @Inject('CONFIG_OPTIONS_CACHE') private options: [{ path: string, base: string, ttl: number, type?: NgxCacheEnum }],
        protected ngxCacheService: NgxCacheService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (req.method != "GET") return next.handle(req); 

        const url = this.options.find(opt => req.url.search(`${opt.base}${opt.path}`) == 0)

        if (!url) return next.handle(req);

        let data = this.ngxCacheService.find(`${url.base}${url.path}`, url.ttl, url.type)
        if (data) {
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            return from(new Promise(resolve =>
                resolve(new HttpResponse({
                    body: data,
                    headers: headers
                }))
            ));
        } else {
            return next.handle(req)
                .pipe(map((res: any) => {
                    if (res?.body) {
                        this.ngxCacheService.save(req.url, JSON.stringify(res.body), url.type, url.ttl)
                    }
                    return res
                }))
        }
    }

}