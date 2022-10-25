import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  usuarios: Observable<any>;
  user: any;
  pass: any;
  message: string;
  titulo: string;

  constructor(private camera: Camera, private consumoApi: ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.pass = this.router.getCurrentNavigation().extras.state.pass;
        console.log('Dato a mostrar' + this.user + ' y '+ this.pass);
      }
    });
   }

  ngOnInit() {
    this.usuarios = this.consumoApi.getUsuarios();
  }

  mostrar() {
    this.consumoApi.getPosts().subscribe((res) => {
      this.message = '' + res[0].username;
      this.titulo = '' + res[0].name;
      console.log(res[0]);
    }, (error) => {
      console.log(error);
    });
  }
  mostrarUsuario() {
    this.consumoApi.getPosts().subscribe((res) => {
      this.message = '' + res[0].username;
      this.titulo = '' + res[0].name;
      console.log(res[0]);
    }, (error) => {
      console.log(error);
    });
  }
  // actualizar() {
  //   const post = {
  //     userId: 1,
  //     id: 1,
  //     title: 'Prueba de put',
  //     body: 'texto de actualizacion'
  //   };
  //   this.consumoApi.updatePost(1, post).subscribe((success) => {
  //     this.titulo = '' + success.name;
  //     console.log(success.title);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  actualizar() {
    const post = {
      id: 1,
      name: 'Raimundo Estevez',
      username: 'mumo',
      email: 'test@test.com'
    };
    this.consumoApi.updatePost(1, post).subscribe((success) => {
      this.titulo = '' + success.name;
      console.log(success);
    }, error => {
      console.log(error);
    });
  }

  crear() {
    const post = {
      id: 11,
      name: 'Miguelito Contreras',
      username: 'migue',
      email: 'test2@test2.com'
    };
    this.consumoApi.createPost(post).subscribe((success) => {
      this.titulo = '' + success.name;
      console.log(success);
    }, error => {
      console.log(error);
    });
  }

  camara(){
    console.log('Entramos a metodo camara');
    const options: CameraOptions= {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData es una cadena que contiene la ruta del archivo
      const base64Image = 'data:image/jpeg;base64' + imageData;
      console.log(base64Image);
    }, (err) => {
      console.log(err);
    });
  }

}
