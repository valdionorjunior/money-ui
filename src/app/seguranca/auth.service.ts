// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // login(usuario: string, senha: string): Observable<any>{

  //   let headers = new  HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
  //   headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

  //   const body = `username=${usuario}&password=${senha}&grant_type=password`;

  //   return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true});
  // }
  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  // obterNovoAccessToken() : Observable<any>{

  //   let headers = new  HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
  //   headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

  //   const body = 'grant_type=refresh_token';

  //   return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true});
  // }
  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {//remove o token
    localStorage.removeItem('access_token');
    // localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  // isAccessTokenInvalido(){
  //   const token = localStorage.getItem('access_token');

  //   return !token || this.jwtHelperService.isTokenExpired(token);
  // }
  isAccessTokenInvalido() {
    const token = localStorage.getItem('access_token');
    // const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  //verifica a permissão do usuario pra certas ações
  temPermissao(permissao : string){
    //verifico se há um jwtPayload e a suas autorizações contem a permissão que estamos passando por parametro
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) { //Verifica permissão do usuario
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  armazenarToken(token : string){ //não pode ser privada pois preciso passar o token apartia da clase
    this.jwtPayload = this.jwtHelperService.decodeToken(token);//decodifica o token - Payload é o corpo do token decodificado, ou seja: usuario, permissões e outras coisa necessaria  
    localStorage.setItem('access_token', token);//armazena o token no local storage para n perter a sessão
    // localStorage.setItem('token', token);
  }

  carregarToken(){
    const token = localStorage.getItem('access_token');
    // const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }
}
