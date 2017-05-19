import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MenuSingleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuSingleProvider {

  constructor(public http: Http) {
    
  }
  getJsonData(apiUrl) {
      return this.http.get(apiUrl).map(res => res.json());
  }

}
