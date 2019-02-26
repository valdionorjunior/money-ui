import { LancamentoModel } from './lancamento.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';

export class LancamentoFiltro{

  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  
  lancamentosUrl = 'http://localhost:8080/lancamentos';
  
  constructor(private http: HttpClient) { }
  
  pesquisar(filtro: LancamentoFiltro) : Observable<any>{

    let params = new HttpParams();
    // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    } 

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));//uso a biblioteca moment para formatar a data
    } 

    if(filtro.dataVencimentoFim){
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));//uso a biblioteca moment para formatar a data
    } 

    // return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`,{headers, params});
    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`,{params});
  }

  excluir(codigo : number) : Observable<any>{

    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`,{headers});
  }

  adicionar(lancamento: LancamentoModel) : Observable<any>{
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl,JSON.stringify(lancamento),{headers});
  }

  atualizar(lancamento: LancamentoModel) :  Observable<any>{
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,JSON.stringify(lancamento),{headers});
  }

  buscarPorCodigo(codigo : number) : Observable<any>{
    let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`,{headers});
  }

}
