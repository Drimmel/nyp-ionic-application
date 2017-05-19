import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { IndexCheckoutPage } from '../../checkout/index-checkout/index-checkout';

import { ReceiptProvider } from '../../../providers/receipt-provider';
/*
  Generated class for the MyOrderHistoryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-order-history-details',
  templateUrl: 'my-order-history-details.html'
})
export class MyOrderHistoryDetailsPage {

    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController
    ) {
        this.receipt = receiptProvider.receipt;
    }

    repeatOrder() {
        let confirm = this.alertCtrl.create({
            title: 'Bestelling herhalen',
            message: 'Weet je zeker dat je de bestelling van 26 januari 2017 wilt herhalen?',
            buttons: [
                {
                    text: 'Nee',
                    handler: () => {
                        this.toastPopup('Bestelling geannuleerd', 'bottom', 'red');
                    }
                },
                {
                    text: 'Ja',
                    handler: () => {
                        let product = {
                            "name": "The Voice of Holland Pepperoni Pizza",
                            "desc": "De lekkerste pizza maak je zelf! Kies je favoriete bodem, je favoriete saus en maak een keuze uit 26 heerlijke toppings.",
                            "bottom": "30cm NY Style",
                            "Price": 6.99,
                            "imgsrc": "./assets/images/pizzas/brooklyn.png"
                        };
                        this.receiptProvider.addToReceipt(product);
                        this.receiptProvider.addToReceiptTotal(product);
                        this.goToCheckout();
                    }
                }
            ]
        });
        confirm.present();
    }

    addToReceipt() {
        let product = {
            "name": "Custom Pizza",
            "desc": "De lekkerste pizza maak je zelf! Kies je favoriete bodem, je favoriete saus en maak een keuze uit 26 heerlijke toppings.",
            "bottom": "25cm NY Style",
            "Price": 11.99,
            "imgsrc": "./assets/images/pizzas/zelf-samenstellen.png"
        };
        this.receiptProvider.addToReceipt(product);
        this.receiptProvider.addToReceiptTotal(product);
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDelay = '200ms';
        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1200);
    }

    goToCheckout() {
        if (this.receiptProvider.receipt.length == 0) {
            let alert = this.alertCtrl.create({
                title: 'Winkelmandje is leeg!',
                subTitle: 'Voeg eerst wat items toe voordat je kunt afrekenen.',
                buttons: ['OK']
            });
            alert.present();
        } else {
            this.navCtrl.push(IndexCheckoutPage);
        }
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

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
