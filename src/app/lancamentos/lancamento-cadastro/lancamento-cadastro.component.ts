import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

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

  constructor(private categoriasService : CategoriaService,
              private pessoaService : PessoaService,
              private lancamentoService : LancamentoService,
              private toastrService : ToastrService,
              private ErrorHandler : ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this. carregarPessoas();
  }

  salvar(form: FormControl){
    this.lancamentoService.adicionar(this.lancamento).subscribe(
      () =>{
        this.toastrService.success('Lancamento adicionado com Sucesso!');
        form.reset();//adicionou o lancamento, reseta o formulario.
        this.lancamento = new LancamentoModel();//reseta também o lançamento instanciando um novo a ele.
      },
      error => {
        this.ErrorHandler.handle(error);
      }
    );
  }

  carregarCategorias(){
    this.categoriasService.listarTodas().subscribe(
      data => { 
        this.categorias = JSON.parse(JSON.stringify(
          data.map( 
            c => {//função (air function)
              return { label: c.nome, value: c.codigo};
          })//FIN da função / fim do map
        )); //map idera todos os elementos dentro do data, para cada elemento ou objeto, executa a função passada como parametro nele
      },
      error => {
        this.ErrorHandler.handle(error);
      }
    );
  }

  carregarPessoas(){
    this.pessoaService.listarTodas().subscribe(
      data => {
        this.pessoas = JSON.parse(JSON.stringify(
          data.content.map(
            p => {//função (air function)
              return { label: p.nome, value: p.codigo};
          })//FIN da função / fim do map
        )); //map idera todos os elementos dentro do data, para cada elemento ou objeto, executa a função passada como parametro nele 
      },
      error =>{
        this.ErrorHandler.handle(error);
      }
    );
  }

}
