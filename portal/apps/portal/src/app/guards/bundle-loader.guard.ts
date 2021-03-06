import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Log } from '@microgamma/loggator';

@Injectable()
export class BundleLoaderGuard implements CanActivate {
  @Log()
  private $log;
  private bundles = {};

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loadBundle(next.data, next).pipe(mapTo(true));
  }

  public loadBundle(bundleData, next): Observable<HTMLElement> {

    return new Observable((observer) => {

      const bundleUrl = bundleData.bundleUrl;
      const bundleName = bundleUrl;


      if (this.bundles[bundleName]) {
        this.$log.d('bundle has already been loaded', bundleName);
        observer.next(this.bundles[bundleName]);
        observer.complete();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = bundleUrl;

      script.onerror = (error) => {

        console.error(error);
        observer.error(error);
      };


      script.onload = () => {
        this.$log.d('bundle loaded', bundleName);

        this.$log.d('creating element', bundleData.tag);
        const elm = document.createElement(bundleData.tag);
        this.bundles[bundleName] = elm;

        observer.next(elm);
        observer.complete();
      };

      this.$log.d('loading bundle', bundleUrl);
      document.body.appendChild(script);

    });

  }

}
