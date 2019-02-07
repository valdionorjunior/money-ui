import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

//Rotas da aplicação
const routes : Routes = [
  { path : 'lancamentos', component: LancamentosPesquisaComponent },
  { path : 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path : 'lancamentos/:codigo', component: LancamentoCadastroComponent },// rota com codigo, para deixair lancamento dinamico pelo codigo
  { path : 'pessoas', component: PessoasPesquisaComponent },
  { path : 'pessoas/nova', component: PessoaCadastroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, //CalendarModule e ToastrModule possui dependencia nesse modulo de animação para funcionar
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),//repasse de rotas

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
