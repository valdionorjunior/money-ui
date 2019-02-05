import { Component, OnInit } from '@angular/core'; 
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

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

  constructor(private pessoaService : PessoaService,
              private toastrService : ToastrService,
              private ErrorHandler : ErrorHandlerService) { }

  ngOnInit() {
  }

  salvar(form: FormControl){
    this.pessoaService.adicionar(this.pessoa).subscribe(
      () =>{
        this.toastrService.success('Pessoa adicionada com Sucesso!');
        form.reset();//adicionou a pessoa, reseta o formulario.
        this.pessoa = new PessoaModel();//reseta também a pessoa instanciando um novo a ele.
      },
      error => {
        this.ErrorHandler.handle(error);
      }
    );
  }
}
