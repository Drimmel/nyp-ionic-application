import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, MenuController } from 'ionic-angular';
import { IndexCheckoutPage } from '../index-checkout/index-checkout';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the PromotionCheckout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-promotion-checkout',
  templateUrl: 'promotion-checkout.html'
})
export class PromotionCheckoutPage {

    couponAlertTitle: string;
    couponAlertText: string;
    couponAlertCancel: string;
    couponAlertConfirm: string;
    couponBackButton: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public menuCtrl: MenuController,
        translate: TranslateService
    ) { 
        translate.get('COUPON_ALERT_TITLE').subscribe(val => { this.couponAlertTitle = val; })
        translate.get('COUPON_ALERT_TEXT').subscribe(val => { this.couponAlertText = val; })
        translate.get('COUPON_ALERT_CANCEL').subscribe(val => { this.couponAlertCancel = val; })
        translate.get('COUPON_ALERT_CONFIRM').subscribe(val => { this.couponAlertConfirm = val; })
        translate.get('GENERAL_CANCEL_TEXT').subscribe(val => { this.couponBackButton = val; })
    }

    addCoupon() {
        let confirm = this.alertCtrl.create({
            title: this.couponAlertTitle,
            message: this.couponAlertText,
            buttons: [
                {
                    text: this.couponAlertCancel,
                    handler: () => {
                    }
                },
                {
                    text: this.couponAlertConfirm,
                    handler: () => {
                        this.navCtrl.pop();
                        this.menuCtrl.open('receiptmenu');
                    }
                }
            ]
        });
        confirm.present();
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText(this.couponBackButton);
    }

}
