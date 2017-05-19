import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
import { VipcardTermsPage } from '../vipcard-terms/vipcard-terms';

/*
  Generated class for the MyVipcardAndBadges page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-vipcard-and-badges',
  templateUrl: 'my-vipcard-and-badges.html'
})
export class MyVipcardAndBadgesPage {

    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public modalCtrl: ModalController
    ) {
        this.receipt = receiptProvider.receipt;
    }

    saveVipcard() {
        let confirm = this.alertCtrl.create({
            title: 'VIPCard opslaan',
            message: 'Weet je zeker dat je een nieuwe VIPCard wilt opslaan. De oude VIPCard zal worden verwijderd van jouw profiel.',
            buttons: [
                {
                    text: 'Nee',
                    handler: () => {
                        this.toastPopup('VIPCard niet gewijzigd.', 'bottom', 'red');
                    }
                },
                {
                    text: 'Ja',
                    handler: () => {
                        this.toastPopup('Nieuwe VIPCard opgeslagen!', 'bottom', 'green');
                    }
                }
            ]
        });
        confirm.present();
    }

    removeVipcard() {
        let confirm = this.alertCtrl.create({
            title: 'VIPCard verwijderen',
            message: 'Weet je zeker dat je deze VIPCard wilt verwijderen? Je kan dan geen gebruik meer maken van de VIPCard kortingen.',
            buttons: [
                {
                    text: 'Nee',
                    handler: () => {
                        this.toastPopup('VIPCard is niet verwijderd!', 'bottom', 'green');
                    }
                },
                {
                    text: 'Ja',
                    handler: () => {
                        this.toastPopup('VIPCard verwijderd!', 'bottom', 'red');
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

    openVipcardTerms() {
        const VipTermsModal = this.modalCtrl.create(VipcardTermsPage);
        VipTermsModal.present();
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
