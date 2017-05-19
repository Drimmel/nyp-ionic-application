import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/*
  Generated class for the PasswordReset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController
    ) { }

    emailSend() {
        let alert = this.alertCtrl.create({
            title: 'Stel je wachtwoord opnieuw in!',
            subTitle: 'Wij hebben een e-mail gestuurd naar je, gebruik deze om je wachtwoord opnieuw mee in te stellen.',
            buttons: ['OK']
        });
        alert.present();
    }

}
