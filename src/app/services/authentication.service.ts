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
    console.log('Entramos al login de profe');
    if (user === 'mumo') {
      this.authState.next(true);
      console.log('Verificamos que usuario = mumo, se crea constante, se guardan los datos');
      console.log('se navega a /profesor y se cambia authstate a true');
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '1',
          userName: 'Raimundo Estevez',
          message: 'Bienvenido'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/profesor'], navigationExtras);
      });
    } else {
      this.authState.next(false);
      console.log('Usuario noi es mumo, se crea constante, se guardan los datos');
      console.log('se navega a /login y se cambia authstate a false');
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '',
          userName: '',
          message: 'Nombre de usuario o contraseña inválidos'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/login'], navigationExtras);
      });
    }
  }
  loginAlumno(user, password) {
    if (user === 'mumo') {
      this.authState.next(true);
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '1',
          userName: 'Raimundo Estevez',
          message: 'Bienvenido'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/alumno'], navigationExtras);
      });
    } else {
      this.authState.next(false);
      const navigationExtras: NavigationExtras = {
        state: {
          userId: '',
          userName: '',
          message: 'Nombre de usuario o contraseña inválidos'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate(['/login'], navigationExtras);
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
