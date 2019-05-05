//Modulo de roteamento para as rotas da aplicação
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

//Rotas da aplicação
const routes : Routes = [
    { path : 'pessoas', component: PessoasPesquisaComponent },
    { path : 'pessoas/nova', component: PessoaCadastroComponent },
    { path : 'pessoas/:codigo', component: PessoaCadastroComponent },// rota com codigo, para deixair lancamento dinamico pelo codigo
    // { 
    //   path : '', 
    //   component: PessoasPesquisaComponent,
    //   canActivate: [AuthGuard],
    //   data: { roles: ['ROLE_PESQUISAR_PESSOA']}
    // },
    // { 
    //   path : 'nova', 
    //   component: PessoaCadastroComponent, 
    //   canActivate: [AuthGuard],
    //   data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    // },
    // { 
    //   path : 'pessoas/:codigo', 
    //   component: PessoaCadastroComponent, 
    //   canActivate: [AuthGuard],
    //   data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    // }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),//repasse de rotas

    ],
    exports: [
      RouterModule,
    ]
  })
  export class PessoasRoutingModule { }
  