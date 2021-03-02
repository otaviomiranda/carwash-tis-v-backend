import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersCreateCheckingAccountProvider } from '../../providers/providers-create-checking-account/providers-create-checking-account';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-create-checking-account',
  templateUrl: 'pages-create-checking-account.html',
})
export class PagesCreateCheckingAccountPage {
  
  public checkingAccount = {
    service_provider_fk:null,
    bank: '',
    agency: '',
    account:''
  }

  public user = {
    customer_id: null,
    service_provider_id: null,
    person_id: null,
    first_name: "",
    last_name: "",
    birth_date: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    cpf: "",
    is_customer: false
  }
    constructor(public navCtrl: NavController, 
    public providersCreateCheckingAccountProvider: ProvidersCreateCheckingAccountProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {

    this.storage.get("user").then(val => {
        console.log(val)
        this.user = val;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesCreateCheckingAccountPage');
  }

  alertMessage(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  };

  goToRootPage() {
    this.navCtrl.popToRoot();
  };

  presentLoading() {
    var loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 3000
    });
    loader.present();
  };

  createCheckingAccount(){
    
    this.presentLoading();
    this.checkingAccount.service_provider_fk=this.user.person_id;
    this.providersCreateCheckingAccountProvider.create(this.checkingAccount)
    .then((result: any)=>{
      
      console.log(result);
      this.navCtrl.push('PagesMainPage');
    })
    

  

   






  }
  


  

}
