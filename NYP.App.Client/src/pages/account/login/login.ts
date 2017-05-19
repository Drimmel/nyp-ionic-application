import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, DeepLink } from 'ionic-angular';
import { Keyboard, Deeplinks } from 'ionic-native';
import { TranslateService } from '@ngx-translate/core';

import { MenuOverviewPizzaPage } from '../../menu/menu-overview-pizza/menu-overview-pizza';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    toastErrorNoMailPw: string;
    toastWelcome: string;
    toastErrorWrong: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menu: MenuController,
        public toastCtrl: ToastController,
        public translate: TranslateService
    ) {
        // Disable sidemenu's at login page
        this.menu.enable(false, 'foodmenu');
        this.menu.enable(false, 'receiptmenu');

        translate.get('TOAST_ERROR_NO_EMAIL_PASSWORD').subscribe(val => { this.toastErrorNoMailPw = val; })
        translate.get('TOAST_WELCOME_BACK').subscribe(val => { this.toastWelcome = val; })
        translate.get('TOAST_ERROR_WRONG_EMAIL_PASSWORD').subscribe(val => { this.toastErrorWrong = val; })
 
        Keyboard.onKeyboardShow().subscribe(data => {
            (<HTMLElement>document.querySelector('.hide-on-keyboard-open')).style.cssText = 'display: none !important';
        });

        Keyboard.onKeyboardHide().subscribe(data => {
            (<HTMLElement>document.querySelector('.hide-on-keyboard-open')).style.cssText = 'display: flex !important;';
        });
    }

    // Sets the menu page as root page of the app
    goToMenu() {
        this.navCtrl.setRoot(MenuOverviewPizzaPage);
    }

    // Opens the register iew on top of the login view
    openRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }

    openPasswordReset() {
        this.navCtrl.push(ResetPasswordPage);
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

    login() {
        let emailVal = (<HTMLInputElement>document.querySelector('input[type="email"]'));
        let pwVal = (<HTMLInputElement>document.querySelector('input[type="password"]'));

        if (emailVal.value == '' && pwVal.value == '') {
            this.toastPopup(this.toastErrorNoMailPw, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.add('invalid');
            (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.add('invalid');
            setTimeout(function () {
                (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.remove('invalid');
                (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.remove('invalid');
            }, 2000);
        } else if (emailVal.value == 'john' && pwVal.value == 'dough') {
            this.toastPopup(this.toastWelcome + 'John Dough!', 'bottom', 'green');
            this.goToMenu();
        } else {
            this.toastPopup(this.toastErrorWrong, 'bottom', 'red');
            (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.add('invalid');
            (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.add('invalid');
            setTimeout(function() {
                (<HTMLElement>document.querySelector('page-login ion-input[type="email"]')).classList.remove('invalid');
                (<HTMLElement>document.querySelector('page-login ion-input[type="password"]')).classList.remove('invalid');
            }, 2000);
        }
    }

}
