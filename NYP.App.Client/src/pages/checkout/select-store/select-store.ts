import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
import { Geolocation } from 'ionic-native'
import { GeolocationToCityname } from '../../../providers/geolocation-to-cityname';
/*
  Generated class for the SelectStore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-store',
  templateUrl: 'select-store.html',
  providers: [GeolocationToCityname]
})
export class SelectStorePage {

    public receipt: any;
    public receiptTotal: any;
    address: string = 'Zoek bij jou in de buurt';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        private geolocation: Geolocation,
        platform: Platform,
        public loadingCtrl: LoadingController,
        public geoToCity: GeolocationToCityname
    ) { 
        this.receipt = receiptProvider.receipt;
        this.receiptTotal = receiptProvider.receiptTotal;

    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

    getdata(lat,lgt) {
        this.geoToCity.getCityname(lat, lgt).subscribe(
            result => {
                let data = result;
                this.address = data.results[0].address_components[1].long_name + ', ' + data.results[0].address_components[2].long_name ;
                (<HTMLInputElement>document.querySelector('ion-input')).value = data.results[0].address_components[1].long_name;
            },
            err => {
                console.error("Error : " + err);
            },
            () => {
                // Finished loading
            }
        );
    }

    getPos() {
        let loader = this.loadingCtrl.create({
            content: "Laden..."
        });
        loader.present();
        Geolocation.getCurrentPosition({ enableHighAccuracy: true}).then((resp) => {
            this.getdata(resp.coords.latitude, resp.coords.longitude);
            loader.dismiss();
        }).catch((error) => {
            console.log('Error getting location', error);
        })
    }

}
