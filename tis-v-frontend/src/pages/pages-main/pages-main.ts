import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProviderFcmProvider } from '../../providers/provider-fcm/provider-fcm'
import { ProvidersCarProvider } from '../../providers/providers-car/providers-car';
import { ProviderServiceProvider } from '../../providers/provider-service/provider-service';
import { Storage } from "@ionic/storage";
import { AlertController } from 'ionic-angular';
import { importType } from "@angular/compiler/src/output/output_ast";

@IonicPage()
@Component({
  selector: "page-pages-main",
  templateUrl: "pages-main.html"
})
export class PagesMainPage {

  public PRICE = 35;

  public user = {
    person_id: null,
    customer_id: null,
    service_provider_id: null,
    first_name: "",
    last_name: "",
    birth_date: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    cpf: "",
    is_customer: 0
  };

  public serviceResponse = {
    person_id: "",
    service_provider_id: "",
    first_name: "",
    last_name: "",
    phone: ""
  };

  public opportunity = {
    person_id: "",
    customer_id: "",
    first_name: "",
    last_name: "",
    phone: "",
    car_id: "",
    model: "",
    year: "",
    plate: "",
    status: 0,
    request_date: "",
    value: 0
  };

  public cars = [{
    car_id: 0,
    model: '',
    plate: '',
    year: '',
  }];

  public serviceTracking = [];

  public trackingInfos = [
    {
      disabled: false,
      message: 'Estou a caminho',
      status: 'Seu lavador está a caminho!'
    }, {
      disabled: false,
      message: 'Iniciar a lavagem',
      status: 'O lavador iniciou a limpeza no seu veículo'
    }, {
      disabled: false,
      message: 'Finalizar e Entregar ao cliente',
      status: 'Serviço finalizado',
      finalized: true
    }
  ];

