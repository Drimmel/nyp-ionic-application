import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
/*
  Generated class for the AddEditAddressModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-edit-address-modal',
  templateUrl: 'add-edit-address-modal.html'
})

export class AddEditAddressModalPage {

    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController
    ) {
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

    saveDetails() {
        this.toastPopup('Gegevens opgeslagen!', 'bottom', 'green')
    }


  getSum() {
      let sum = 0;
      for (var i = 0; i < this.receipt.length; i++) {
          sum += this.receipt[i].amount;
      }
      return sum.toString();
  }

}
