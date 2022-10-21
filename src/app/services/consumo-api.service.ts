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


  // apiURL = 'https://jsonplaceholder.typicode.com';
  apiURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // getPosts(id){
  //   return this.http.get('${this.apiURL}/posts/${id}');
  // }

  getUsuarios() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // getPosts(): Observable<any> {
  //   return this.http.get(this.apiURL + '/posts/').pipe(
  //     retry(3)
  //   );
  // }

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }

  // updatePost(id, post): Observable<any> {
  //   return this.http.put(this.apiURL + '/posts/' + id, post).pipe(
  //     retry(3)
  //   );
  // }

  updatePost(id, post): Observable<any> {
    return this.http.put(this.apiURL + '/' + id, post).pipe(
      retry(3)
    );
  }

  // createPost(post): Observable<any> {
  //   return this.http.post(this.apiURL+'/posts/',post,this.httpOptions).
  //   pipe(
  //     retry(3)
  //     );
  // }

  createPost(post): Observable<any> {
    return this.http.post(this.apiURL,post,this.httpOptions).
    pipe(
      retry(3)
      );
  }

  deletePost(post): Observable<any> {
    return this.http.post(this.apiURL + '/posts/', post, this.httpOptions).
      pipe(
        retry(3)
      );
  }
}
