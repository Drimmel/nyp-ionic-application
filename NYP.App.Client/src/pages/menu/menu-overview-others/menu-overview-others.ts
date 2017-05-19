import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

// Providers
import { MenuSingleProvider } from '../../../providers/menu-single-provider';
import { ReceiptProvider } from '../../../providers/receipt-provider';

/*
  Generated class for the MenuSingle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu-overview-others',
  templateUrl: 'menu-overview-others.html',
  providers: [MenuSingleProvider]
})
export class MenuOverviewOthersPage {
    public MenuSingleData: any;
    public categoryName: any;
    public apiUrl: any;
    public receipt: any;

    productAlertTitle: string;
    productAlertCancel: string;
    productAlertConfirm: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuSingleProvider: MenuSingleProvider,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController,
        private alertCtrl: AlertController,
        translate: TranslateService
    ) {
        this.categoryName = navParams.get('categoryName');
        this.apiUrl = navParams.get('apiUrl');
        this.getdata(this.apiUrl);
        this.receipt = receiptProvider.receipt;

        translate.get('PRODUCT_ALERT_TITLE').subscribe(val => { this.productAlertTitle = val; })
        translate.get('PRODUCT_ALERT_CANCEL').subscribe(val => { this.productAlertCancel = val; })
        translate.get('PRODUCT_ALERT_CONFIRM').subscribe(val => { this.productAlertConfirm = val; })
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
            subTitle: this.productAlertTitle,
            buttons: [
                {
                    text: this.productAlertCancel,
                    role: 'Cancel'
                },
                {
                    text: this.productAlertConfirm,
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
        //this.toastPopup(product.name + ' toegevoegd aan je mandje!', 'top', '');
    }

    // CategoryData
    getdata(apiUrl) {
        this.menuSingleProvider.getJsonData(apiUrl).subscribe(
            result => {
                this.MenuSingleData = result;
            },
            err => {
                console.error("Error : " + err);
            },
            () => {
                //data completed
            }
        );
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }
}
