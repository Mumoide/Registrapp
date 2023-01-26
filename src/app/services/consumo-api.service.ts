import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { $ } from 'protractor';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { User2 } from '../interface/user2';
import { User3 } from '../interface/user3';

@Injectable({
  providedIn: 'root'
})


export class ConsumoAPIService {
  httpOptions = {
    headers: new HttpHeaders(
      {// eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json' })
  };

  title = 'angularhttp';


  // apiURL = 'https://jsonplaceholder.typicode.com';
  // apiURL = 'https://jsonplaceholder.typicode.com/users';
  // apiURL = 'http://localhost:3000/alumnos';
  apiURL = 'https://danielgallo-2smwbfpq5q-uc.a.run.app';

  constructor(private http: HttpClient) { }

 // METODOS HTTP REQUEST
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiURL);
  }

  getUser(): Observable<User>{
    return this.http.get<User>(this.apiURL + '/' + '1');
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.apiURL, user);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.apiURL+ '/' + user.id , user);
  }

  // METODOS QUE YO USO PARA LA APP
  // https://mumoapi-nur7ax6apq-uc.a.run.app
  updatePost2(user2: User2): Observable<User2> {
    return this.http.put<User2>(this.apiURL, user2, this.httpOptions).pipe(
      retry(3)
    );
  }

  getUsers2(): Observable<User3> {
    return this.http.get<User3>(this.apiURL, this.httpOptions);
  }

  updatePost(user2: User2): Observable<any> {
    return this.http.put(this.apiURL, user2, this.httpOptions).pipe(
      retry(3)
    );
  }
}
