import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, AlertController, ToastController, MenuController } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import * as firebase from 'Firebase';

@IonicPage({
	name: 'page-auth',
	segment: 'auth',
	priority: 'high'
})

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage implements OnInit {
  public onLoginForm: FormGroup;
  public onRegisterForm: FormGroup;
  auth: string = "login";
  ref = firebase.database().ref('Users/');
  fullname: string;
  emailAds:string;
  pwd:string;

  constructor(private _fb: FormBuilder, public nav: NavController,
			  private authprovider:AuthServiceProvider,
			  public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
		this.menu.swipeEnable(false);
		this.menu.enable(false);
	 	 const auth = firebase.auth();
	 	 console.log(auth.currentUser);
		this.ref.once("value").then(function(snapshot){
			var key =snapshot.key;
			var child = snapshot.child("admin/email").val();
			console.log("the key is: "+key);
			console.log("the child  is: "+child)
		})
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterForm = this._fb.group({
      fullName: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  // go to register page
  // register() {
  //   this.nav.setRoot(RegisterPage);
  // }

  // login and go to home page
  login() {
    // Henry , add login
	  this.nav.setRoot('page-tabs');
  }
  register(email,password,name){
  	console.log(email);
  	console.log(password);
  	console.log(name);
	this.authprovider.register(email,password);
	localStorage.setItem('email',email);
	localStorage.setItem('password',password);
	localStorage.setItem('name',name);
	  this.nav.setRoot('page-tabs');
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
