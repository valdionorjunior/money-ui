import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).subscribe(
      data => { 
        this.lancamentos = JSON.parse(JSON.stringify(data.content));
        this.totalRegistros = JSON.parse(JSON.stringify(data.totalElements));
      }
    );
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows; //pagina atual que buscamos através do datatable
    this.pesquisar(pagina);
  }
}
