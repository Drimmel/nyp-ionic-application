import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public http: Http) {

  }

  getJsonData() {
      return this.http.get('./assets/jsonData/pizza-examples.json').map(res => res.json());
  }

}
