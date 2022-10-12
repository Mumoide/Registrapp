import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  user: any;
  pass: any;
  message: string;

  constructor(private consumoApi: ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.pass = this.router.getCurrentNavigation().extras.state.pass;
        console.log('Dato a mostrar' + this.user + ' y '+ this.pass);
      }
    });
   }

  ngOnInit() {
  }

  mostrar() {
    this.consumoApi.getPosts().subscribe((res) => {
      this.message = '' + res[0].title;
      console.log(res[0]);
    }, (error) => {
      console.log(error);
    });
  }


}
