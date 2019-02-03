import { Component, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';

import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private toastrService: ToastrService) { }

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

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo).subscribe(
      () =>{
          this.grid.first = 0; //reseta a tabela para pagina 1
          this.pesquisar();
          this.toastrService.success('Lançamento excluido com sucesso!');
      }
    );
  }  

}
