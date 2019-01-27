import { Component, OnInit } from '@angular/core';

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

  categorias = [
    {label: 'Transporte', value: 1},
    {label: 'alimentação', value: 2}
  ];

  pessoas = [
    {label: 'Valdionor', value: 1},
    {label: 'junior', value: 2},
    {label: 'Rodrigues', value: 3}
  ];

  constructor() { }

  ngOnInit() {
  }

}
