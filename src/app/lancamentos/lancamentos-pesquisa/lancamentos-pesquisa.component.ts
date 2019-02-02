import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
  filtro = new LancamentoFiltro();
  // descricao: string;
  // dataVencimentoInicio: Date;
  // dataVencimentoFim: Date;
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    // const filtro: LancamentoFiltro = {
    //   descricao: this.descricao,
    //   dataVencimentoInicio: this.dataVencimentoInicio,
    //   dataVencimentoFim: this.dataVencimentoFim,
    // }
    this.lancamentoService.pesquisar(this.filtro).subscribe(
      data => { this.lancamentos = JSON.parse(JSON.stringify(data.content));}
      );
  }
}
