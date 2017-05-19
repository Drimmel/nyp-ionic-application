import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReceiptProvider } from '../../../providers/receipt-provider';

import { SelectStorePage } from '../select-store/select-store';
import { SuccesPage } from '../succes/succes'; 

import { AddEditAddressModalPage } from '../../account/add-edit-address-modal/add-edit-address-modal';

/*
  Generated class for the IndexCheckout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-index-checkout',
  templateUrl: 'index-checkout.html'
})
export class IndexCheckoutPage {

    public receipt: any;
    public receiptTotal: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider
    ) { 
        this.receipt = receiptProvider.receipt;
        this.receiptTotal = (receiptProvider.receiptTotal).toFixed(2);
    }

    toggleContent(e) {
        if (e._checked == true) {
            (<HTMLElement>document.getElementById('checkout-logged-in')).style.display = 'block';
            (<HTMLElement>document.getElementById('checkout-logged-out')).style.display = 'none';
        } else {
            (<HTMLElement>document.getElementById('checkout-logged-in')).style.display = 'none';
            (<HTMLElement>document.getElementById('checkout-logged-out')).style.display = 'block';
        }
    }

  getSum() {
      let sum = 0;
      for (var i = 0; i < this.receipt.length; i++) {
          sum += this.receipt[i].amount;
      }
      return sum.toString();
  }

  deliveryType(e) {
      console.log(e);
  }

  openSelectStore() {
      this.navCtrl.push(SelectStorePage);
  }

  finishCheckout() {
      this.receiptProvider.receipt = [];
      this.navCtrl.setRoot(SuccesPage);
  }

  openAddAddressModal() {
      this.navCtrl.push(AddEditAddressModalPage);
  }

}
