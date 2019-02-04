import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,


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
    LancamentoService,
    PessoaService,
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class CoreModule { }
