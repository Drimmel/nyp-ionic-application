import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
/*
  Generated class for the MyPizzaPoints page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-pizza-points',
  templateUrl: 'my-pizza-points.html'
})
export class MyPizzaPointsPage {
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController
    ) {
        this.receipt = receiptProvider.receipt;
    }

    addPizzaPoints() {
        let confirm = this.alertCtrl.create({
            title: 'Pizzapunten toevoegen',
            message: 'Je staat op het punt om 120 pizza punten toe te voegen, klopt dit?',
            buttons: [
                {
                    text: 'Nee',
                    handler: () => {
                        this.toastPopup('Geen pizzapunten toegevoegd.', 'bottom', 'red');
                    }
                },
                {
                    text: 'Ja',
                    handler: () => {
                        this.toastPopup('Pizzapunten toegevoegd!', 'bottom', 'green');
                    }
                }
            ]
        });
        confirm.present();
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

    addToReceipt(product) {
        let receiptAlert = this.alertCtrl.create({
            title: product.name,
            subTitle: 'Wilt u dit product toevoegen aan uw winkelmandje?',
            buttons: [
                {
                    text: 'Nee',
                    role: 'Cancel'
                },
                {
                    text: 'Toevoegen',
                    handler: () => {
                        this.receiptProvider.addToReceipt(product);
                        this.receiptProvider.addToReceiptTotal(product);
                        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
                        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
                        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1000);
                    }
                }
            ]
        });
        receiptAlert.present();
    }


    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
