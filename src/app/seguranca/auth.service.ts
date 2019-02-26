// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelperService :  JwtHelperService
              ) {
                this.carregarToken();
               }

  login(usuario: string, senha: string): Observable<any>{

    let headers = new  HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, {headers});
  }

  armazenarToken(token : string){ //não pode ser privada pois preciso passar o token apartia da clase
    this.jwtPayload = this.jwtHelperService.decodeToken(token);//decodifica o token - Payload é o corpo do token decodificado, ou seja: usuario, permissões e outras coisa necessaria  
    localStorage.setItem('token', token);//armazena o token no local storage para n perter a sessão
  }

  carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }
}
