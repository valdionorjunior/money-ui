import { MoneyHttp } from './../seguranca/money-http';
import { CategoriaService } from './../categorias/categoria.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
// import { JwtHelper } from 'angular2-jwt';//jwt para decodificar logins, Embora o Angular 7 ja possui um serviço sem precisar de bibliotecas de terceiros
import { JwtHelperService } from '@auth0/angular-jwt';//subistitui a de
import { JwtModule } from '@auth0/angular-jwt';//jwt para decodificar logins, Embora o Angular 7 ja possui um serviço sem precisar de bibliotecas de terceiros
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl'

import { AuthService } from './../seguranca/auth.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,//repasse do router Module para que a diretiva routerLink funcione em redirecionamentos de links

    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    // GrowlModule,
    ConfirmDialogModule,

  ],
  exports: [
    NavbarComponent,
    ToastrModule,
    // GrowlModule,

    ConfirmDialogModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    Title, //Serviço que injeta o titulo nas paginas.

    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService,
    AuthService,
    MoneyHttp,
    
    ConfirmationService,
    MessageService,
    JwtHelperService,
  ]
})
export class CoreModule { }
