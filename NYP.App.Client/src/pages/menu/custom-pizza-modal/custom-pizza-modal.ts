import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, ToastController } from 'ionic-angular';

import { ReceiptProvider } from '../../../providers/receipt-provider';

/*
  Generated class for the CustomPizzaModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-custom-pizza-modal',
  templateUrl: 'custom-pizza-modal.html'
})
export class CustomPizzaModalPage {
    @ViewChild(Content) content: Content;
    public ionScroll;

    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public myElement: ElementRef,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController
    ) {
        this.receipt = receiptProvider.receipt;
    }
    
    ngAfterViewInit() {
        this.content.ionScroll.subscribe((event: any) => {
            if (event.scrollTop > 200) {
                (<HTMLElement>document.querySelector('page-custom-pizza-modal .back-button')).classList.add("scrolled");
                (<HTMLElement>document.getElementById('shoppingBasket')).classList.add("scrolled");
            }

            if (event.scrollTop <= 200) {
                (<HTMLElement>document.querySelector('page-custom-pizza-modal .back-button')).classList.remove("scrolled");
                (<HTMLElement>document.getElementById('shoppingBasket')).classList.remove("scrolled");
            }

        });
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

    addToReceipt() {
        let product = {
            "name": "Custom Pizza",
            "desc": "De lekkerste pizza maak je zelf! Kies je favoriete bodem, je favoriete saus en maak een keuze uit 26 heerlijke toppings.",
            "bottom": "25cm NY Style",
            "Price": 11,
            "imgsrc": "./assets/images/pizzas/zelf-samenstellen.png"
        };
        this.receiptProvider.addToReceipt(product);
        this.receiptProvider.addToReceiptTotal(product);
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1000);
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }
}
