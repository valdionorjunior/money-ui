import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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

  constructor(private PessoaService: PessoaService){ }

  ngOnInit(){

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.PessoaService.pesquisar(this.filtro).subscribe(
      data => { 
        this.pessoas = JSON.parse(JSON.stringify(data.content));
        this.totalRegistros = JSON.parse(JSON.stringify(data.totalElements));
      }
    );
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows; //pagina atual que buscamos através do datatable
    this.pesquisar(pagina);
  }

}
