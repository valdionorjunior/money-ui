import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaFiltro } from './../pessoa.service';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  filtro = new PessoaFiltro();
  totalRegistros = 0;
  pessoas = [];
  @ViewChild('tabela') grid;
  
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toastrService: ToastrService,
    private confirmationService: ConfirmationService,
    // private messageService: MessageService, mensagem de PrimeNG
    private title: Title
  ) { }

  ngOnInit(){
    this.title.setTitle('Pesquisa de Pessoas');// serviço do angular que injeta o titulo na pagina.

  }

  // pesquisar(pagina = 0) {
  //   this.filtro.pagina = pagina;

  //   this.pessoaService.pesquisar(this.filtro).subscribe(
  //     data => { 
  //       this.pessoas = JSON.parse(JSON.stringify(data.content));
  //       this.totalRegistros = JSON.parse(JSON.stringify(data.totalElements));
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // aoMudarPagina(event: LazyLoadEvent){
  //   const pagina = event.first / event.rows; //pagina atual que buscamos através do datatable
  //   this.pesquisar(pagina);
  // }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
  
  // confirmarExclusao(pessoa: any) {
  //   this.confirmation.confirm({
  //     message: 'Tem certeza que deseja excluir?',
  //     accept: () => {
  //       this.excluir(pessoa);
  //     }
  //   });
  // }
  confirmarExclusao(pessoa: any){
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir a Pessoa?',
      header: 'Confirmação de Exclução',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(pessoa);
      },
      // reject: () => {
        // }
      });
  }

  // excluir(pessoa: any){
  //     this.pessoaService.excluir(pessoa.codigo).subscribe(
  //       () =>{
  //           this.grid.first = 0; //reseta a tabela para pagina 1
  //           this.pesquisar();
  //           this.toastrService.success('Pessoa excluida com sucesso!');
  //       },
  //       error => {
  //         this.errorHandler.handle(error);
  //       }
  //     ); 
  //   }  
  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        // this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
        this.toastrService.success('Pessoa excluida com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  // alternarStatus(pessoa: any): void{
  //     const novoStatus = !pessoa.ativo;

  //     this.pessoaService.mudarStatus(pessoa.codigo,novoStatus).subscribe(
  //       () =>{
  //           let acao = novoStatus ? 'ativada' : 'desativada';
            
  //           pessoa.ativo = novoStatus;
  //           this.toastrService.success(`Pessoa ${acao} com sucesso!`);
  //       },
  //       error => {
  //         this.errorHandler.handle(error);
  //       }
  //     ); 
  //   }
    alternarStatus(pessoa: any): void {
      const novoStatus = !pessoa.ativo;
  
      this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
        .then(() => {
          const acao = novoStatus ? 'ativada' : 'desativada';
  
          pessoa.ativo = novoStatus;
          // this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
          this.toastrService.success(`Pessoa ${acao} com sucesso!`);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
}
