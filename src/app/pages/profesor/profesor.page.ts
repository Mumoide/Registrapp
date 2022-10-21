import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

import { Observable } from 'rxjs';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;

  usuarios: Observable<any>;

  constructor(private consumoApi: ConsumoAPIService) { }

  ngOnInit() {
    this.usuarios = this.consumoApi.getUsuarios();
  }

  delete(user: any) {
    console.log('delete', user.name);
    this.ionList.closeSlidingItems();
  }
}
