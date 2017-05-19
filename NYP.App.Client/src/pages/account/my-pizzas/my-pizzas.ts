import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ReceiptProvider } from '../../../providers/receipt-provider';
/*
  Generated class for the MyPizzas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-pizzas',
  templateUrl: 'my-pizzas.html'
})
export class MyPizzasPage {

    myPizzas: Array<{ title: string, description: string, bottom: string, price: string }>;
    deleteBtn: string;
    orderBtn: string;
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public receiptProvider: ReceiptProvider,
        translate: TranslateService
    ) {
        // Get translations
        translate.get('GENERAL_DELETE_TEXT').subscribe(val => { this.deleteBtn = val; })
        translate.get('GENERAL_ORDER_TEXT').subscribe(val => { this.orderBtn = val; })

        this.receipt = receiptProvider.receipt;

        this.myPizzas = [
            { title: 'Pizza ala John', description: 'Tomatensaus, 1x Pepperoni (beef, halal), 1x Rucola, 1x Mozzarella, Knoflookolie rand.', bottom: '25cm NY Style', price: '12' },
            { title: 'Pizza ala dough', description: 'Tomatensaus, 1x Pepperoni (beef, halal), 1x Rucola, 1x Mozzarella, Knoflookolie rand.', bottom: '25cm NY Style', price: '12' }
        ]
    }

    pizzaOptionsSheet(pizza) {
        let actionSheet = this.actionSheetCtrl.create({
            title: pizza.title,
            buttons: [
                {
                    text: this.deleteBtn,
                    role: 'destructive',
                    handler: () => {
                        this.deletePizza(pizza)
                    }
                },
                {
                    text: this.orderBtn,
                    handler: () => {
                        let product = {
                            "name": "Pizza ala John",
                            "desc": "Tomatensaus, 1x Pepperoni (beef, halal), 1x Rucola, 1x Mozzarella, Knoflookolie rand.",
                            "bottom": "25cm NY Style",
                            "Price": 12,
                            "imgsrc": null
                        }
                        this.receiptProvider.addToReceipt(product);
                        this.receiptProvider.addToReceiptTotal(product);
                        (<HTMLElement>document.querySelector('page-my-pizzas ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
                        (<HTMLElement>document.querySelector('page-my-pizzas ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
                        (<HTMLElement>document.querySelector('page-my-pizzas ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDelay = '200ms';
                        setTimeout(function () { (<HTMLElement>document.querySelector('page-my-pizzas ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1200);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                } 
            ]
        });
        actionSheet.present();
    }

    deletePizza(pizza) {
        for (let i = 0; i < this.myPizzas.length; i++) {

            if (this.myPizzas[i] == pizza) {
                this.myPizzas.splice(i, 1);
            }

        }
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
