import { Component, ViewChild, NgModule } from '@angular/core';
import { NavController, NavParams, MenuController, Content, ModalController, LoadingController, Loading, Searchbar } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

// import pages
import { ProductDetailsModalPage } from '../product-details-modal/product-details-modal';
import { CustomPizzaModalPage } from '../custom-pizza-modal/custom-pizza-modal';
import { DoubleTastyModalPage } from '../double-tasty-modal/double-tasty-modal';

// provider
import { ProductProvider } from '../../../providers/product-provider';
import { ReceiptProvider } from '../../../providers/receipt-provider';


/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu-overview-pizza',
  templateUrl: 'menu-overview-pizza.html',
  providers: [ProductProvider]
})
export class MenuOverviewPizzaPage {
    @ViewChild(Content) content: Content;
    @ViewChild('searchbar') searchbar: Searchbar;

    searchTerm: string = '';
    productData: any;
    loading: any;
    public receipt: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        public modalCtrl: ModalController,
        public productProvider: ProductProvider,
        public loadingCtrl: LoadingController,
        public receiptProvider: ReceiptProvider,
        public products: ProductProvider
    ) {
        let loader = this.loadingCtrl.create({
            content: "Laden..."
        });  
        loader.present();


        // Enable both menusides again
        this.menu.enable(true, 'foodmenu');
        this.menu.enable(true, 'receiptmenu');
        this.loading = loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        })

        // Fetch product data
        this.products.getJsonData().subscribe(
            res => this.productData = res ,
            err => console.warn(err),
            () => {
                loader.dismiss();
            }
        )

        // Set timeout else it doesnt find the elements
        // Making line clamping (...)
        if (screen.width <= 600) {
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
        this.loading.dismiss();
        this.receipt = receiptProvider.receipt;
    }

    openSearchBar() {
        //this.content.resize();
        
    }

    public toggleSearchBar() {
        let timeoutID = setTimeout(() => {
            this.searchbar.setFocus();

        }, 200)
    }

    getdata() {
        this.productProvider.getJsonData().subscribe(
            result => {
                this.productData = result;
            },
            err => {
                console.error("Error : " + err);
            },
            () => {
                //data completed
            }
        );
    }

    initializeItems() {
        this.getdata();
    };

    getItems(ev) {

        var val = ev.target.value;

        if (val && val.trim() != '') {
            this.productData = this.productData.filter((product) => {
                return (product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.initializeItems();
        }
    }

    openProductDetailPage(product) {
        this.navCtrl.push(ProductDetailsModalPage, { product: product });
    }
    openCustomPizzaModal() {
        this.navCtrl.push(CustomPizzaModalPage);
    }
    openDoubleTastyPizzaModal() {
        this.navCtrl.push(DoubleTastyModalPage);
    }

    getSum() {
        let sum = 0;
        for (var i = 0; i < this.receipt.length; i++) {
            sum += this.receipt[i].amount;
        }
        return sum.toString();
    }

}
