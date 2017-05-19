import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicApp, ViewController, ToastController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from '../login/login';
import { TermsPage } from '../terms/terms';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
    toastErrorInvalid: string;
    toastCanLogin: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public translate: TranslateService
    ){
        translate.get('TOAST_ERROR_INVALID').subscribe(val => { this.toastErrorInvalid = val; })
        translate.get('TOAST_CAN_LOGIN').subscribe(val => { this.toastCanLogin = val; })

        Keyboard.onKeyboardShow().subscribe(data => {
            (<HTMLElement>document.querySelector('page-register ion-content .scroll-content')).style.cssText = 'margin-bottom: 0px !important';
            (<HTMLElement>document.querySelector('.hide-on-keyboard-open-register')).style.cssText = 'display: none !important; bottom: -50px;';
        });

        Keyboard.onKeyboardHide().subscribe(data => {
            (<HTMLElement>document.querySelector('page-register ion-content .scroll-content')).style.cssText = 'margin-bottom: 0px !important';
            (<HTMLElement>document.querySelector('.hide-on-keyboard-open-register ')).style.cssText = 'display: block !important; bottom: 0px;';
        });
    }

    toastPopup(message, position, className) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position,
            cssClass: className
        });
        toast.present();
    }

    register() {
        if ((<HTMLInputElement>document.querySelector('page-register input[type="email"]')).value == '') {
            this.toastPopup(this.toastErrorInvalid, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-register ion-input[type="email"]')).classList.add('invalid');
            setTimeout(function () {
                (<HTMLElement>document.querySelector('page-register ion-input[type="email"]')).classList.remove('invalid');
            }, 2000);
        } else {
            this.toastPopup(this.toastCanLogin, 'bottom', 'green');
            this.navCtrl.pop();
        }
    }

    openTermsModal() {
        this.modalCtrl.create(TermsPage).present();
    }

}
