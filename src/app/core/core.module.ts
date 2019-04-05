import { HttpClient } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
// import { JwtHelper } from 'angular2-jwt';//jwt para decodificar logins, Embora o Angular 7 ja possui um serviço sem precisar de bibliotecas de terceiros
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';//subistitui a de
import { JwtModule } from '@auth0/angular-jwt';//jwt para decodificar logins, Embora o Angular 7 ja possui um serviço sem precisar de bibliotecas de terceiros
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AuthService } from './../seguranca/auth.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(ptBr)

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,//repasse do router Module para que a diretiva routerLink funcione em redirecionamentos de links

    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    ConfirmDialogModule,

    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes : ['localhost:8080/api/auth']
      }
    })
    
  ],
  exports: [
    NavbarComponent,
    ToastrModule,
    ConfirmDialogModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    Title, //Serviço que injeta o titulo nas paginas.

    LancamentoService,
    PessoaService,
    ConfirmationService,
    ErrorHandlerService,
    AuthService,
    JwtHelperService,

  ]
})
export class CoreModule { }
