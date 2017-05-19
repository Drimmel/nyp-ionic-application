import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig, DeepLink } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation, Deeplinks } from 'ionic-native';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// Importing Account pages
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { ResetPasswordPage } from '../pages/account/reset-password/reset-password';
import { TermsPage } from '../pages/account/terms/terms';
import { MyProfilePage } from '../pages/account/my-profile/my-profile';
import { MyDetailsPage } from '../pages/account/my-details/my-details';
import { MyPizzaPointsPage } from '../pages/account/my-pizza-points/my-pizza-points';
import { MyVipcardAndBadgesPage } from '../pages/account/my-vipcard-and-badges/my-vipcard-and-badges';
import { MyAddressesListPage } from '../pages/account/my-addresses-list/my-addresses-list';
import { AddEditAddressModalPage } from '../pages/account/add-edit-address-modal/add-edit-address-modal';
import { MyOrderHistoryPage } from '../pages/account/my-order-history/my-order-history';
import { MyOrderHistoryDetailsPage } from '../pages/account/my-order-history-details/my-order-history-details';
import { VipcardTermsPage } from '../pages/account/vipcard-terms/vipcard-terms';
import { MyPizzasPage } from '../pages/account/my-pizzas/my-pizzas';

// Importing Menu & product pages
import { MenuOverviewPizzaPage } from '../pages/menu/menu-overview-pizza/menu-overview-pizza';
import { MenuOverviewOthersPage } from '../pages/menu/menu-overview-others/menu-overview-others';
import { ProductDetailsModalPage } from '../pages/menu/product-details-modal/product-details-modal';
import { PizzaToppingsPage } from '../pages/menu/pizza-toppings/pizza-toppings';
import { CustomPizzaModalPage } from '../pages/menu/custom-pizza-modal/custom-pizza-modal';
import { DoubleTastyModalPage } from '../pages/menu/double-tasty-modal/double-tasty-modal';

// Importing promotion
import { ActiesPage } from '../pages/promotion/acties/acties';
import { ActieDetailModalPage } from '../pages/promotion/actie-detail-modal/actie-detail-modal';

// Importing Checkout pages
import { IndexCheckoutPage } from '../pages/checkout/index-checkout/index-checkout';
import { PromotionCheckoutPage } from '../pages/checkout/promotion-checkout/promotion-checkout';
import { SelectStorePage } from '../pages/checkout/select-store/select-store';
import { SuccesPage } from '../pages/checkout/succes/succes';

// Importing components, providers and directives
import { DoubleTastyHeader } from '../components/double-tasty-header/double-tasty-header';
import { ProductDetailHeader } from '../components/product-detail-header/product-detail-header'
import { PizzaDetailDrag } from '../components/pizza-detail-drag/pizza-detail-drag';
import { ReceiptProvider } from '../providers/receipt-provider';
import { GeolocationToCityname } from '../providers/geolocation-to-cityname';
import { FocusSearchinput } from '../components/focus-searchinput/focus-searchinput';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '749eaf9e',
    },
    'push': {
        'sender_id': '244213577932',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#008866'
            }
        }
    }
};

let deepLinkConfig: DeepLinkConfig = {
    links: [
        { component: ActiesPage, name: 'Acties', segment: 'acties' }
    ]
}

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      TermsPage,
      MyProfilePage,
      MyDetailsPage,
      MyPizzaPointsPage,
      MyVipcardAndBadgesPage,
      MyPizzasPage,
      MyAddressesListPage,
      AddEditAddressModalPage,
      MyOrderHistoryPage,
      MyOrderHistoryDetailsPage,
      VipcardTermsPage,
      MenuOverviewPizzaPage,
      MenuOverviewOthersPage,
      ProductDetailsModalPage,
      PizzaToppingsPage,
      CustomPizzaModalPage,
      DoubleTastyModalPage,
      ActiesPage,
      ActieDetailModalPage,
      IndexCheckoutPage,
      PromotionCheckoutPage,
      SelectStorePage,
      SuccesPage,
      DoubleTastyHeader,
      ProductDetailHeader,
      PizzaDetailDrag,
      FocusSearchinput
  ],
  imports: [
      IonicModule.forRoot(MyApp, {}, deepLinkConfig),
      IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [Http]
          }
      }),
      CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LoginPage,
      RegisterPage,
      ResetPasswordPage,
      TermsPage,
      MyProfilePage,
      MyDetailsPage,
      MyPizzaPointsPage,
      MyVipcardAndBadgesPage,
      MyPizzasPage,
      MyAddressesListPage,
      AddEditAddressModalPage,
      MyOrderHistoryPage,
      MyOrderHistoryDetailsPage,
      VipcardTermsPage,
      MenuOverviewPizzaPage,
      MenuOverviewOthersPage,
      ProductDetailsModalPage,
      DoubleTastyModalPage,
      PizzaToppingsPage,
      CustomPizzaModalPage,
      ActiesPage,
      ActieDetailModalPage,
      IndexCheckoutPage,
      PromotionCheckoutPage,
      SelectStorePage,
      SuccesPage,
  ],
  providers: [ReceiptProvider, Geolocation, LocalNotifications, {provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
enableProdMode();