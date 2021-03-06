import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';

@IonicPage({
	name: 'page-my-account',
	segment: 'myaccount'
})

@Component({
    selector: 'page-my-account',
    templateUrl: 'my-account.html'
})

export class MyAccountPage {
  profiledata: Boolean = true;
  fullname:string;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
 this.fullname=localStorage.getItem('name');
 console.log(this.fullname)
  }

  // process send button
  sendData() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profiles-bg',
      message: 'Your Data was Edited!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.navCtrl.setRoot('page-home');
    }, 3000)
  }

}
