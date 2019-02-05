import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PessoaModel } from './pessoa.model';

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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro) : Observable<any>{

    let params = new HttpParams();
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    } 

    return this.http.get<any[]>(`${this.pessoasUrl}`,{headers, params});
  }

  listarTodas(): Observable<any>{

    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
    return this.http.get<any[]>(`${this.pessoasUrl}`,{headers});
    
  }

  excluir(codigo : number) : Observable<any>{

    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`,{headers});
  }

  mudarStatus (codigo: number, ativo: boolean){
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
    headers = headers.set('Content-Type','application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers});
  }

  adicionar(pessoa: PessoaModel) : Observable<any>{
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl,JSON.stringify(pessoa),{headers});
  }
}
