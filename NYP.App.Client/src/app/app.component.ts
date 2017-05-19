import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav, AlertController, DeepLink } from 'ionic-angular';
import { Splashscreen, NativePageTransitions, StatusBar, Geolocation, Deeplinks } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push, PushToken } from '@ionic/cloud-angular';

// Providers
import { CategoryProvider } from '../providers/category-provider';
import { ReceiptProvider } from '../providers/receipt-provider';

// Account pages
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { MyProfilePage } from '../pages/account/my-profile/my-profile';

// Menu and product pages
import { ProductDetailsModalPage } from '../pages/menu/product-details-modal/product-details-modal';
import { MenuOverviewPizzaPage } from '../pages/menu/menu-overview-pizza/menu-overview-pizza';
import { MenuOverviewOthersPage } from '../pages/menu/menu-overview-others/menu-overview-others';

// Checkout pages
import { PromotionCheckoutPage } from '../pages/checkout/promotion-checkout/promotion-checkout';
import { IndexCheckoutPage } from '../pages/checkout/index-checkout/index-checkout';

// promotion page
import { ActiesPage } from '../pages/promotion/acties/acties';

@Component({
    templateUrl: 'app.html',
    providers: [CategoryProvider, ReceiptProvider, StatusBar]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // Make the login page the root page on start up
    rootPage = LoginPage;

    categoryData: any;

    activePage: any;

    pages: Array<{ title: string, component: any, apiUrl: any }>;
    public receipt: any;
    public receiptTotal: any;

    shoppingcartEmptyTitle: string;
    shoppingcartEmptyText: string;
    shoppingcartEmptyConfirm: string;
    
    constructor(
        public platform: Platform,
        translate: TranslateService,
        public categoryProvider: CategoryProvider,
        public receiptProvider: ReceiptProvider,
        public alertCtrl: AlertController,
        public statusBar: StatusBar,
        private localNotifications: LocalNotifications,
        public push: Push
    ) {
        translate.setDefaultLang('nl');

        translate.get('SHOPPINGCART_EMPTY_TITLE').subscribe(val => { this.shoppingcartEmptyTitle = val; })
        translate.get('SHOPPINGCART_EMPTY_TEXXT').subscribe(val => { this.shoppingcartEmptyText = val; })
        translate.get('SHOPPINGCART_EMPTY_CONFIRM').subscribe(val => { this.shoppingcartEmptyConfirm = val; })

        platform.ready().then(() => {
            this.getdata();
            this.pages = [
                { title: "Pizza", component: MenuOverviewPizzaPage, apiUrl: "" },
                { title: "Hamburger", component: MenuOverviewOthersPage, apiUrl: "./assets/jsonData/hamburger.json" },
                { title: "Pasta", component: MenuOverviewOthersPage, apiUrl: "./assets/jsonData/pasta.json" },
                { title: "Acties", component: ActiesPage, apiUrl: "" }
            ];
            this.activePage = this.pages[0];

            // Set timeout on the splashscreen
            // So there's no white flash before the first view
            setTimeout(function () {
                Splashscreen.hide();
            }, 1500);

            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                console.log('Token saved:', t.token);
                });

            this.push.rx.notification()
                .subscribe((msg) => {
                    if (msg.payload != undefined) {
                        for (var key in msg.payload) {
                            if (key === 'viewName') {
                                window.location.hash = msg.payload[key];
                            }
                        }
                    }
                    alert(msg.title + ': ' + msg.text);
                });

            StatusBar.styleDefault();
            this.receipt = receiptProvider.receipt;
            this.receiptTotal = receiptProvider.receiptTotal;
        });
    }

    // Main menu open login page (APP.HTML)
    openLoginPage() {
        this.nav.push(LoginPage);
    }
    // Main left menu open profile page (APP.HTML)
    openProfilePage() {
        this.nav.setRoot(MyProfilePage);
    }

    // CategoryData
    getdata() {
        this.categoryProvider.getJsonData().subscribe(
            result => {
                this.categoryData = result;
            },
            err => {
                console.error("Error : " + err);
            },
            () => {
                //data completed
            }
        );
    }

    openCategoryMenu(p) {
        this.nav.setRoot(p.component, {
            categoryName: p.title,
            apiUrl: p.apiUrl
        });
        this.activePage = p;
    }

    removeProductFromReceipt(product, i) {
        this.receiptProvider.removeProduct(product, i);
    }
    addProductFromReceipt(product, i) {
        this.receiptProvider.addProduct(product, i);
    }

    totalPrice(product) {
        return (product.Price * product.amount).toFixed(2).toString();
    }

    openPromotionCheckout() {
        this.nav.push(PromotionCheckoutPage);
    }

    goToCheckout() {
        if (this.receiptProvider.receipt.length == 0) {
            let alert = this.alertCtrl.create({
                title: this.shoppingcartEmptyTitle,
                subTitle: this.shoppingcartEmptyText,
                buttons: [this.shoppingcartEmptyConfirm]
            });
            alert.present();
        } else {
            this.nav.push(IndexCheckoutPage);
        }
    }

    checkActive(page) {
        return page == this.activePage;
    }

}
