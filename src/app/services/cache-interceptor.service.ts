import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {

  private authToken = '5fec5264ffa0406387fcecdf70b4d691';

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'X-Auth-Token': this.authToken,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });

    return next.handle(httpRequest);
  }
}