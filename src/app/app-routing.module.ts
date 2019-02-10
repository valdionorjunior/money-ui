//Modulo de roteamento para as rotas da aplicação
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

//Rotas da aplicação
const routes : Routes = [
    { path : '', redirectTo: 'lancamentos', pathMatch: 'full' },//Redirecionamento de rota caso n coloque nada '', redirectTo manda para /lancamentos, pathMatch full verifica o resto a esquerda ou seja "http://localhost:4200/" 
    // { path : 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },//tem algo de errado aqui
    { path : '**', redirectTo: 'pagina-nao-encontrada' },//'**' significa que se tudo (rotas) acima n funcionar executa mandando par apagina nao encontrada
  ];
  
  @NgModule({

    imports: [
      RouterModule.forRoot(routes),//repasse de rotas

    ],
    exports: [
      RouterModule,
    ]
  })
  export class AppRoutingModule { }
  