import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
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
    public toastController: ToastController
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
  login(user, password) {
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
}
