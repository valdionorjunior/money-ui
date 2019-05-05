import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

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

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    // this.pesquisar();
    this.title.setTitle('Pesquisa de Lancamentos');// serviço do angular que injeta o titulo na pagina.
  }

  // pesquisar(pagina = 0) {
  //   this.filtro.pagina = pagina;

  //   this.lancamentoService.pesquisar(this.filtro).subscribe(
  //     data => { 
  //       this.lancamentos = JSON.parse(JSON.stringify(data.content));
  //       this.totalRegistros = JSON.parse(JSON.stringify(data.totalElements));
  //     },
  //     error => {
  //       this.errorHandler.handle(error)
  //     }
  //   );
  // }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows; //pagina atual que buscamos através do datatable
    this.pesquisar(pagina);
  }


  confirmarExclusao(lancamento: any){
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o lançamento?',
      header: 'Confirmação de Exclução',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(lancamento);
      },
      // reject: () => {
        // }
      });
  }

  // excluir(lancamento: any){
  //     this.lancamentoService.excluir(lancamento.codigo).subscribe(
  //       () =>{
  //           this.grid.first = 0; //reseta a tabela para pagina 1
  //           this.pesquisar();
  //           this.toastrService.success('Lançamento excluido com sucesso!');
  //       },
  //       error => {
  //         this.errorHandler.handle(error)
  //       }
  //     ); 
  //   }  
    excluir(lancamento: any) {
      this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
  
          // this.toasty.success('Lançamento excluído com sucesso!');
          this.toastrService.success('Lançamento excluido com sucesso!');
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

}
