import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content, Platform, ViewController } from 'ionic-angular';

// provider
import { ProductProvider } from '../../../providers/product-provider';
import { ReceiptProvider } from '../../../providers/receipt-provider';


@Component({
  selector: 'page-double-tasty-modal',
  templateUrl: 'double-tasty-modal.html',
  providers: [ProductProvider]
})
export class DoubleTastyModalPage {
    @ViewChild(Content) content: Content;
    public ionScroll;

    productData: any;
    public receipt: any;

    nrOfPizzas: number = 0;
    firstPizza: any = null;
    secondPizza: any = null;
    pickedTwo: boolean = false;
    scrollAmount: number = 0;
    scrollHeight: number = 220;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productProvider: ProductProvider,
        public element: ElementRef,
        public receiptProvider: ReceiptProvider,
        public toastCtrl: ToastController,
        public plt: Platform,
        public viewCtrl: ViewController
    ) {
        this.receipt = receiptProvider.receipt;
        // Fetch product data
        this.getdata();

        setTimeout(function () {
            let elements = document.querySelectorAll(".product-description");
            for (let i = 0; i < elements.length; i++) {
                let el = <HTMLElement>elements[i];
                var wordArray = el.innerHTML.split(' ');
                while (el.scrollHeight > el.offsetHeight) {
                    wordArray.pop();
                    el.innerHTML = wordArray.join(' ') + '...';
                }
            }
        }, 100);
    }

    getdata() {
        this.productProvider.getJsonData().subscribe(
            res => this.productData = res,
            err => console.warn(err),
            () => {
                
            }
        )
    }

    goBack() {
        if (this.scrollAmount > this.scrollHeight) {
            (<HTMLElement>document.querySelector('ion-header.scrolled')).classList.remove('scrolled');
        }
        this.navCtrl.pop();
    }

    ngAfterViewInit() {
        this.setListMargin();
        this.content.ionScroll.subscribe((event: any) => {
            this.scrollAmount = event.scrollTop;
            if (event.scrollTop > this.scrollHeight) {
                (<HTMLElement>document.querySelector('page-double-tasty-modal ion-header.header')).classList.add("scrolled");
                (<HTMLElement>document.querySelector('.pick-pizza-half-text-container')).style.opacity = '1';
            } else if (event.scrollTop <= this.scrollHeight) {
                (<HTMLElement>document.querySelector('page-double-tasty-modal ion-header.header')).classList.remove("scrolled");
                (<HTMLElement>document.querySelector('.pick-pizza-half-text-container')).style.opacity = '0';
            }
        });
    }

    setListMargin() {
        let height = (<HTMLElement>document.getElementById('double-tasty-header')).clientHeight;
        (<HTMLElement>document.getElementById('pizza-list')).style.marginTop = height.toString();
    }

    textPulse(element, text) {
        (<HTMLElement>document.querySelector(element)).innerHTML = text;
        (<HTMLElement>document.querySelector(element)).style.webkitAnimationName = 'bounceIn';
        (<HTMLElement>document.querySelector(element)).style.webkitAnimationDuration = '1s';
        setTimeout(function () { (<HTMLElement>document.querySelector(element)).style.webkitAnimationName = ''; }, 500);
    }

    addToDoubleTasty(product) {
        if (this.nrOfPizzas == 0) {
            this.firstPizza = product;
            this.nrOfPizzas++;
            this.displayImage(product.imgsrc, this.nrOfPizzas);
            (<HTMLElement>document.getElementById('dt-header-title')).classList.add('active');
            this.textPulse('.pick-pizza-half-text', "<b>Kies de tweede pizzahelft</b>");
            this.textPulse('.pick-pizza-half-text-2', "<b>Kies de tweede pizzahelft</b>");
        } else if (this.nrOfPizzas == 1) {
            this.nrOfPizzas++;
            this.displayImage(product.imgsrc, this.nrOfPizzas);
            while (this.pickedTwo == false) {
                (<HTMLElement>document.querySelector('.scroll-content')).style.paddingBottom = '61px';
                (<HTMLElement>document.querySelector('ion-footer')).style.transform = 'translate3d(0,0,0)';
                this.pickedTwo = true;
            }
            this.textPulse('.pick-pizza-half-text', "<b>Kies de eerste pizzahelft</b>");
            this.textPulse('.pick-pizza-half-text-2', "<b>Kies de eerste pizzahelft</b>");
        } else if (this.nrOfPizzas == 2) {
            this.firstPizza = product;
            this.displayImage(product.imgsrc, '1')
            this.nrOfPizzas = 1;
            this.textPulse('.pick-pizza-half-text', "<b>Kies de tweede pizzahelft</b>");
            this.textPulse('.pick-pizza-half-text-2', "<b>Kies de tweede pizzahelft</b>");
        }
    }

    elementHasClass(element, nameOfClass) {
        return (" " + element.className + " ").indexOf(" " + nameOfClass + " ") > -1;
    }

    displayImage(imgSrc, half) {

        (<HTMLElement>document.querySelector('ion-header #dt-' + half + '-half')).classList.remove('active');
        (<HTMLElement>document.querySelector('ion-content #dt-' + half + '-half')).classList.remove('active');
        setTimeout(function () {
            (<HTMLImageElement>document.querySelector('ion-header #dt-' + half + '-half-img')).src = imgSrc;
            (<HTMLElement>document.querySelector('ion-header #dt-' + half + '-half')).classList.add('active');
            (<HTMLImageElement>document.querySelector('ion-content #dt-' + half + '-half-img')).src = imgSrc;
            (<HTMLElement>document.querySelector('ion-content #dt-' + half + '-half')).classList.add('active');
        }, 100);

    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

    openSmallPizzaInformation(product) {
        (<HTMLImageElement>document.querySelector('#small-product-desc img')).src = product.imgsrc;
        (<HTMLElement>document.querySelector('#small-product-desc h4')).innerHTML = product.name;
        (<HTMLElement>document.querySelector('#small-product-desc p')).innerHTML = (product.desc).toString();
        (<HTMLElement>document.getElementById('small-product-desc')).classList.add('active');
    }

    closeSmallDesc() {
        (<HTMLElement>document.getElementById('small-product-desc')).classList.remove('active');
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
        if (this.scrollAmount > this.scrollHeight) {
            (<HTMLElement>document.querySelector('ion-header.scrolled')).classList.remove('scrolled');
        }
        let product = {
            "name": "Double Tasty",
            "desc": "Het beste van twee werelden op één pizza. Bestel de Double Tasty en stel je eigen pizza samen. Eén pizza, twee smaken.",
            "bottom": "25cm NY Style",
            "Price": 12,
            "imgsrc": "./assets/images/pizzas/zelf-samenstellen.png"
        };
        this.receiptProvider.addToReceipt(product);
        this.receiptProvider.addToReceiptTotal(product);
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = 'shake';
        (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationDuration = '1s';
        setTimeout(function () { (<HTMLElement>document.querySelector('ion-header ion-icon[name="basket"]')).parentElement.parentElement.style.webkitAnimationName = ''; }, 1000);
    }


}
