import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PessoaModel } from './pessoa.model';
import { MoneyHttp } from './../seguranca/money-http';

export class PessoaFiltro{

  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  // constructor(private http: HttpClient) { }
  constructor(private http: MoneyHttp) { }

  // pesquisar(filtro: PessoaFiltro) : Observable<any>{

  //   let params = new HttpParams();
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   params = params.set('page', filtro.pagina.toString());
  //   params = params.set('size', filtro.itensPorPagina.toString());

  //   if(filtro.nome){
  //     params = params.set('nome', filtro.nome);
  //   } 

  //   return this.http.get<any[]>(`${this.pessoasUrl}`,{params});
  // }
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  // listarTodas(): Observable<any>{

  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   return this.http.get<any[]>(`${this.pessoasUrl}`);
    
  // }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
  }

  // excluir(codigo : number) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   return this.http.delete(`${this.pessoasUrl}/${codigo}`);
  // }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  // mudarStatus (codigo: number, ativo: boolean){
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   // headers = headers.set('Content-Type','application/json');
  //   let headers = new  HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers});
  // }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  // adicionar(pessoa: PessoaModel) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   // headers = headers.set('Content-Type', 'application/json');
  //   let headers = new  HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.post(this.pessoasUrl,JSON.stringify(pessoa),{headers});
  // }

  adicionar(pessoa: PessoaModel): Promise<PessoaModel> {
    return this.http.post<PessoaModel>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  // atualizar(pessoa: PessoaModel) :  Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   // headers = headers.set('Content-Type', 'application/json');
  //   let headers = new  HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,JSON.stringify(pessoa),{headers});
  // }

  atualizar(pessoa: PessoaModel): Promise<PessoaModel> {
    return this.http.put<PessoaModel>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  // buscarPorCodigo(codigo : number) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   return this.http.get(`${this.pessoasUrl}/${codigo}`);
  // }

  buscarPorCodigo(codigo: number): Promise<PessoaModel> {
    return this.http.get<PessoaModel>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

}
