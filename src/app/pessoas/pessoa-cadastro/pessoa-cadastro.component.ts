import { Component, OnInit } from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaModel } from '../pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PessoaModel();

  constructor(
    private pessoaService : PessoaService,
    private messageService: MessageService,
    private toastrService : ToastrService,
    private errorHandler : ErrorHandlerService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private title: Title
  ) { } 

  ngOnInit() {

    const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];//pega o parametro declarado como token na rota ativa

    this.title.setTitle('Nova Pessoa');// serviço do angular que injeta o titulo na pagina.

    if(codigoPessoa){//verifica se existe o codigoLancamento - se for undefined não entra
      this.carregarPessoa(codigoPessoa);
    }

  }
  
  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  // carregarPessoa(codigo : number){
  //   this.pessoaService.buscarPorCodigo(codigo).subscribe(
  //     data => {
  //       this.pessoa = JSON.parse(JSON.stringify(data));
  //       this.atualizarTituloEdicao(); //edita titulo da pagina de acordo se é novo ou edição de lancamentos
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // salvar(form: FormControl) {
  //   if (this.editando) {
  //     this.atualizarPessoa(form);
  //   } else {
  //     this.adicionarPessoa(form);
  //   }
  // }
  salvar(form: FormControl){
    if(this.editando){
      this.atualizarPessoa(form);//salva edições de lançamento
    } else {
      this.adicionarPessoa(form);// salva no lancamento.
    }
  }

  // adicionarPessoa(form: FormControl){
  //   this.pessoaService.adicionar(this.pessoa).subscribe(
  //     () =>{
  //       this.toastrService.success('Pessoa adicionada com Sucesso!');
  //       form.reset();//adicionou a pessoa, reseta o formulario.
  //       this.pessoa = new PessoaModel();//reseta também a pessoa instanciando um novo a ele.
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        // this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.toastrService.success('Pessoa adicionada com Sucesso!');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // atualizarPessoa(form: FormControl){//salva a edição de lançamento
  //   this.pessoaService.atualizar(this.pessoa).subscribe(
  //     data => {
  //       this.pessoa = JSON.parse(JSON.stringify(data));
  //       this.toastrService.success('Pessoa alterada com sucesso!');
  //       this.atualizarTituloEdicao(); //edita titulo da pagina de acordo se é novo ou edição de lancamentos
  //     },
  //     error => {
  //       this.errorHandler.handle(error);
  //     }
  //   );
  // }
  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        // this.toasty.success('Pessoa alterada com sucesso!');
        this.toastrService.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // novo(form : FormControl){
  //   form.reset();//adicionou a Pessoa, reseta o formulario.

  //   // //codigo abaixo é java script
  //   // setTimeout(function(){//puta gabiarra para que o estado de receita/despesa volte a funcionar
  //   //   this.lancamento = new PessoaModel();//reseta também o lançamento instanciando um novo a ele.
  //   // }.bind(this), 1);

  //   this.router.navigate(['/pessoas/nova']);
  // }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new PessoaModel();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);// serviço do angular que injeta o titulo na pagina.
  }
}
