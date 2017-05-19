import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ReceiptProvider } from '../../../providers/receipt-provider';

/*
  Generated class for the ActieDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-actie-detail-modal',
  templateUrl: 'actie-detail-modal.html'
})
export class ActieDetailModalPage {
    public couponId: number;
    public title: string;
    public price: number;
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController
    ) { 
        this.couponId = this.navParams.get('couponId');
        this.title = this.navParams.get('title');
        this.price = this.navParams.get('price');

        this.receipt = receiptProvider.receipt;
    }

    toastPopup(message, position, className) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: position,
            cssClass: className
        });
        toast.present();
    }

    addToReceipt() {
        let product = {
            "name": this.title,
            "desc": this.couponId,
            "bottom": "25cm NY Style",
            "Price": this.price,
            "imgsrc": "./assets/images/pizzas/zelf-samenstellen.png"
        };
        this.receiptProvider.addToReceipt(product);
        this.receiptProvider.addToReceiptTotal(product);
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1000);
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }
}
