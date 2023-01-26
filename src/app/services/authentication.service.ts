import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ConsumoAPIService } from './consumo-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  validado = new BehaviorSubject(false);
  miBooleano: boolean;
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private alertController: AlertController,
    private consumoApi: ConsumoAPIService
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
    if (user === 'mumo' && password === 'duoc') {
      this.authState.next(true);
      ;
    } else {
      this.authState.next(false);
      ;
    }
  }

  loginAlumno(user, password) {
    if (user === 'mumo' && password === 'duoc' || user === 'Jack' && password === 'duoc' ||
      user === 'Peter' && password === 'duoc' || user === 'Mary' && password === 'duoc' ||
      user === 'Smith' && password === 'duoc' || user === 'John' && password === 'duoc') {
      this.authState.next(true);
    } else {
      this.authState.next(false);
    }
  }

  loginAlumno2(user, password) {
    this.consumoApi.getUsers2().subscribe(
      (res) => {
        for (let i = 0; i < 5; i++) {
          if (user === (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].nombre) {
            this.validado.next(true);
            this.miBooleano = this.validado.value;
            return;
          } else {
            this.validado.next(false);
            this.miBooleano = this.validado.value;
          }
        }
      }
    );
    console.log(this.miBooleano);
    if (this.miBooleano && password === 'duoc') {
      this.authState.next(true);
    } else {
      this.authState.next(false);
    }
  };

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    console.log(this.authState.value);
    return this.authState.value;
  }
}
