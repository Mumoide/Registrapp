import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';
import { Observable } from 'rxjs';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interface/user';
import { User2 } from 'src/app/interface/user2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit, OnDestroy {

  usuario: any;
  pass: any;
  nombre: string;
  username: string;
  email: string;
  str = new Date();
  dt = new Date(this.str).toLocaleString();
  scannedResult: any;
  isModalOpen = false;
  contentVisibility = '';
  asistencia: string;
  private user: User = {
    id: 0,
    nombre: '',
    email: '',
    genero: '',
    asistencia: ''
  };
  constructor(private consumoApi: ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router,
    public authenticationService: AuthenticationService, private alertController: AlertController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.user;
        this.pass = this.router.getCurrentNavigation().extras.state.pass;
        console.log('Dato a mostrar' + this.usuario + ' y ' + this.pass);
      }
    });
  }


  ngOnInit() {
    this.encontrar();
  }

 ngOnDestroy(): void {
  this.stopScan();
 }


  onGetUsers(): void{
    this.consumoApi.getUsers().subscribe(
      (response) => console.table(response),
      (error) => console.log(error),
      () => console.log('Get de usuarios terminado')
    );
  };

  onGetUser(): void{
    this.consumoApi.getUser().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('Get de usuario terminado')
    );
  };

  onCreateUser(): void{
    this.consumoApi.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('Create de usuario terminado')
    );
  };

  onUpdateUser(): void{
    this.consumoApi.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('Update de usuario terminado')
    );
  };

  encontrar(): void {
    this.consumoApi.getUsers2().subscribe(
      (res) => { for (let i = 0; i < 5; i++) {
        if ((JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].nombre === this.usuario){
          this.nombre = '' + (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].nombre;
          this.username = '' + (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].email;
          this.email = '' + (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].email;
          this.asistencia = '' + (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].asistencia;
          this.user.id = (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].id;
          this.user.nombre = (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].nombre;
          this.user.email = (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].email;
          this.user.genero = (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].genero;
          this.user.asistencia = (JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos[i].asistencia;
          }
        }
      },
      (error) => console.log(error),
      () => console.log('Busqueda de usuarios terminado')
    );
  };

  actualizar() {
      const user2: User2 = {
        nombre: this.nombre,
        asistencia: 'Presente'
      };
      this.consumoApi.updatePost2(user2).subscribe(
        (res) => console.log((JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos)
      );
    this.encontrar();
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.contentVisibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.contentVisibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
      }
      if (this.scannedResult === 'registrar_asistencia') {
        this.actualizar();
        this.encontrar();
        this.alumnoRegistrado();
      } else {
        this.codigoInvalido();
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.contentVisibility = '';
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async usuarioRegistrado() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: 'Infomación : ',
      message: 'Usuario registrado correctamente',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async alumnoRegistrado() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: 'Infomación : ',
      message: 'Usuario registrado correctamente',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
  async codigoInvalido() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: 'Infomación : ',
      message: 'Codigo QR invalido',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
