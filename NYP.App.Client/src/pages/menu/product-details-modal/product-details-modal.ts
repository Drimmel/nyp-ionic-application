import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Modal, ToastController } from 'ionic-angular';

import { PizzaToppingsPage } from '../pizza-toppings/pizza-toppings';

import { ReceiptProvider } from '../../../providers/receipt-provider';
/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-details-modal',
  templateUrl: 'product-details-modal.html'
})
export class ProductDetailsModalPage {

    public productData: any;
    public productAmount: number = 1;
    public totalPrice: number;
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController
    ) {

        this.productData = navParams.get('product');
        this.totalPrice = this.productData.Price;
        this.receipt = receiptProvider.receipt;
    }

    openHeaderPizza() {
        let endPosElement = (<HTMLElement>document.getElementById('main-content-container')).getBoundingClientRect().top;
        if (screen.width > 600) {
            if (endPosElement < 300) {
                (<HTMLElement>document.getElementById('main-content-container')).style.transform = 'translateY(' + 400 + 'px) translateZ(0px)';
                (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + 300 + 'ms ease-in-out';
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(180deg)';
            } else {
                (<HTMLElement>document.getElementById('main-content-container')).style.transform = 'translateY(' + 200 + 'px) translateZ(0px)';
                (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + 300 + 'ms ease-in-out';
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(0deg)';
            }
        } else {
            if (endPosElement < 100) {
                (<HTMLElement>document.getElementById('main-content-container')).style.transform = 'translateY(' + 200 + 'px) translateZ(0px)';
                (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + 300 + 'ms ease-in-out';
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(180deg)';
            } else {
                (<HTMLElement>document.getElementById('main-content-container')).style.transform = 'translateY(' + 0 + 'px) translateZ(0px)';
                (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + 300 + 'ms ease-in-out';
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(0deg)';
            }
        }
        
       
    }

    addProduct() {
        this.productAmount += 1;
        (<HTMLElement>document.getElementById('productAmount')).innerHTML = (this.productAmount).toString();
        (<HTMLElement>document.getElementById('totalPrice')).innerHTML = (this.productAmount * this.productData.Price).toString();
    }

    removeProduct() {
        if (this.productAmount > 1) {
            this.productAmount--;
            (<HTMLElement>document.getElementById('productAmount')).innerHTML = (this.productAmount).toString();
            (<HTMLElement>document.getElementById('totalPrice')).innerHTML = (this.productAmount * this.productData.Price).toString();
        } else {
            return;
        }
    }

    openPizzaToppingsPage() {
        this.navCtrl.push(PizzaToppingsPage, { product: this.productData });
    }

    showNutritionalValue() {
        (<HTMLElement>document.getElementById('nutritionalValue')).style.display = 'flex';
    }
    closeNutritionalValue() {
        (<HTMLElement>document.getElementById('nutritionalValue')).style.display = 'none';
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
        this.receiptProvider.addToReceipt(product);
        this.receiptProvider.addToReceiptTotal(product);
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDelay = '200ms';
        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1200);
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
