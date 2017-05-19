import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
import { MyOrderHistoryDetailsPage } from '../my-order-history-details/my-order-history-details';

/*
  Generated class for the MyOrderHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-order-history',
  templateUrl: 'my-order-history.html'
})
export class MyOrderHistoryPage {

    public receipt: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public receiptProvider: ReceiptProvider ) {
        this.receipt = receiptProvider.receipt;
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

    openMyOrderHistoryDetailsPage() {
        this.navCtrl.push(MyOrderHistoryDetailsPage);
    }

}
