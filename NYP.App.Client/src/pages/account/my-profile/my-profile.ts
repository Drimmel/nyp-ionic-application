import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';

import { MyPizzaPointsPage } from '../my-pizza-points/my-pizza-points';
import { MyDetailsPage } from '../my-details/my-details';
import { MyVipcardAndBadgesPage } from '../my-vipcard-and-badges/my-vipcard-and-badges'; 
import { MyAddressesListPage } from '../my-addresses-list/my-addresses-list';
import { MyOrderHistoryPage } from '../my-order-history/my-order-history';
import { MyOrderHistoryDetailsPage } from '../my-order-history-details/my-order-history-details';
import { MyPizzasPage } from '../my-pizzas/my-pizzas';
/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

    public receipt: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public receiptProvider: ReceiptProvider) {
        this.receipt = receiptProvider.receipt;
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

    openMyPizzaPoints() {
        this.navCtrl.push(MyPizzaPointsPage);
    }
    openMyDetailsPage() {
        this.navCtrl.push(MyDetailsPage);
    }
    openVipcard() {
        this.navCtrl.push(MyVipcardAndBadgesPage);
    }
    openMyPizzas() {
        this.navCtrl.push(MyPizzasPage);
    }
    openAddressesList() {
        this.navCtrl.push(MyAddressesListPage);
    }
    openMyOrderHistory() {
        this.navCtrl.push(MyOrderHistoryPage);
    }

    openMyOrderHistoryDetailsPage() {
        this.navCtrl.push(MyOrderHistoryDetailsPage);
    }

}
