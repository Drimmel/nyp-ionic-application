import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { ReceiptProvider } from '../../../providers/receipt-provider';
import { AddEditAddressModalPage } from '../add-edit-address-modal/add-edit-address-modal';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the MyAddressesList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-addresses-list',
  templateUrl: 'my-addresses-list.html'
})
export class MyAddressesListPage {
    deleteBtn: string;
    changeBtn: string;
    actionSheetTitle: string;

    public receipt: any;
    public addresses: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public receiptProvider: ReceiptProvider,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        translate: TranslateService
    ) {
        this.receipt = receiptProvider.receipt;

        translate.get('GENERAL_DELETE_TEXT').subscribe(val => { this.deleteBtn = val; })
        translate.get('GENERAL_CHANGE_TEXT').subscribe(val => { this.changeBtn = val; })
        translate.get('ADDRESSLIST_ACTIONSHEET_TITLE').subscribe(val => { this.actionSheetTitle = val; })

        this.addresses = [
            { street: 'Simone de baevoirlaan 16', zip: '1277BH', city: 'Huizen'},
            { street: 'Simone de baevoirlaan 17', zip: '1277BH', city: 'Huizen'},
            { street: 'Simone de baevoirlaan 18', zip: '1277BH', city: 'Huizen'},
            { street: 'Simone de baevoirlaan 19', zip: '1277BH', city: 'Huizen' }
        ]
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

    openAddAddressModal() {
        this.navCtrl.push(AddEditAddressModalPage);
    }

    deleteAdres(addres) {
        for (let i = 0; i < this.addresses.length; i++) {

            if (this.addresses[i] == addres) {
                this.addresses.splice(i, 1);
            }

        }
    }

    openActionsheet(addres) {

        let actionSheet = this.actionSheetCtrl.create({
            title: this.actionSheetTitle,
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: this.deleteBtn,
                    role: 'destructive',
                    handler: (e) => {
                        this.deleteAdres(addres);
                    }
                }, {
                    text: this.changeBtn,
                    handler: () => {
                        this.openAddAddressModal();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                     
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
