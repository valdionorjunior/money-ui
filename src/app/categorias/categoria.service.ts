import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MoneyHttp } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  // constructor(private http: HttpClient) { }
  constructor(private http: MoneyHttp) { }

  // listarTodas() : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   return this.http.get<any[]>(`${this.categoriasUrl}`);
  // }
  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
