import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class TitleResolver implements Resolve<any> {


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log('resolving title');

    return of({a: 'my-awesome-title', b: 'superb!'});
  }
}