  public is_active = false;
  public waitForService = false;
  public serviceFound = false;
  public notifications = false;
  public cleanerInService = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public fcmProvider: ProviderFcmProvider,
    public CarProvider: ProvidersCarProvider,
    public ServiceProvider: ProviderServiceProvider,
    public alertCtrl: AlertController
  ) {

    this.storage.get("user").then(val => {
      this.user = val;
      this.CarProvider.getCars(this.user.customer_id).then((response => {
        this.cars = JSON.parse(response.body || response._body).result;
      }));
    });

  }

  sendServiceInfo(info) {
    info.disabled = true

    let data;

    if (!info.finalized) {
      data = { serviceStatus: info.status }
    } else {
      data = {
        serviceStatus: info.status,
        finalized: `${info.finalized}`
      }
    }

    let message = {
      payload: {
        notification: {
          title: info.status,
          body: ""
        },
        data: data
      },
      topic: `serviceTracking.${this.opportunity.customer_id}`
    }

    this.fcmProvider.sendMessage(message).then((data) => {
      if (info.finalized) {
        this.cleanerInService = false;
        this.subscribeToTopic('serviceRequest');
      }
    });

  }

  showEvaluation(message) {
    const alert = this.alertCtrl.create({
      title: 'Avaliação de Serviço',
      subTitle: message,
      buttons: ['1','2','3','4','5']
    });
    alert.present();
  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Oportunidade de serviço',
      message: `${this.opportunity.model} ${this.opportunity.year}`,
      buttons: [
        {
          text: 'Discartar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceitar',
          handler: () => {
            this.unsubscribeFromTopic('serviceRequest');
            this.acceptService();

            this.trackingInfos[0].disabled = false;
            this.trackingInfos[1].disabled = false;
            this.trackingInfos[2].disabled = false;

          }
        }
      ]
    });
    confirm.present();
  }

  getCarsInput(alert) {

    this.cars.forEach((car) => {
      alert.addInput({
        type: 'radio',
        label: `${car.model} - ${car.plate}`,
        value: `${car.car_id}`
      })
    })

  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione um carro:');

    this.getCarsInput(alert);

    alert.addButton('Cancel');
    let okButton = alert.addButton({
      text: 'OK',
      handler: data => {

        let index = this.cars.findIndex(car => car.car_id == parseInt(data));

        this.fcmProvider.sendMessage(this.handleSendMessage(null, index))
          .then((data) => {
            this.waitForService = true;

            okButton.dismiss();

            console.log(data);
            this.showAlert("Solicitação Enviada", "Estamos procurando por lavador disponível. Iremos avisa-lo quando encontrarmos!");
            this.subscribeToTopic(`serviceResponse.${this.user.customer_id}`);


          })
      }
    })
    alert.present();
  }

  handleActivationButton() {
    if (this.is_active) {
      this.handleNotifications();
      this.subscribeToTopic('serviceRequest');
      this.showAlert('Bom Trabalho!', 'Iremos te notificar quando alguma oportunidade de serviço aparecer!');
    } else {
      this.unsubscribeFromTopic('serviceRequest');
    }
  }

  handleNotifications() {

    this.fcmProvider.onNotification()
      .then((data) => {
        this.handleReceiveMessage(data);

        setTimeout(() => {
          this.handleNotifications();
        }, 400);

      }).catch((err) => {
        console.error("Error in notification", err)
        this.showAlert("Oops", "Não foi possível completar a solicitação :(");
      })
  }

  handleReceiveMessage(message) {

    console.log(message);

    if (this.user.is_customer && !message.serviceStatus) {
      this.subscribeToTopic(`serviceTracking.${this.user.customer_id}`);
      this.serviceResponse = message;
      this.waitForService = false;
      this.serviceFound = true;
      
      this.serviceTracking.push({ serviceStatus: 'Prestador de serviço encontrado!'})
      
    } else if (message.finalized) {
      this.serviceTracking.push({ serviceStatus: 'Serviço finalizado!'})
      this.showEvaluation("De 1 a 5 como você avalia o serviço prestado?");
      this.serviceTracking = [];
      this.waitForService = false;
      this.serviceFound = false;
    } else if (message.serviceStatus) {
      this.serviceTracking.push(message);
    } else {
      this.opportunity = message;
      this.showConfirm();
    }
  }

  handleSendMessage(topic, index = null) {

    let message;

    if (this.user.is_customer) {
      message = {
        payload: {
          notification: {
            title: 'Oportunidade de Serviço',
            body: `${this.cars[0].model} ${this.cars[0].year}`
          },
          data: {
            person_id: `${this.user.person_id}`,
            customer_id: `${this.user.customer_id}`,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone: this.user.phone,
            car_id: `${this.cars[index].car_id}`,
            model: `${this.cars[index].model}`,
            year: `${this.cars[index].year}`,
            plate: this.cars[index].plate,
            status: '1',
            request_date: new Date().toISOString(),
            value: `${this.PRICE}`
          }
        },
        topic: 'serviceRequest'
      }
    } else {

      message = {
        payload: {
          notification: {
            title: 'Oportunidade de Serviço',
            body: `O lavador ${this.user.first_name} ${this.user.last_name} aceitou sua solicitação.`
          },
          data: {
            person_id: `${this.user.person_id}`,
            service_provider_id: `${this.user.service_provider_id}`,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phone: this.user.phone,
          }
        }, topic: topic
      }
    }

    return message;
  }

  handleServiceRequestButton() {

    if (this.user.is_customer == 1 && this.waitForService) {
      return false;
    } else if (this.user.is_customer == 0) {
      return false;
    } else if (this.serviceFound) {
      return false;
    } else {
      return true;
    }
  }

  sendServiceRequest() {

    this.handleNotifications();

    if (this.user.is_customer) {
      if (this.cars.length > 0) {
        this.showRadio();
      } else {
        this.showAlert("Qual carro?", "Cadastre seu carro antes de solicitar um serviço.");
      }
    }
  }

  acceptService() {

    let service = {
      customer_id: this.opportunity.customer_id,
      car_id: this.opportunity.car_id,
      payment: 1,
      service_provider_id: this.user.service_provider_id,
      status: this.opportunity.status,
      value: this.opportunity.value,
      request_date: this.opportunity.request_date
    }

    console.log(JSON.stringify(service))

    this.ServiceProvider.acceptService(service)
      .then((result) => {

        result = JSON.parse(result.body || result._body);

        if (!result.errorMessage) {
          this.sendServiceResponse();
          this.cleanerInService = true;
        } else {
          this.showAlert('Esse serviço já foi atendido', 'Oops! Parece que outro lavador foi mais rápido que você. Essa oportunidade não está mais disponível.');
          this.subscribeToTopic('serviceRequest');
        }
      })
      .catch((err) => {
        console.log(err);
        this.showAlert('Oops :S', 'Houve um erro e não foi possível completar a solicitação.');
      })

  }

  sendServiceResponse() {

    if (this.user.is_customer == 0) {
      this.fcmProvider.sendMessage(this.handleSendMessage(`serviceResponse.${this.opportunity.customer_id}`))
    }
  }

  subscribeToTopic(topic) {
    this.fcmProvider.subscribeToTopic(topic);
  }

  unsubscribeFromTopic(topic) {
    this.fcmProvider.unsubscribeFromTopic(topic);
  }

  goToPage(page) {
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PagesMainPage");
  }

  logout() {

    this.unsubscribeFromTopic('serviceRequest');
    this.unsubscribeFromTopic(`serviceResponse.${this.user.customer_id}`)

    this.storage.remove("user").then(val => {
      this.navCtrl.popToRoot();
    });
  }

  createCar() {
    this.navCtrl.push('PagesCreateCarPage');
  }

  createCheckingAccount() {
    this.navCtrl.push('PagesCreateCheckingAccountPage');
  }

  editCheckingAccount() {
    this.navCtrl.push('PagesEditCheckingAccountPage');
  }
}
