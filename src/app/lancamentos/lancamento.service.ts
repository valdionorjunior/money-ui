import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import { LancamentoModel } from './lancamento.model';
import { MoneyHttp } from '../seguranca/money-http';

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
  
  // constructor(private http: HttpClient) { }
  constructor(private http: MoneyHttp) { }
  
  // pesquisar(filtro: LancamentoFiltro) : Observable<any>{

  //   let params = new HttpParams();
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   params = params.set('page', filtro.pagina.toString());
  //   params = params.set('size', filtro.itensPorPagina.toString());

  //   if(filtro.descricao){
  //     params = params.set('descricao', filtro.descricao);
  //   } 

  //   if(filtro.dataVencimentoInicio){
  //     params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));//uso a biblioteca moment para formatar a data
  //   } 

  //   if(filtro.dataVencimentoFim){
  //     params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));//uso a biblioteca moment para formatar a data
  //   } 

  //   // return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`,{headers, params});
  //   return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`,{params});
  // }
  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
        { search: params })
      .toPromise()
      .then(response => {
        // const responseJson = response.json();
        const responseJson = JSON.parse(JSON.stringify(response)); //VERIFICAR DEPOIS SE RESPONSE VEM EM FORMATO JASON
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  // excluir(codigo : number) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   return this.http.delete(`${this.lancamentosUrl}/${codigo}`);
  // }
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  // adicionar(lancamento: LancamentoModel) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   // headers = headers.set('Content-Type', 'application/json');
  //   let headers = new  HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.post(this.lancamentosUrl,JSON.stringify(lancamento),{headers});
  // }
  adicionar(lancamento: LancamentoModel): Promise<LancamentoModel> {
    return this.http.post(this.lancamentosUrl,
        JSON.stringify(lancamento))
      .toPromise()
      // .then(response => response.json());
      .then(response => JSON.parse(JSON.stringify(response))); //VERIFICAR DEPOIS SE RESPONSE VEM EM FORMATO JASON
  }

  // atualizar(lancamento: LancamentoModel) :  Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');
  //   // headers = headers.set('Content-Type', 'application/json');
  //   let headers = new  HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,JSON.stringify(lancamento),{headers});
  // }
  atualizar(lancamento: LancamentoModel): Promise<LancamentoModel> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        // const lancamentoAlterado = response.json() as LancamentoModel;
        const lancamentoAlterado = JSON.parse(JSON.stringify(response)) as LancamentoModel;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  // buscarPorCodigo(codigo : number) : Observable<any>{
  //   //retirado pois a autenticação agora é veita por token vinda a api
  //   // let headers = new  HttpHeaders().set('Authorization', 'Basic dmFsZGlvbm9yanVuaW9yQG91dGxvb2suY29tOkJ3aTI4MDI4MSo=');

  //   return this.http.get(`${this.lancamentosUrl}/${codigo}`);
  // }
  buscarPorCodigo(codigo: number): Promise<LancamentoModel> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        // const lancamento = response.json() as LancamentoModel;
        const lancamento = JSON.parse(JSON.stringify(response)) as LancamentoModel;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: LancamentoModel[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
