import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { LancamentoService } from './../lancamento.service';
import { LancamentoModel } from '../lancamento.model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new LancamentoModel();

  constructor(
    private categoriasService : CategoriaService,
    private pessoaService : PessoaService,
    private lancamentoService : LancamentoService,
    private toastrService : ToastrService,
    private errorHandler : ErrorHandlerService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }//ActivatedRoute consegue pegar a rota ativa.

  ngOnInit() {
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];//pega o parametro declarado como token na rota ativa

    this.title.setTitle('Novo Lancamento');// serviço do angular que injeta o titulo na pagina.

    if(codigoLancamento){//verifica se existe o codigoLancamento - se for undefined não entra
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this. carregarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizarLancamento(form);//salva edições de lançamento
    } else {
      this.adicionarLancamento(form);// salva no lancamento.
    }
  }

  // adicionarLancamento(form: FormControl){//salva novo lançamento no banco
  //   this.lancamentoService.adicionar(this.lancamento).subscribe(
  //     data =>{
  //       this.toastrService.success('Lancamento adicionado com Sucesso!');
  //       // form.reset();//adicionou o lancamento, reseta o formulario.
  //       // this.lancamento = new LancamentoModel();//reseta também o lançamento instanciando um novo a ele.

  //       this.router.navigate(['/lancamentos', data.codigo]);
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        // this.toasty.success('Lançamento adicionado com sucesso!');
        this.toastrService.success('Lancamento adicionado com Sucesso!');

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // atualizarLancamento(form: FormControl){//salva a edição de lançamento
  //   this.lancamentoService.atualizar(this.lancamento).subscribe(
  //     data => {
  //       this.lancamento = JSON.parse(JSON.stringify(data));
  //       this.converterStringsParaDatas([this.lancamento]);
  //       this.toastrService.success('Lancamento alterado com sucesso!');
  //       this.atualizarTituloEdicao(); //edita titulo da pagina de acordo se é novo ou edição de lancamentos
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        // this.toasty.success('Lançamento alterado com sucesso!');
        this.toastrService.success('Lancamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // carregarLancamento(codigo : number){
  //   this.lancamentoService.buscarPorCodigo(codigo).subscribe(
  //     data => {
  //       this.lancamento = JSON.parse(JSON.stringify(data));
  //       this.converterStringsParaDatas([this.lancamento]);
  //       this.atualizarTituloEdicao(); //edita titulo da pagina de acordo se é novo ou edição de lancamentos
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // carregarCategorias(){
  //   this.categoriasService.listarTodas().subscribe(
  //     data => { 
  //       this.categorias = JSON.parse(JSON.stringify(
  //         data.map( 
  //           c => {//função (air function)
  //             return { label: c.nome, value: c.codigo};
  //         })//FIN da função / fim do map
  //       )); //map idera todos os elementos dentro do data, para cada elemento ou objeto, executa a função passada como parametro nele
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  carregarCategorias() {
    return this.categoriasService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // carregarPessoas(){
  //   this.pessoaService.listarTodas().subscribe(
  //     data => {
  //       this.pessoas = JSON.parse(JSON.stringify(
  //         data.content.map(
  //           p => {//função (air function)
  //             return { label: p.nome, value: p.codigo};
  //         })//FIN da função / fim do map
  //       )); //map idera todos os elementos dentro do data, para cada elemento ou objeto, executa a função passada como parametro nele 
  //     },
  //     error =>{
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  //COVERSOR DE STRING PARA DATA
  // private converterStringsParaDatas(lancamentos: LancamentoModel[]){//Converte a string para uma data
  //   for(const lancamento of lancamentos ){
  //     lancamento.dataVencimento = moment(lancamento.dataVencimento,'YYYY-MM-DD').toDate();

  //     //Verifica de Data de pagamento é nula
  //     if (lancamento.dataPagamento){
  //       lancamento.dataPagamento = moment(lancamento.dataPagamento,'YYYY-MM-DD').toDate();
  //     }

  //   }
  // }

  // novo(form : FormControl){
  //   form.reset();//adicionou o lancamento, reseta o formulario.

  //   //codigo abaixo é java script
  //   setTimeout(function(){//puta gabiarra para que o estado de receita/despesa volte a funcionar
  //     this.lancamento = new LancamentoModel();//reseta também o lançamento instanciando um novo a ele.
  //   }.bind(this), 1);

  //   this.router.navigate(['/lancamentos/novo']);
  // }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new LancamentoModel();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);// serviço do angular que injeta o titulo na pagina.
  }
}
