import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(public http: Http) {
    
  }
  getJsonData() {
      return this.http.get('./assets/jsonData/menu-categories.json').map(res => res.json());
  }

}
