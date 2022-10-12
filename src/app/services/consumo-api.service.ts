import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { $ } from 'protractor';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConsumoAPIService {
  httpOptions = {
    headers: new HttpHeaders(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };


  apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  // getPosts(id){
  //   return this.http.get('${this.apiURL}/posts/${id}');
  // }

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + '/posts/').pipe(
      retry(3)
    );
  }


}
