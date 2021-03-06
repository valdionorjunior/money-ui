//Modulo de roteamento para as rotas da aplicação
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

//Rotas da aplicação
const routes : Routes = [
    { path : 'lancamentos', component: LancamentosPesquisaComponent },
    { path : 'lancamentos/novo', component: LancamentoCadastroComponent },
    { path : 'lancamentos/:codigo', component: LancamentoCadastroComponent },// rota com codigo, para deixair lancamento dinamico pelo codigo
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),//repasse de rotas

    ],
    exports: [
      RouterModule,
    ]
  })
  export class LancamentosRoutingModule { }
  