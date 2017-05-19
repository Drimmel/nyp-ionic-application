import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeolocationToCityname provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeolocationToCityname {

    constructor(private http: Http) {
    
  }

    getCityname(lat, lgt) {
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lgt + '&sensor=true').map(res => res.json());
    }
}
