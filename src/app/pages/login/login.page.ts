import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, AnimationController, createAnimation } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    tipo: new FormControl('', [Validators.required]),
  });

  tipoUsuario = [
    {
      id: 1,
      name: 'Profesor',
      type: 'Profesor',
    },
    {
      id: 2,
      name: 'Alumno',
      type: 'Alumno',
    }
  ];
  currentUser = undefined;

  constructor(private authService: AuthenticationService, private router: Router,
              private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.palpitar();
  }

  palpitar() {
    const squareA = createAnimation()
      .addElement(document.querySelector('#palpitar'))
      .duration(5000)
      .keyframes([
        { offset: 0, transform: 'scale(1))', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' }
      ]);

    const parent = createAnimation()
      .duration(2000)
      .iterations(Infinity)
      .addAnimation([squareA]);

    parent.play();
  }

  sendDetailsWithState() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.usuario.value.user,
               pass: this.usuario.value.pass,
               tipo: this.usuario.value.tipo }
    };
    this.router.navigate(['/alumno'], navigationExtras); // Esta linea es la que me permite navegar a otro page
  }


  loginUser() {
    if ((this.usuario.value.user.trim() !== '') && ((this.usuario.value.pass.trim() !== ''))) {
      if (this.authService.isAuthenticated()){
        this.authService.login(this.usuario.value.user, this.usuario.value.pass);
      } else { this.presentAlert(); }
    } else { this.presentAlert();}
  }

  nextPage() {
    console.log('entramos al metodo');
    if ('mumo' === this.usuario.value.user && this.usuario.value.tipo === 'alumno') {
      this.sendDetailsWithState();
    } else {
      this.presentAlert();
    }

    // this.navCtrl.navigateForward('/home');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev) {
    this.currentUser = ev.target.value;
  }
}
