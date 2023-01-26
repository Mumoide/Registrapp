import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AnimationController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;
  isModalOpen = false;
  users: {
    asistencia: string;
    genero: string;
    email: string;
    nombre: string;
    id: number;
}[];
  codigoQr = 'registrar_asistencia';
  constructor(private consumoApi: ConsumoAPIService, private animationCtrl: AnimationController) { }

  ngOnInit() {
     this.consumoApi.getUsers2().subscribe(
       (res) => this.users = ((JSON.parse((JSON.stringify({ ...res }, null, 2)))).alumnos)
    );
  }

  delete(user: any) {
    console.log('delete', user.name);
    this.ionList.closeSlidingItems();
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
};

}
