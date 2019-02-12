import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AuthService } from './../seguranca/auth.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

registerLocaleData(ptBr)

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
    AuthService
  ]
})
export class CoreModule { }
