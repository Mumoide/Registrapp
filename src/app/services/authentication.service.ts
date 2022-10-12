import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }
  loginProfe(user, password) {
    if (user === 'mumo') {
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '1',
          userName: 'Raimundo Estevez',
          message: 'Bienvenido'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/profesor'], navigationExtras);
        this.authState.next(true);
      });
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '',
          userName: '',
          message: 'Nombre de usuario o contraseña inválidos'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/login'], navigationExtras);
        this.authState.next(false);
      });
    }
  }
  loginAlumno(user, password) {
    if (user === 'mumo') {
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '1',
          userName: 'Raimundo Estevez',
          message: 'Bienvenido'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/alumno'], navigationExtras);
        this.authState.next(true);
      });
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '',
          userName: '',
          message: 'Nombre de usuario o contraseña inválidos'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/login'], navigationExtras);
        this.authState.next(false);
      });
    }
  }
  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
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
}
