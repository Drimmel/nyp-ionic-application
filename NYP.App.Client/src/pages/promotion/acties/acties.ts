import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ActieDetailModalPage } from '../actie-detail-modal/actie-detail-modal';

import { ReceiptProvider } from '../../../providers/receipt-provider';

@Component({
  selector: 'page-acties',
  templateUrl: 'acties.html'
})
export class ActiesPage {

    coupons: Array<{ imgSrc: any, title: string, couponId: number, price: number }>;
    burgerDeals: Array<{ imgSrc: any, title: string, couponId: number, price: number }>;
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public receiptProvider: ReceiptProvider
    ) {
        this.coupons = [
            { imgSrc: "./assets/images/promotion/Coupon_191_2_Italian_Dunne_Bodem_Pizza's_17_99-191.jpg", title: "2 Italian Dunne Bodem Pizza's 17,99", couponId: 191, price: 18 },
            { imgSrc: "./assets/images/promotion/1_Pizza_5_euro__studentenactie-332.jpg", title: "1 Pizza 25cm NY Style 5,-, studentenactie", couponId: 332, price: 5 },
            { imgSrc: "./assets/images/promotion/1_pizza_bezorgen_8_99_geldig_bij_een_25_cm_NYStyle-342.jpg", title: "1 Pizza bezorgen 8,99 geldig bij een 25cm NY Style", couponId: 342, price: 9 },
            { imgSrc: "./assets/images/promotion/Coupon_194_2_Large_(35cm_NY_Style)_Pizza's_24_99-194.jpg", title: "2 Large (35cm NY Style) Pizza's 24,99", couponId: 194, price: 25 }
        ];
        this.burgerDeals = [
            { imgSrc: "./assets/images/promotion/Bio_Burger___wedges___blikje_frisdrank_9_99-409.jpg", title: "Bio Burger + Wedges + 33cl Drink", couponId: 191, price: 10 },
            { imgSrc: "./assets/images/promotion/Burger_Kitchen___wedges___blikje_frisdrank_8_99-407.jpg", title: "Classic Burger + Wedges + 33cl Drink", couponId: 332, price: 9 },
            { imgSrc: "./assets/images/promotion/Chicken_Burger___wedges___blikje_frisdrank_8_99-408.jpg", title: "Chicken Burger + Wedges + 33cl Drink", couponId: 342, price: 9 }
        ];
        this.receipt = receiptProvider.receipt;
    }

    openCouponModal(coupon) {
        this.navCtrl.push(ActieDetailModalPage, {
            couponId: coupon.coupondId,
            title: coupon.title,
            price: coupon.price
        })
        
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
